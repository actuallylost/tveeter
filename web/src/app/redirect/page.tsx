"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

import { supabaseSessionCheck } from "@/common";
import { Toast, ToastType } from "@/components";
import { login } from "@/redux";

export default function Page() {
	const router = useRouter();
	const dispatch = useDispatch();

	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		const abortController = new AbortController();

		supabaseSessionCheck()
			.then(async ({ accessToken, error }) => {
				if (accessToken === null) {
					throw error;
				}

				return fetch("http://localhost:3000/api/v1/auth/verify", {
					method: "POST",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify({ token: accessToken }),
					signal: abortController.signal,
				}).then(async (res) => ({ data: await res.json(), accessToken }));
			})
			.then(({ data, accessToken }) => {
				const username = data["username"];
				dispatch(login({ username, accessToken }));
				router.push("/chat");
			})
			.catch((err) => {
				if (err instanceof Error) {
					setError(err.message);
				} else {
					setError(err);
				}
			});

		return () => {
			abortController.abort();
		};
	}, [dispatch, router]);

	return (
		<>
			<title>Redirect | Tveeter</title>
			<h1>Redirecting...</h1>
			{error !== null && <Toast type={ToastType.Error} message={error} />}
		</>
	);
}
