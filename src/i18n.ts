"server-only";

import { locales } from "navigation";
import { getRequestConfig } from "next-intl/server";
import { notFound } from "next/navigation";

const messageImports: any = {
	en: () => import("../messages/en.json"),
	ar: () => import("../messages/ar.json"),
};

export function isValidLocale(locale: unknown) {
	return locales.some((l) => l === locale);
}

export default getRequestConfig(async (params) => {
	const baseLocale = new Intl.Locale(params.locale).baseName;
	if (!isValidLocale(baseLocale)) notFound();

	const messages = (await messageImports[baseLocale]()).default;
	return {
		messages,
	};
});
