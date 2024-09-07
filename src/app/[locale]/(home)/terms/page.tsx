import { TermsBody, TermsHeader } from "components";
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
		title: t("terms"),
		openGraph: {
			title: t("terms"),
			description: t("terms"),
		},
	};
}
const TermsOfUse = async () => {
	return (
		<div dir={"ltr"} className=" px-5 md:px-10">
			<TermsHeader />

			<TermsBody />
		</div>
	);
};

export default TermsOfUse;
