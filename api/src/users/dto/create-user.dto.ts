import { IsDefined, IsString } from "class-validator";

export class CreateUserDto {
	@IsString()
	@IsDefined()
	username!: string;
}
