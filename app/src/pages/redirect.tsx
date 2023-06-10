import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { supabaseSessionCheck } from "@/common";
import { Toast, ToastType } from "@/components";
import { login, RootState } from "@/redux";

const Redirect = () => {
	const router = useRouter();
	const dispatch = useDispatch();
	const username = useSelector((state: RootState) => state.auth.username);

	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		supabaseSessionCheck().then(({ accessToken, error }) => {
			if (accessToken !== null && username !== null) {
				dispatch(login({ username, accessToken }));
				router.push("/chat");
			} else if (error !== null) {
				setError(error);
			}
		});
	}, []);

	useEffect(() => {
		const abortController = new AbortController();

		fetch(`http://localhost:3000/api/v1/tempusers/${username}`, {
			method: "DELETE",
			headers: {
				"Content-Type": "application/json",
			},
			signal: abortController.signal,
		})
			.then((res) => res.json())
			.then((data) => {
				console.log(data);
			})
			.catch((err) => console.log(err));

		// fetch(`http://localhost:3000/api/v1/users`);

		return () => {
			abortController.abort();
		};
	}, []);

	return (
		<>
			<title>Redirect | Tveeter</title>
			<h1>Redirecting...</h1>
			{error !== null && <Toast type={ToastType.Error} message={error} />}
		</>
	);
};

export default Redirect;
