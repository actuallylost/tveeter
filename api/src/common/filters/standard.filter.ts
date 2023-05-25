import {
	ArgumentsHost,
	Catch,
	ExceptionFilter,
	HttpException,
	HttpStatus,
	Logger,
} from "@nestjs/common";
import { HttpAdapterHost } from "@nestjs/core";

interface StandardException {
	code: number;
	message: string;
}

const httpToStandard = (code: HttpStatus): StandardException => {
	switch (code) {
		case HttpStatus.NOT_FOUND:
			return {
				code: 0,
				message: "Not found",
			};
		case HttpStatus.BAD_REQUEST:
			return {
				code: 1,
				message: "Bad request",
			};
		default:
			return {
				code: -1,
				message: "Unknown error",
			};
	}
};

/**
 * Test if an error is a standard exception.
 */
const isStandardException = (error: any): error is StandardException => {
	return error.code !== undefined && error.message !== undefined;
};

@Catch()
export class StandardExceptionFilter implements ExceptionFilter {
	private readonly logger = new Logger(StandardExceptionFilter.name);

	constructor(private readonly httpAdapterHost: HttpAdapterHost) {}

	catch(exception: unknown, host: ArgumentsHost) {
		const { httpAdapter } = this.httpAdapterHost;
		const ctx = host.switchToHttp();

		const httpStatus =
			exception instanceof HttpException
				? exception.getStatus()
				: HttpStatus.INTERNAL_SERVER_ERROR;

		// extract message if it is defined
		let httpMessage = null;
		if (exception instanceof HttpException) {
			const response = exception.getResponse();
			if (isStandardException(response)) {
				httpMessage = response;
			}
		}

		// check for internal errors - unexpected behaviour
		if (httpStatus === HttpStatus.INTERNAL_SERVER_ERROR) {
			this.logger.error(exception);
		}

		const response = httpToStandard(httpStatus);

		httpAdapter.reply(
			ctx.getResponse(),
			{
				...response,
				message: httpMessage ?? response.message,
			},
			httpStatus,
		);
	}
}
