import { Slot } from "@prisma/client";
import { ReservationDTO } from "../server/room/dtos/reservation.dto";
import { RoomDTO } from "../server/room/dtos/room.dto";
import { UpdateUserDTO } from "../server/user/dtos/update-user.dto";
import { UserDTO } from "../server/user/dtos/user.dto";
import { today } from "./utils";

export async function getRooms() {
  const res = await fetch(`/api/room`, {
    method: "GET",
    credentials: "same-origin",
  });
  const rooms = await res.json();
  return rooms as RoomDTO[];
}

export async function getReservations(roomCode: string) {
  const res = await fetch(`/api/room/${roomCode}/reservations`, {
    method: "GET",
    credentials: "same-origin",
  });
  const reservations = await res.json();
  return reservations as ReservationDTO[];
}

export async function createReservation(
  roomCode: string,
  slot: Slot,
  date: Date = today()
) {
  const res = await fetch(`/api/room/${roomCode}/reservations`, {
    method: "POST",
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ roomCode, slot, date: date.toISOString() }),
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
  return reservation as ReservationDTO;
}

export async function getUserInfo() {
  const res = await fetch(`/api/user/me`, {
    method: "GET",
    credentials: "same-origin",
  });
  const user = await res.json();
  return user as UserDTO;
}

export async function updateUserInfo(userInfo: UpdateUserDTO) {
  const res = await fetch(`/api/user`, {
    method: "PUT",
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userInfo),
  });
  if (res.status !== 200) {
    const message = await res.json();
    throw new Error(message);
  }
}
