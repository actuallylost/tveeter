import { useRouter } from "next/router";
import { useEffect } from "react";

import { supabaseSessionCheck } from "@/common";

const Redirect = () => {
	const router = useRouter();

	useEffect(() => {
		supabaseSessionCheck().then(({ accessToken }) => {
			if (accessToken !== null) {
				router.push("/");
			}
		});
	}, [router]);

	return (
		<>
			<title>Tveeter Web | Redirecting...</title>
			<h1>Redirecting...</h1>
		</>
	);
};

export default Redirect;
