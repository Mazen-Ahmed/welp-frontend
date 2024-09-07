"use client";

import { useTranslations } from "next-intl";
import Image from "next/image";
import { useEffect, useState } from "react";

const DownloadWelpAppBody = ({ deviceType }: { deviceType: string }) => {
	const [wasRedirected, setWasRedirected] = useState(false);

	const downloadWelpAppT = useTranslations("downloadWelpApp");

	useEffect(() => {
		if (!wasRedirected) {
			if (deviceType === "android") {
				window.location.href =
					"https://play.google.com/store/apps/details?id=com.welp.welp";
				setWasRedirected(true);
			} else {
				window.location.href =
					"https://apps.apple.com/us/app/welp-rating-social-reviews/id6478454000";
				setWasRedirected(true);
			}
		}
	}, [deviceType, wasRedirected]);

	return (
		<div className="flex flex-col items-center justify-center">
			<Image src="/logo.svg" width={150} height={150} alt="logo" />
			{!wasRedirected && downloadWelpAppT("redirect")}
			{wasRedirected && (
				<div>
					<button
						className="underline text-center px-1 bg-none "
						onClick={() => setWasRedirected(false)}>
						{downloadWelpAppT("didNotRedirect")}
					</button>
				</div>
			)}
		</div>
	);
};

export default DownloadWelpAppBody;
