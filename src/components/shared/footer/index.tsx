import { Link } from "navigation";
import Image from "next/image";
import React from "react";

const Footer = ({ translation }: { translation: any }) => {
	return (
		<div className="flex flex-col gap-4 ">
			<div className="flex flex-col md:flex-row  bg-white rounded-t-3xl shadow-inner pt-[40px] px-5 md:px-[80px]  items-center md:items-start justify-start  md:justify-around gap-5 md:gap-14">
				<div className="flex  md:w-full w-1/2 mx-auto  gap-2 flex-col items-start justify-center">
					<Image
						loading="lazy"
						src="/logo.svg"
						width={100}
						height={100}
						alt="logo"
					/>
					<p className="font-bold">{translation.bestPlatform}</p>
					<div className="flex gap-2">
						<Link target="_blank" href={"https://x.com/Welpusa"}>
							<Image
								loading="lazy"
								src="/x.svg"
								width={30}
								height={30}
								alt="x"
							/>
						</Link>
						<Link
							target="_blank"
							href={"https://www.facebook.com/welpegy"}>
							<Image
								loading="lazy"
								src="/facebook.svg"
								width={30}
								height={30}
								alt="facebook"
							/>
						</Link>

						<Link
							target="_blank"
							href={"https://instagram.com/welpegy"}>
							<Image
								loading="lazy"
								src="/instagram.svg"
								width={30}
								height={30}
								alt="instagram"
							/>
						</Link>
						<Link
							target="_blank"
							href={"https://www.tiktok.com/@welpegy"}>
							<Image
								loading="lazy"
								src="/tiktok.svg"
								width={30}
								height={30}
								alt="tiktok"
							/>
						</Link>
					</div>
				</div>
				<div className="flex flex-col w-1/2 mx-auto md:w-full items-start justify-center gap-2 md:ps-10">
					<h1 className="text-lg">{translation.importantLinks}</h1>
					<ol className="text-gray-500 list-disc ms-5 flex flex-col gap-3 text-sm">
						<li>
							<Link href={"/"}>{translation.home}</Link>
						</li>
						<li>
							<Link
								href={"https://blog.welpstar.com/"}
								target="_blank">
								{translation.blog}
							</Link>
						</li>
						<li>
							<Link href={"/businesses"}>
								{translation.forBusinesses}
							</Link>
						</li>
						<li>
							<Link href={"/contact"}>
								{translation.contactUs}
							</Link>
						</li>
						<li>
							<Link href={"/terms"}>
								{translation.termsConditions}
							</Link>
						</li>
						<li>
							<Link href={"/privacy"}>
								{translation.privacyPolicy}
							</Link>
						</li>
					</ol>
				</div>
				<div className="flex flex-col w-1/2 md:w-full mx-auto items-start justify-start gap-2 text-sm ">
					<h1 className="text-lg">{translation.offices}</h1>
					<div className=" flex flex-col items-start justify-center text-gray-500">
						<div className="flex flex-1 gap-1 text-sm">
							{translation.usa}:
							<p className="text-xs flex-1">
								{translation.losAngles}
							</p>
						</div>
						<div className="flex gap-1 my-2 text-sm">
							{translation.egypt}:<p>{translation.cairo}</p>
						</div>
					</div>
					<h1 className="text-lg">{translation.contactUs}</h1>
					<div className=" flex flex-col items-start justify-center text-gray-500">
						<p className="flex gap-1">
							{translation.address}: California
						</p>
						<div className="flex gap-1 items-center ">
							{translation.phone}:
							<div className="flex  justify-start items-start gap-1 ">
								<p className="shrink-0" dir="ltr">
									{" "}
									+1(949) 993-8566
								</p>
								-
								<p className="shrink-0" dir="ltr">
									{" "}
									+201229999268
								</p>
							</div>
						</div>
						<div className="flex gap-1 text-xs md:text-sm flex-1">
							{translation.email} :{" "}
							<Link
								href={"mailto:Info@welpstar.com"}
								target="_blank"
								className="underline flex-1">
								Info@welpstar.com
							</Link>
						</div>
					</div>
				</div>
				<div className="flex flex-col w-1/2 mx-auto md:w-full items-start justify-start gap-3 ">
					<h1 className="text-lg "> {translation.download}</h1>
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

			<div className="text-center text-sm text-gray-500  my-[16px] font-semibold">
				{translation.copyRights} | {translation.welpCo}
			</div>
		</div>
	);
};

export default Footer;
