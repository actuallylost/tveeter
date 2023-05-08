import { IsDefined, IsEmail, IsString, IsStrongPassword } from "class-validator";

export class LoginDto {
	@IsDefined()
	@IsString()
	username: string;

	@IsDefined()
	@IsEmail()
	email: string;

	@IsDefined()
	@IsString()
	@IsStrongPassword({
		minLength: 8,
		minSymbols: 1,
		minNumbers: 1,
		minUppercase: 1,
		minLowercase: 1,
	})
	password: string;
}
