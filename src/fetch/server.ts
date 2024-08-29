"use server";

import { apiBaseURL, appId } from "config";
import { getLocale } from "next-intl/server";
import { cookies } from "next/headers";
import { toast } from "react-toastify";

const getHeaders = async () => {
	const locale = await getLocale();

	const locationCookieString = cookies().get("location")?.value;

	let locationCookie;

	try {
		locationCookie = locationCookieString
			? JSON.parse(locationCookieString).country
			: undefined;
	} catch (error) {
		locationCookie = undefined; // handle the case where JSON.parse fails
	}
	const languageCookie = locale;

	// Construct headers without undefined values
	const headers: Record<string, string> = {};
	if (languageCookie) headers["Accept-Language"] = languageCookie;
	if (locationCookie) headers["X-Country-Code"] = locationCookie;
	headers["Content-Type"] = "application/json";
	headers["App-ID"] = appId as string;

	return headers;
};

export const post = async (path: string, formData: FormData) => {
	const res = await fetch(`${apiBaseURL}/${path}`, {
		method: "POST",
		headers: await getHeaders(),
		body: JSON.stringify(Object.fromEntries(formData)),
	});
	const parsedRes = await res.json();
	if (!res.ok) {
		return toast.error(parsedRes);
	}
	return { error: "" };
};

export const get = async (path: string) => {
	const res = await fetch(`${apiBaseURL}/${path}`, {
		headers: await getHeaders(),
	});

	// Check response status code
	if (!res.ok) {
		throw new Error(`API request failed with status ${res.status}`);
	}

	// Check response content type before parsing as JSON
	if (res.headers.get("content-type")?.toLowerCase() !== "application/json") {
		throw new Error(
			"Unexpected response content type. Expected application/json."
		);
	}

	const data = await res.json();

	return data;
};
