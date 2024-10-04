"use client";

import { useLocale } from "next-intl";
import { env } from "next-runtime-env";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const DownloadApp = ({ translation }: { translation: any }) => {
	const locale = useLocale();

	return (
		<div className="flex px-10 md:px-20 flex-col md:flex-row bg-orange-200 min-h-96 gap-8  py-10 md:py-0  my-10  ">
			<div className="flex flex-col  flex-1 text-center md:text-start  justify-center order-1">
				<h1 className="text-2xl md:text-4xl font-bold my-2">
					{translation.download}
				</h1>
				<p className="font-light text-gray-900 my-2 hidden md:block">
					{translation.available}
				</p>

				<div className=" justify-center md:justify-start gap-[40px] mt-4 hidden md:flex">
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
			<div className=" flex-1 flex justify-center  align-center relative overflow-hidden order-2 ">
				<Image
					src="/iPhone.webp"
					width={160}
					height={150}
					alt="iPhone"
					className={`hidden lg:block relative ${
						locale === "ar" ? " -right-8" : "-left-8"
					} -bottom-40`}
				/>
				<Image
					src="/iPhone.webp"
					width={160}
					height={150}
					alt="iphone"
					className={`lg:relative ${
						locale === "ar" ? " -left-8" : "-right-8"
					} -top-40`}
				/>
			</div>
			<div className="flex flex-col  text-center md:text-start  justify-center  order-3">
				<p className="font-light text-gray-900 my-2 block md:hidden">
					{translation.available}
				</p>

				<div className=" justify-center md:justify-start gap-[40px] mt-4 flex md:hidden">
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
		</div>
	);
};

export default DownloadApp;
