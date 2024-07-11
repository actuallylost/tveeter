"use client";

import { useSetAtom } from "jotai";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import { Toast, ToastType } from "@/components";
import { setAuthAtom, supabaseSessionCheck } from "@/lib";

export default function Page() {
	const router = useRouter();
	const setAuth = useSetAtom(setAuthAtom);

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
				setAuth({ isLoggedIn: true, username, accessToken });
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
	}, [router]);

	return (
		<>
			<title>Redirect | Tveeter</title>
			<h1>Redirecting...</h1>
			{error !== null && <Toast type={ToastType.Error} message={error} />}
		</>
	);
}
