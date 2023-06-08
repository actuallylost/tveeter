import { useRouter } from "next/router";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { supabaseSessionCheck } from "@/common";
import { login, RootState } from "@/redux";

const Redirect = () => {
	const router = useRouter();
	const dispatch = useDispatch();
	const username = useSelector((state: RootState) => state.auth.username);

	useEffect(() => {
		supabaseSessionCheck().then(({ accessToken }) => {
			if (accessToken !== null && username !== null) {
				router.push("/chat");
				dispatch(login({ username, accessToken }));
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
