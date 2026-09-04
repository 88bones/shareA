import { io } from "socket.io-client";

const URL = import.meta.env.VITE_SOCKET_URL;

export const socket = io(URL);

const userIdStorageKey = "sharea-user-id";

export const getUserId = () => {
	const existingUserId = sessionStorage.getItem(userIdStorageKey);
	if (existingUserId) return existingUserId;

	const userId = crypto.randomUUID();
	sessionStorage.setItem(userIdStorageKey, userId);
	return userId;
};
