import { Link } from "navigation";
import Image from "next/image";
import React from "react";

const DownloadBusinessApp = ({ translation }: { translation: any }) => {
	return (
		<div
			className="min-h-[30vh] my-10 flex flex-col md:flex-row items-center justify-between gap-10 py-10  px-5 md:px-20"
			style={{
				background:
					" linear-gradient(97.55deg, rgba(255, 0, 0, 0.3) -2.18%, rgba(243, 179, 1, 0.3) 94.39%)",
			}}>
			<div className="font-bold  text-[30px] md:text-nowrap order-1 md:hidden ">
				<h3 className="text-center">{translation.downloadNow}</h3>
				<h3 className="mt-[10px] md:mt-[20px] text-center">
					{translation.startWork}
				</h3>
			</div>
			<div className="flex flex-1 flex-col gap-[30px] md:gap-[50px] order-3 md:order-1">
				<div className="font-bold text-[40px] md:text-nowrap hidden md:block ">
					<h3>{translation.downloadNow}</h3>
					<h3>{translation.startWork}</h3>
				</div>
				<div className=" flex items-center md:items-start gap-[23px] md:gap-10">
					<Link
						target="_blank"
						href={
							"https://play.google.com/store/apps/details?id=com.welp.bussiness"
						}>
						<Image
							src={"/google-store.png"}
							width={150}
							height={120}
							alt="google"
						/>
					</Link>

					<Link
						target="_blank"
						href={
							"https://apps.apple.com/app/welp-business/id6692606495"
						}>
						<Image
							src={"/app-store.png"}
							width={150}
							height={120}
							alt="apple"
						/>
					</Link>
				</div>
			</div>
			<div className="flex-1 h-[50vh] md:h-[70vh] flex items-center justify-end order-1 md:order-2">
				<Image
					src={"/business-mobile.svg"}
					width={200}
					height={200}
					className=" h-full"
					alt="download app"
				/>
			</div>
		</div>
	);
};

export default DownloadBusinessApp;
