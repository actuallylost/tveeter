import { IsDefined, IsNumber, IsString } from "class-validator";

export class CreateMessageDto {
	@IsNumber()
	id: number;

	@IsString()
	@IsDefined()
	content: string;

	@IsNumber()
	userId: number;
}
