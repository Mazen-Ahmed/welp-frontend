"use client";

import { useTranslations } from "next-intl";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useState } from "react";

const OpenApp = ({ deviceType }: { deviceType: string }) => {
	const [isOpening, setIsOpening] = useState(false);

	const navbarT = useTranslations("navbar");

	const pathname = usePathname();

	const handleOpenApp = () => {
		setIsOpening(true);

		window.location.href = "welp://home";

		setTimeout(() => {
			if (!document.hidden) {
				setIsOpening(false);
				if (deviceType === "android") {
					window.location.href =
						"https://play.google.com/store/apps/details?id=com.welp.welp";
				} else {
					window.location.href =
						"https://apps.apple.com/us/app/welp-rating-social-reviews/id6478454000";
				}
			}
		}, 1000);
	};


	return (
		<div className="bg-gray-50 flex mx-3 rounded-lg justify-between mt-4 px-2 py-4 text-white">
			<Image
				loading="lazy"
				src={"/logo.svg"}
				width={60}
				height={30}
				alt="logo"
			/>

			<button
				onClick={handleOpenApp}
				className="bg-secondary p-2 px-4 rounded-full">
				{isOpening ? navbarT("openingApp") : navbarT("openApp")}
			</button>
		</div>
	);
};

export default OpenApp;
