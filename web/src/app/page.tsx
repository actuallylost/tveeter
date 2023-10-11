"use client";

import { useRouter } from "next/navigation";

import { H1, H3 } from "@/styles";

export default function Page() {
	const router = useRouter();

	const handleClick = async (event: React.FormEvent) => {
		event.preventDefault();
		router.push("/chat");
	};

	return (
		<>
			{/* <Container> */}
			<title>Home | Tveeter</title>
			<H1>Under construction...</H1>
			<H3 onClick={handleClick}>Click here to chat!</H3>
			{/* </Container> */}
		</>
	);
}
