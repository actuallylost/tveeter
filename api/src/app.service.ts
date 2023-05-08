import { Injectable, InternalServerErrorException } from "@nestjs/common";
import { Supabase } from "./common/supabase";

type Hello = {
	id: number;
	name: string;
	description: string;
};

@Injectable()
export class AppService {
	constructor(private readonly supabase: Supabase) {}

	async getHello(): Promise<Hello[]> {
		const client = await this.supabase.getClient();
		const { data, error } = await client.from("hello").select();
		if (error) {
			throw new InternalServerErrorException(error.message);
		}
		return data.map((item: any) => ({
			id: item.id,
			name: item.name,
			description: item.description,
		}));
	}
}
