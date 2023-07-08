import { useRouter } from "next/navigation";
import React from "react";

import { H1, H3 } from "@/styles";

// TODO: Implement error page
const Error = () => {
	const router = useRouter();

	const handleClick = async (event: React.FormEvent) => {
		event.preventDefault();
		router.push("/");
	};

	return (
		<>
			<title>404 | Tveeter</title>
			<H1>Something went wrong :(</H1>
			<H3 onClick={handleClick}>Click here to home!</H3>
		</>
	);
};

export default Error;
