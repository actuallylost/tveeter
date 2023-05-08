import { IsDefined, IsEmail, IsString } from "class-validator";

export class SignInDto {
	@IsDefined()
	@IsEmail()
	email!: string;

	@IsDefined()
	@IsString()
	password!: string;
}
