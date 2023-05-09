import { IsDefined, IsEmail, IsString } from "class-validator";

export class LoginDto {
	@IsDefined()
	@IsEmail()
	email!: string;

	@IsDefined()
	@IsString()
	password!: string;
}
