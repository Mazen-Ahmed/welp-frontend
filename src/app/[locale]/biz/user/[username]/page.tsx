import { OpenAppBody } from "components";
import { getTranslations } from "next-intl/server";
import { headers } from "next/headers";

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

const UsersRedirection = () => {
	const headersList = headers();

	const userAgent = headersList.get("user-agent");

	const isAndroid = /Android/i.test(userAgent || "");

	const deviceType = isAndroid ? "android" : "ios";

	return (
		<div
			style={{
				height: "80vh",
				display: "flex",
				alignItems: "center",
				justifyContent: "center",
			}}>
			<OpenAppBody deviceType={deviceType} />
		</div>
	);
};

export default UsersRedirection;
