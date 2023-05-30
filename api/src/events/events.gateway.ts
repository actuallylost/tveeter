import { Server, Socket } from "socket.io";

import { Logger } from "@nestjs/common";
import {
	OnGatewayConnection,
	OnGatewayDisconnect,
	WebSocketGateway,
	WebSocketServer,
} from "@nestjs/websockets";
import { Message } from "@prisma/client";

@WebSocketGateway({
	namespace: "events",
	cors: {
		origin: "*",
	},
})
export class EventsGateway implements OnGatewayConnection, OnGatewayDisconnect {
	private readonly logger = new Logger(EventsGateway.name);

	@WebSocketServer()
	server!: Server;

	async handleConnection(socket: Socket) {
		this.logger.log(`Client ID: ${socket.id} connected!`);
	}

	async handleDisconnect(socket: Socket) {
		this.logger.log(`Client ID: ${socket.id} disconnected!`);
	}

	async sendMessage(message: Message, username: string) {
		this.logger.log("Events gateway initialized");
		try {
			this.logger.debug(message, `Username: ${username}`);

			this.server.emit("events", { ...message, username });
		} catch (error) {
			this.logger.error(error);
		}
	}
}
