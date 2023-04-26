import { IsNumber, IsString } from "class-validator";

import { Message } from "@prisma/client";

export class CreateUserDto {
	@IsNumber()
	id: number;

	@IsString()
	name: string;
}
