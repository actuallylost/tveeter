import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import SupabaseService from "./supabase.service";

@Injectable()
export class SupabaseGuard implements CanActivate {
	constructor(private readonly supabase: SupabaseService) {}

	async canActivate(context: ExecutionContext): Promise<boolean> {
		const request: Request = context.switchToHttp().getRequest();

		const rawAuthorizationHeader = request.headers.get("Authorization");
		const token = rawAuthorizationHeader?.split(" ")[1];

		// if token not present in request, return
		if (!token) {
			return false;
		}

		return this.supabase.auth.getUser(token).then((v) => v.error != null, false);
	}
}
