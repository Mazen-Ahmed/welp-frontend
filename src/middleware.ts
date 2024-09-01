import { locales } from "navigation";
import createMiddleware from "next-intl/middleware";
import { type NextRequest, type NextResponse } from "next/server";

const nextIntlMiddleware = createMiddleware({
	localePrefix: "never",
	locales,
	defaultLocale: "ar",
	localeDetection: false,
});

export default function (req: NextRequest): NextResponse {
	return nextIntlMiddleware(req);
}

export const config = {
	matcher: ["/", "/((?!api|_next|_vercel|.*\\..*).*)"],
};
