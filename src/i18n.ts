"use server";

import { getCookie } from "cookies-next";
import { getRequestConfig } from "next-intl/server";
import { cookies } from "next/headers";
import { notFound } from "next/navigation";

const locales = ["en", "ar"];

export default getRequestConfig(async () => {
	const locale =
		(getCookie("NEXT_LOCALE") as string) ||
		(cookies().get("NEXT_LOCALE")?.value as string) ||
		"ar";

	if (!locales.includes(locale)) notFound();

	return {
		locale,
		messages: (await import(`../messages/${locale}.json`))?.default,
	};
});
