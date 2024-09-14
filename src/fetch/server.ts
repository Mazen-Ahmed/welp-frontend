"use server";

import { apiBaseURL, appId } from "config";
import { getLocale } from "next-intl/server";
import { cookies } from "next/headers";

const getHeaders = async () => {
	// Fetch the locale asynchronously
	const locale = await getLocale();

	// Get cookies within the request context
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

	const headers: Record<string, string> = {};
	if (languageCookie) headers["Accept-Language"] = languageCookie;
	if (locationCookie) headers["X-Country-Code"] = locationCookie;
	headers["Content-Type"] = "application/json";
	headers["App-ID"] = appId || "WEBSITE";

	return headers;
};

export const post = async (path: string, formData: FormData) => {
	const headers = await getHeaders();
	const res = await fetch(`${apiBaseURL}/${path}`, {
		method: "POST",
		headers,
		body: JSON.stringify(Object.fromEntries(formData)),
	});
	const parsedRes = await res.json();
	if (!res.ok) {
		throw new Error(parsedRes);
	}
	return { error: "" };
};

export const get = async (path: string) => {
	const headers = await getHeaders();
	const res = await fetch(`${apiBaseURL}/${path}`, {
		headers,
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
