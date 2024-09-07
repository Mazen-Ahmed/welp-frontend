import {
	BusinessPageInfo,
	DownloadBusinessApp,
	ForBusinessesHeader,
} from "components";
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
		title: t("forBusinesses"),
		openGraph: {
			title: t("forBusinesses"),
			description: t("forBusinesses"),
		},
	};
}

const BusinessesPage = async () => {
	const forBusinessesT = await getTranslations("forBusinesses");

	return (
		<div>
			<ForBusinessesHeader
				translation={{
					presence: forBusinessesT("presence"),
					downloadItOn: forBusinessesT("downloadItOn"),
					getItOn: forBusinessesT("getItOn"),
				}}
			/>
			<BusinessPageInfo
				translation={{
					benefits: forBusinessesT("benefits"),
					presence: forBusinessesT("presence"),
					addPortfolio: forBusinessesT("addPortfolio"),
					maintain: forBusinessesT("maintain"),
					benefitsDescription: forBusinessesT("benefitsDescription"),
					reviews: forBusinessesT("reviews"),
					reviewsDescription: forBusinessesT("reviewsDescription"),
				}}
			/>
			<DownloadBusinessApp
				translation={{
					downloadNow: forBusinessesT("downloadNow"),
					startWork: forBusinessesT("startWork"),
					downloadItOn: forBusinessesT("downloadItOn"),
					getItOn: forBusinessesT("getItOn"),
				}}
			/>
		</div>
	);
};

export default BusinessesPage;
