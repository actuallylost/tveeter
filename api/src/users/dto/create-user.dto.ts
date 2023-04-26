import { IsDefined, IsNumber, IsString } from "class-validator";

export class CreateUserDto {
	@IsNumber()
	id: number;

	@IsString()
	@IsDefined()
	name: string;
}
