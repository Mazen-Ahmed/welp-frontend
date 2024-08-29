import { apiBaseURL, appId } from "config";
import { getCookie } from "cookies-next";
import { toast } from "react-toastify";

const sharedHeaders = () => {
	const locale = getCookie("NEXT_LOCALE");

	const locationCookieString = getCookie("location");

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
const getAuthHeader = () => {
	const tokenCookie = `Bearer ${getCookie("clientToken")}`;

	const headers: Record<string, string> = {};
	if (tokenCookie) headers["Authorization"] = tokenCookie;

	return headers;
};

export const post = async (
	path: string,
	data: any,
	withAuth = false,
	withFormData = false
) => {
	const headers: any = withAuth ? getAuthHeader() : {};

	if (!withFormData) {
		headers["Content-Type"] = "application/json";
	}

	const body = withFormData ? data : JSON.stringify(data);

	const res = await fetch(`${apiBaseURL}/${path}`, {
		method: "POST",
		headers: { ...headers, ...sharedHeaders },
		body,
	});

	let parsedRes;
	try {
		parsedRes = await res.json();
	} catch (error) {
		return toast.error("Failed to parse response");
	}

	if (!res.ok) {
		return toast.error(
			`Error ${res.status}: ${parsedRes.message || res.statusText}`
		);
	}

	return parsedRes;
};

export const patch = async (
	path: string,
	data: any,
	withAuth = false,
	withFormData = false
) => {
	const headers: any = withAuth ? getAuthHeader() : {};

	if (!withFormData) {
		headers["Content-Type"] = "application/json";
	}

	const res = await fetch(`${apiBaseURL}/${path}`, {
		method: "PATCH",
		headers,
		body: withFormData ? data : JSON.stringify(data),
	});

	let parsedRes;
	try {
		parsedRes = await res.json();
	} catch (error) {
		return toast.error("Failed to parse response");
	}

	if (!res.ok) {
		return toast.error(
			`Error ${res.status}: ${parsedRes.message || res.statusText}`
		);
	}

	return parsedRes;
};

export const del = async (path: string, withAuth = false) => {
	const res = await fetch(`${apiBaseURL}/${path}`, {
		method: "DELETE",
		headers: { ...(withAuth && getAuthHeader()) },
	});
	const parsedRes = await res.json();
	if (!res.ok) {
		return toast.error(parsedRes);
	}
	return parsedRes;
};

export const get = async (path: string, withAuth = false) => {
	const res = await fetch(`${apiBaseURL}/${path}`, {
		headers: sharedHeaders(),
	});

	const data = await res.json();

	if (!res.ok) {
		throw new Error(data?.message);
	}

	return data;
};
