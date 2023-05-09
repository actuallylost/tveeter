import { Injectable } from "@nestjs/common";
import { SupaClient } from "./supaclient";

@Injectable()
export class SupabaseService {
	private supabaseClient: ReturnType<SupaClient["createSupabaseClient"]>;

	constructor(private readonly supaClient: SupaClient) {
		this.supabaseClient = supaClient.createSupabaseClient();
	}

	getClient(): ReturnType<SupaClient["createSupabaseClient"]> {
		return this.supabaseClient;
	}
}
