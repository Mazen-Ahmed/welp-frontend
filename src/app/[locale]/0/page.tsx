import { DownloadWelpAppBody } from "components";
import { getTranslations } from "next-intl/server";
import { headers } from "next/headers";
import React from "react";

export async function generateMetadata({ params }: { params: any }) {
	const t = await getTranslations({
		locale: params.locale,
		namespace: "metadata",
	});

	return {
		title: t("download"),
		openGraph: {
			title: t("download"),
			description: t("downloadDescription"),
		},
	};
}

const DownloadWelpApp = () => {
	const headersList = headers();

	const userAgent = headersList.get("user-agent");

	const isMobile = new RegExp("Mobile|Android|iP(ad|od|hone)").test(
		userAgent || ""
	);

	const isAndroid = /Android/i.test(userAgent || "");

	const deviceType = isAndroid ? "android" : "ios";
	return (
		<div className="min-h-[80vh] flex items-center justify-center">
			<DownloadWelpAppBody deviceType={deviceType} />
		</div>
	);
};

export default DownloadWelpApp;
