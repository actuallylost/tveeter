import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

import { supabaseSessionCheck } from "@/common";
import { Toast, ToastType } from "@/components";
import { login } from "@/redux";

const Redirect = () => {
	const router = useRouter();
	const dispatch = useDispatch();

	const [error, setError] = useState<string | null>(null);
	const [username, setUsername] = useState<string | null>(null);

	useEffect(() => {
		const abortController = new AbortController();

		supabaseSessionCheck().then(({ accessToken, error }) => {
			if (accessToken !== null) {
				fetch("http://localhost:3000/api/v1/auth/verify", {
					method: "POST",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify({ token: accessToken }),
				})
					.then((res) => res.json())
					.then((data) => setUsername(data))
					.catch((err) => console.log(err));

				dispatch(login({ username, accessToken }));
				router.push("/chat");
			} else if (error !== null) {
				setError(error);
			}
		});

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
