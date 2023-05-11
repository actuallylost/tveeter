import { Logger } from "@nestjs/common";
import { WebSocketGateway, WebSocketServer } from "@nestjs/websockets";
import { Message } from "@prisma/client";
import { Server } from "socket.io";

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

	async sendMessage(message: Message) {
		this.logger.log("Events gateway initialized");
		try {
			this.logger.debug(message);

			this.server.emit("events", message);
		} catch (error) {
			this.logger.error(error);
		}
	}
}
