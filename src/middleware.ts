import { locales } from "navigation";
import createMiddleware from "next-intl/middleware";

export default createMiddleware({
	localePrefix: "never",
	locales,
	defaultLocale: "ar",
	localeDetection: false,
});

export const config = {
	matcher: ["/", "/(ar|en)/:path*", "/((?!api|_next|_vercel|.*\\..*).*)"],
};
