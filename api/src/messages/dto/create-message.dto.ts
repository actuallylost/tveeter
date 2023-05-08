import { IsDefined, IsString } from "class-validator";

export class CreateMessageDto {
	@IsString()
	@IsDefined()
	content!: string;
}
