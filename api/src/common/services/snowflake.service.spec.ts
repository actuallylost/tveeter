import { Snowflake, SnowflakeService } from "./snowflake.service";

describe("SnowflakeService", () => {
	it("can generate a snowflake", () => {
		const snowflake = new SnowflakeService();
		const id = snowflake.generate();
		expect(snowflake.generate()).toBeTruthy();
	});
	it("can parse a snowflake", () => {
		const id = "2844550657798144";
		const snowflake = Snowflake.parse(id);
	});
	it("increments the sequence", () => {
		const snowflake = new SnowflakeService();
		const id = snowflake.generate();
		const id2 = snowflake.generate();
		expect(id.increment).toBe(id2.increment - 1n);
	});
});
