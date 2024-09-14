"use server";

import { getLocale } from "next-intl/server";
import { cookies } from "next/headers";

export const getHeaders = async () => {
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

	const headers: Record<string, string> = {};
	if (languageCookie) headers["Accept-Language"] = languageCookie;
	if (locationCookie) headers["X-Country-Code"] = locationCookie;
	headers["Content-Type"] = "application/json";
	headers["App-ID"] = process.env.APP_ID || "WEBSITE";

	return headers;
};
