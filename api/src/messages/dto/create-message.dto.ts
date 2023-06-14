import { IsNotEmpty, IsString } from "class-validator";

export class CreateMessageDto {
	@IsNotEmpty()
	username!: string;

	@IsString()
	@IsNotEmpty()
	content!: string;
}
