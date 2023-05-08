import { Injectable } from "@nestjs/common";

const EPOCH = 1682899200000n; // 2023-05-01T00:00:00.000Z

export class Snowflake {
	static parse(str: string) {
		const int = BigInt(str);
		const increment = int & 0xfffn;
		const workerId = (int & 0x3e0000n) >> 17n;
		const processId = (int & 0x1f000n) >> 12n;
		const timestamp = (int >> 22n) + EPOCH;
		return new Snowflake(timestamp, workerId, processId, increment);
	}

	constructor(
		readonly timestamp: bigint,
		readonly workerId: bigint,
		readonly processId: bigint,
		readonly increment: bigint,
	) {}

	toBigInt() {
		return (
			(this.timestamp << 22n) +
			(this.workerId << 17n) +
			(this.processId << 12n) +
			this.increment
		);
	}

	toString() {
		return this.toBigInt().toString();
	}
}

@Injectable()
export class SnowflakeService {
	private increment = 0n;

	generate(): Snowflake {
		const timestamp = BigInt(Date.now()) - EPOCH;
		const workerId = 0n;
		const processId = BigInt(process.pid) % 0x10n;
		const increment = this.increment++ % 0x1000n;

		return new Snowflake(timestamp, workerId, processId, increment);
	}
}
