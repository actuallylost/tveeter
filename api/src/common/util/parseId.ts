import { HttpException, HttpStatus } from "@nestjs/common";

/**
 * Parse a string to a bigint.
 */
export const parseId = (id: string): bigint => {
	let parsedId: bigint;
	try {
		parsedId = BigInt(id);
	} catch (error) {
		throw new HttpException({}, HttpStatus.BAD_REQUEST);
	}
	return parsedId;
};
