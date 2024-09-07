"use client";

import { useTranslations } from "next-intl";
import Image from "next/image";
import { useEffect } from "react";
import React from "react";

const DownloadWelpAppBody = ({ deviceType }: { deviceType: string }) => {
	const downloadWelpAppT = useTranslations("downloadWelpApp");

	useEffect(() => {
		if (deviceType === "android") {
			window.location.href =
				"https://play.google.com/store/apps/details?id=com.welp.welp";
		} else {
			window.location.href =
				"https://apps.apple.com/us/app/welp-rating-social-reviews/id6478454000";
		}
	}, [deviceType]);

	return (
		<div className="flex flex-col items-center justify-center">
			<Image src="/logo.svg" width={150} height={150} alt="logo" />
			{downloadWelpAppT("redirect")}
		</div>
	);
};

export default DownloadWelpAppBody;
