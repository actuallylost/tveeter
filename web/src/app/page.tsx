import { Metadata } from "next";
import { useRouter } from "next/navigation";
import React from "react";

import { H1, H3 } from "@/styles";

export const metadata: Metadata = {
	title: "Home | Tveeter",
};

export default function Page() {
	const router = useRouter();

	const handleClick = async (event: React.FormEvent) => {
		event.preventDefault();
		router.push("/chat");
	};

	return (
		<>
			{/* <Container> */}
			<H1>Under construction...</H1>
			<H3 onClick={handleClick}>Click here to chat!</H3>
			{/* </Container> */}
		</>
	);
}
