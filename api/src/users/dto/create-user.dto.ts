import { IsDefined, IsEmail, IsString } from "class-validator";

export class CreateUserDto {
	@IsString()
	@IsDefined()
	username!: string;

	@IsString()
	@IsEmail()
	@IsDefined()
	email!: string;
}
