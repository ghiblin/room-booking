import { Slot } from "@prisma/client";
import { RoomDTO } from "../server/room/dtos/room.dto";
import { ReservationWithPermission } from "../server/room/interceptors/reservation.interceptor";
import { UpdateUserDTO } from "../server/user/dtos/update-user.dto";
import { UserDTO } from "../server/user/dtos/user.dto";
import { today } from "./utils";

async function _get<T>(path: string) {
  const res = await fetch(`/api/${path}`, {
    method: "GET",
    credentials: "same-origin",
  });
  if (res.status === 401) {
    throw new Error("Unauthenticated");
  }
  if (res.status === 403) {
    throw new Error("Unauthorized");
  }
  const data = await res.json();
  return data as T;
}

function _post(path: string, data: any) {
  return fetch(`/api/${path}`, {
    method: "POST",
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
}

function _put(path: string, data: any) {
  return fetch(`/api/${path}`, {
    method: "PUT",
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
}

function _delete(path: string) {
  return fetch(`/api/${path}`, {
    method: "DELETE",
    credentials: "same-origin",
  });
}

export async function getRooms() {
  const rooms = await _get<RoomDTO[]>(`room`);
  return rooms;
}

export async function getReservations(roomCode: string) {
  const reservations = await _get<ReservationWithPermission[]>(
    `room/${roomCode}/reservations`
  );
  return reservations;
}

export async function createReservation(
  roomCode: string,
  slot: Slot,
  date: Date = today()
) {
  const res = await _post(`room/${roomCode}/reservations`, {
    roomCode,
    slot,
    date: date.toISOString(),
  });
  const reservation = await res.json();
  // http 201: created
  if (res.status !== 201) {
    let message: string | string[] = reservation.message;
    if (Array.isArray(message)) {
      message = message.join(", ");
    }
    throw new Error(message);
  }
  return reservation as ReservationWithPermission;
}

export async function deleteReservation(
  roomCode: string,
  slot: Slot,
  date: Date = today()
) {
  const res = await _delete(
    `room/${roomCode}/reservations/${slot}?dt=${date.toISOString()}`
  );
  if (![200, 204].includes(res.status)) {
    const message = await res.json();
    throw new Error(message);
  }
}

export async function getUserInfo() {
  const user = await _get<UserDTO>(`user/me`);
  return user;
}

export async function updateUserInfo(userInfo: UpdateUserDTO) {
  const res = await _put(`user`, userInfo);
  if (res.status !== 200) {
    const message = await res.json();
    throw new Error(message);
  }
}
