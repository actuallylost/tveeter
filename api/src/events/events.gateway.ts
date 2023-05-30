import { Server } from "socket.io";

import { Logger } from "@nestjs/common";
import { WebSocketGateway, WebSocketServer } from "@nestjs/websockets";
import { Message } from "@prisma/client";

@WebSocketGateway({
	namespace: "events",
	cors: {
		origin: "*",
	},
})
export class EventsGateway {
	private readonly logger = new Logger(EventsGateway.name);

	@WebSocketServer()
	server!: Server;

	async handleConnection() {
		this.server.on("connection", (socket) => {
			this.logger.log(`Client ID: ${socket.id} connected!`);
		});
	}

	async handleDisconnect() {
		this.server.on("disconnection", (socket) => {
			this.logger.log(`Client ID: ${socket.id} disconnected!`);
		});
	}

	async sendMessage(message: Message, username: string) {
		this.logger.log("Events gateway initialized");
		try {
			this.logger.debug(message);

			this.server.emit("events", { message, username });
		} catch (error) {
			this.logger.error(error);
		}
	}

	async receiveMessage(message: Message) {
		this.logger.log("Events gateway initialized");
		try {
			this.logger.debug(message);

			this.server.emit("events", message);
		} catch (error) {
			this.logger.error(error);
		}
	}
}
