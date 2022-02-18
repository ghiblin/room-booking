import { UserDTO } from "../server/user/dtos/user.dto";

export async function getUserInfo() {
  const res = await fetch(`/api/user/me`, {
    method: "GET",
    credentials: "same-origin",
  });
  const user = await res.json();
  return user as UserDTO;
}

export async function updateUserInfo(userInfo: UserDTO) {
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
