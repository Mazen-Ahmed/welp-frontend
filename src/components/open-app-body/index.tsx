"use client";

import Image from "next/image";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { ClipLoader } from "react-spinners";

const OpenAppBody = ({ deviceType }: { deviceType: string }) => {
	const [isOpeningApp, setIsOpeningApp] = useState(false);

	const pathname = usePathname();

	const handleOpenApp = () => {
		setIsOpeningApp(true);
		window.location.href =
			pathname === "/" ? "welp://home" : `welp://${pathname}`;

		setTimeout(() => {
			if (!document.hidden) {
				setIsOpeningApp(false);
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

	useEffect(() => {
		handleOpenApp();
	}, []);
	return (
		<div
			style={{
				display: "flex",
				alignItems: "center",
				justifyContent: "center",
				flexDirection: "column",
			}}>
			<Image src="/logo.svg" width={150} height={150} alt="logo" />
			{isOpeningApp && <ClipLoader color="#FF0000" size={40} />}
			{!isOpeningApp && (
				<button
					onClick={handleOpenApp}
					style={{
						background: "#FF0000",
						width: 118,
						height: 32,
						display: "flex",
						alignItems: "center",
						fontSize: 14,
						justifyContent: "center",
						color: "#fff",
						borderRadius: 999,
						boxShadow: "none",
						border: "none",
					}}>
					{isOpeningApp ? (
						<ClipLoader
							className="animate-spin "
							color="#fff"
							loading={true}
							size={25}
						/>
					) : (
						"فتح التطبيق"
					)}
				</button>
			)}
		</div>
	);
};

export default OpenAppBody;
