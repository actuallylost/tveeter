import { IsDefined, IsString, IsStrongPassword } from "class-validator";

export class CreateUserDto {
	@IsString()
	@IsDefined()
	username: string;
}
