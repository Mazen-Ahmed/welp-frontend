import {
	ImagesSection,
	UserDownloadInfo,
	UsersDownloadHeader,
} from "components";
import { getTranslations } from "next-intl/server";
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
const UsersDownload = async () => {
	const usersT = await getTranslations("users");

	return (
		<div>
			<UsersDownloadHeader
				translation={{
					header: usersT("header"),
					getOffers: usersT("getOffers"),
				}}
			/>
			<ImagesSection />
			<UserDownloadInfo
				translation={{
					search: usersT("search"),
					allOfThis: usersT("allOfThis"),
					realReviews: usersT("realReviews"),
					userFriendly: usersT("userFriendly"),
					support: usersT("support"),
					realReviewsDescription: usersT("realReviewsDescription"),
					userFriendlyDescription: usersT("userFriendlyDescription"),
					supportDescription: usersT("supportDescription"),
				}}
			/>
		</div>
	);
};

export default UsersDownload;
