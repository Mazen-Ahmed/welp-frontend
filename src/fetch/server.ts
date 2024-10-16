"use server";

import { apiBaseURL, appId } from "config";
import { getLocale } from "next-intl/server";
import { cookies } from "next/headers";

const refreshAccessToken = async () => {
	const user = cookies().get("user")?.value;

	const res = await fetch(`${apiBaseURL}/users/refresh-token`, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify({ user }),
	});

	if (!res.ok) {
		throw new Error("Failed to refresh token");
	}

	const { jwt } = await res.json();

	return jwt;
};

const getHeaders = async (withAuth: boolean) => {
	const locale = await getLocale();
	const locationCookieString = cookies().get("location")?.value;

	let locationCookie;
	try {
		locationCookie = locationCookieString
			? JSON.parse(locationCookieString).country
			: undefined;
	} catch (error) {
		locationCookie = undefined;
	}

	const headers: Record<string, string> = {};
	if (locale) headers["Accept-Language"] = locale;
	if (locationCookie) headers["X-Country-Code"] = locationCookie;
	headers["Content-Type"] = "application/json";
	headers["App-ID"] = appId || "WEBSITE";
	console.log(appId, "APP_ID");

	if (withAuth) {
		const tokenCookie = cookies().get("token")?.value;
		if (tokenCookie) headers["Authorization"] = `Bearer ${tokenCookie}`;
	}

	return headers;
};

const handleRequest = async (
	method: string,
	path: string,
	data?: any,
	withAuth = false,
	withFormData = false
) => {
	let headers = await getHeaders(withAuth);

	if (!withFormData && data) {
		headers["Content-Type"] = "application/json";
	}

	let body = withFormData ? data : JSON.stringify(data);

	let res = await fetch(`${apiBaseURL}/${path}`, {
		method,
		headers,
		body,
	});

	if (res.status === 401 && withAuth) {
		try {
			const { token, error } = await refreshAccessToken();

			if (error) {
				return console.log("Authentication error, please login again");
			}

			headers["Authorization"] = `Bearer ${token}`;

			// Retry the request with the new token
			res = await fetch(`${apiBaseURL}/${path}`, {
				method,
				headers,
				body,
			});
		} catch (error) {
			return console.log("Authentication error, please login again");
		}
	}

	let parsedRes;
	try {
		parsedRes = await res.json();
	} catch (error) {
		return console.log("Failed to parse response");
	}

	if (!res.ok) {
		throw new Error(parsedRes?.message || res.statusText);
	}

	return parsedRes;
};

// Exported functions
export const post = async (
	path: string,
	data: any,
	withAuth = false,
	withFormData = false
) => {
	return handleRequest("POST", path, data, withAuth, withFormData);
};

export const patch = async (
	path: string,
	data: any,
	withAuth = false,
	withFormData = false
) => {
	return handleRequest("PATCH", path, data, withAuth, withFormData);
};

export const put = async (
	path: string,
	data: any,
	withAuth = false,
	withFormData = false
) => {
	return handleRequest("PUT", path, data, withAuth, withFormData);
};

export const del = async (path: string, withAuth = false) => {
	return handleRequest("DELETE", path, undefined, withAuth);
};

export const get = async (path: string, withAuth = false) => {
	return handleRequest("GET", path, undefined, withAuth);
};
