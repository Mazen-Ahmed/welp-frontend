import type { Metadata } from "next";
import { getMessages, getTranslations } from "next-intl/server";
import { PublicEnvScript } from "next-runtime-env";
import ClientProviders from "providers/client-providers";
import "styles/globals.css";

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
	const messages = await getMessages();

	return (
		<html lang={params.locale}>
			<head>
				<PublicEnvScript />
			</head>
			<body>
				<ClientProviders messages={messages}>
					{children}
				</ClientProviders>
			</body>
		</html>
	);
}
