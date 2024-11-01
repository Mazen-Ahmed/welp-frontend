import { Link } from "navigation";
import Image from "next/image";
import React from "react";

const UsersDownloadHeader = ({ translation }: { translation: any }) => {
	return (
		<div
			className="download-header rounded-br-[50px] md:rounded-br-[300px] flex items-center justify-start pt-14 md:pt-28 flex-col"
			style={{
				background:
					"linear-gradient(97.55deg, rgba(255, 0, 0, 0.3) -2.18%, rgba(243, 179, 1, 0.3) 94.39%)",
			}}>
			<h2 className="  my-3 text-black text-center text-[20px] lg:text-[40px]">
				{translation.header}
			</h2>
			<h2 className="  mb-5 text-black text-center text-[20px]  lg:text-[40px]">
				{translation.getOffers}
			</h2>
			<div className=" flex gap-10">
				<Link
					target="_blank"
					href={
						"https://play.google.com/store/apps/details?id=com.welp.welp"
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
						"https://apps.apple.com/us/app/welp-rating-social-reviews/id6478454000"
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
	);
};

export default UsersDownloadHeader;
