import { io } from "socket.io-client";

describe("WebsocketServer", () => {
	it("should connect", () => {
		const socket = io("http://localhost:3000", {
			autoConnect: true,
			reconnection: false,
		});

		return new Promise<void>((resolve) => {
			socket.on("connect", () => {
				resolve();
				socket.disconnect();
			});
		});
	});
});
