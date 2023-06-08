import { IsDefined, IsString } from "class-validator";

export class CreateMessageDto {
	@IsDefined()
	authorId!: string;

	@IsString()
	@IsDefined()
	content!: string;
}
