import { createSharedPathnamesNavigation } from "next-intl/navigation";

export const locales = ["ar", "en"];
export const localePrefix = "never"; // Default

export const { Link, redirect, usePathname, useRouter } =
	createSharedPathnamesNavigation({ locales, localePrefix });
