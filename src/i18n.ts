import { getCookie } from "cookies-next";
import { getRequestConfig } from "next-intl/server";
import { notFound } from "next/navigation";

// Can be imported from a shared config
const locales = ["en", "ar"];

export default getRequestConfig(async () => {
	const locale = (getCookie("NEXT_LOCALE") as string) || "ar";

	if (!locales.includes(locale)) notFound();

	return {
		messages: (await import(`../messages/${locale}.json`))?.default,
	};
});
