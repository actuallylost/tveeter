import { useRouter } from "next/router";
import React from "react";

import { H1, H3 } from "@/styles";

const Home = () => {
	const router = useRouter();

	const handleClick = async (event: React.FormEvent) => {
		event.preventDefault();
		router.push("/chat");
	};

	return (
		<>
			<title>Home | Tveeter</title>
			{/* <Container> */}
			<H1>Under construction...</H1>
			<H3 onClick={handleClick}>Click here to chat!</H3>
			{/* </Container> */}
		</>
	);
};

export default Home;
