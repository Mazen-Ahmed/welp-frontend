import { PrivacyBody, PrivacyHeader } from "components";
import { Metadata } from "next";
import { getTranslations } from "next-intl/server";

export async function metadata({
	params: locale,
}: {
	params: any;
}): Promise<Metadata> {
	const t = await getTranslations({
		locale,
		namespace: "metadata",
	});

	return {
		title: t("privacy"),
		openGraph: {
			title: t("privacy"),
			description: t("privacy"),
		},
	};
}
const PrivacyPolicy = async () => {
	return (
		<div dir={"auto"}>
			<PrivacyHeader />

			<PrivacyBody />
		</div>
	);
};

export default PrivacyPolicy;
