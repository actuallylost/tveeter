import {
	CanActivate,
	ExecutionContext,
	HttpException,
	HttpStatus,
	Injectable,
} from "@nestjs/common";
import SupabaseService from "./supabase.service";

import { Request } from "express";

@Injectable()
export class SupabaseGuard implements CanActivate {
	constructor(private readonly supabase: SupabaseService) {}

	async canActivate(context: ExecutionContext): Promise<boolean> {
		const request: Request = context.switchToHttp().getRequest();

		const rawAuthorizationHeader = request.headers["Authorization"];
		if (typeof rawAuthorizationHeader !== "string") {
			throw new HttpException({}, HttpStatus.BAD_REQUEST);
		}

		const token = rawAuthorizationHeader?.split(" ")[1];

		// if token not present in request, return
		if (!token) {
			return false;
		}

		return this.supabase.auth.getUser(token).then(
			(session) => session.error != null,
			() => false,
		);
	}
}
