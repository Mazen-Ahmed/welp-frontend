import { Footer, Navbar } from "components";
import type { Metadata } from "next";
import {
	getLocale,
	getTranslations,
	unstable_setRequestLocale,
} from "next-intl/server";
import { Roboto, Tajawal } from "next/font/google";
import { headers } from "next/headers";
import "styles/globals.css";

const roboto = Roboto({ weight: ["700"], preload: false });
const tajawal = Tajawal({ weight: ["700"], preload: false });

export async function generateMetadata({
	params: { locale },
}: {
	params: any;
}): Promise<Metadata> {
	const t = await getTranslations({ locale, namespace: "metadata" });

	return {
		title: {
			default: t("welp"),
			template: `%s | ${t("welp")}`,
		},
		twitter: {
			card: "summary_large_image",
		},
	};
}

export default async function RootLayout({
	children,
	params,
}: Readonly<{
	children: React.ReactNode;
	params: any;
}>) {
	const locale = await getLocale();

	const headersList = headers();

	const userAgent = headersList.get("user-agent");

	const isMobile = new RegExp("Mobile|Android|iP(ad|od|hone)").test(
		userAgent || ""
	);

	const isAndroid = /Android/i.test(userAgent || "");

	const deviceType = isAndroid ? "android" : "ios";

	unstable_setRequestLocale(locale);

	const navbarT = await getTranslations("navbar");

	const businessT = await getTranslations("business");

	const footerT = await getTranslations("footer");

	const validationT = await getTranslations("validation");

	return (
		<div
			dir={locale === "ar" ? "rtl" : "ltr"}
			lang={locale}
			className={locale === "en" ? roboto.className : ""}
			style={{
				fontFamily:
					locale === "ar"
						? 'PrimaryFont, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"'
						: "",
				fontWeight: locale === "ar" ? 500 : 700,
			}}>
			<Navbar
				isMobile={isMobile}
				deviceType={deviceType}
				translation={{
					home: navbarT("home"),
					forBusinesses: navbarT("forBusinesses"),
					blog: navbarT("blog"),
					addPlace: navbarT("addPlace"),
					ex: navbarT("ex"),
					where: navbarT("where"),
					currentLocation: navbarT("currentLocation"),
					placeName: businessT("placeName"),
					city: businessT("city"),
					address: businessT("address"),
					description: businessT("description"),
					sendRequest: businessT("sendRequest"),
					cancel: businessT("cancel"),
					searchErrorMessage: validationT("minSearchLength"),
				}}
			/>
			{children}
			<Footer
				translation={{
					importantLinks: footerT("importantLinks"),
					bestPlatform: footerT("bestPlatform"),
					contactUs: footerT("contactUs"),
					address: footerT("address"),
					phone: footerT("phone"),
					email: footerT("email"),
					copyRights: footerT("copyRights"),
					welpCo: footerT("welpCo"),
					getItOn: footerT("getItOn"),
					downloadItOn: footerT("downloadItOn"),
					download: footerT("download"),
					usa: footerT("usa"),
					losAngles: footerT("losAngles"),
					egypt: footerT("egypt"),
					cairo: footerT("cairo"),
					offices: footerT("offices"),
					home: footerT("home"),
					forBusinesses: footerT("forBusinesses"),
					termsConditions: footerT("termsConditions"),
					privacyPolicy: footerT("privacyPolicy"),
					blog: footerT("blog"),
					aboutUs: footerT("aboutUs"),
				}}
			/>
		</div>
	);
}
