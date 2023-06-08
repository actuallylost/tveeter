import { useRouter } from "next/router";
import { useEffect } from "react";

import { supabaseSessionCheck } from "@/common";

const Redirect = () => {
	const router = useRouter();

	useEffect(() => {
		supabaseSessionCheck().then(({ accessToken }) => {
			if (accessToken !== null) {
				router.push("/chat");
			}
		});
	}, []);

	return (
		<>
			<title>Redirect | Tveeter</title>
			<h1>Redirecting...</h1>
		</>
	);
};

export default Redirect;
