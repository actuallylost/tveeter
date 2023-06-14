import { IsEmail, IsNotEmpty, IsString } from "class-validator";

export class CreateUserDto {
	@IsString()
	@IsNotEmpty()
	username!: string;

	@IsString()
	@IsEmail()
	@IsNotEmpty()
	email!: string;
}
