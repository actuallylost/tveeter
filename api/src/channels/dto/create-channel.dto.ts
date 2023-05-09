import { IsString } from "class-validator";

export class CreateChannelDto {
	@IsString()
	id!: string;
}
