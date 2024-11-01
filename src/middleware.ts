import { locales, localePrefix } from "navigation";
import createMiddleware from "next-intl/middleware";

export default createMiddleware({
	localePrefix,
	locales,
	defaultLocale: "ar",
});

export const config = {
	matcher: ["/", "/(ar|en)/:path*", "/((?!api|_next|.*\\..*).*)"],
};
