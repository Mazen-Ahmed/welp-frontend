"use client";

import dynamic from "next/dynamic";
import Image from "next/image";
import Link from "next/link";
import React, { useMemo } from "react";
import { FaPhoneVolume } from "react-icons/fa6";
import { RiGlobalFill } from "react-icons/ri";
import { SiWhatsapp } from "react-icons/si";
import { SlLocationPin } from "react-icons/sl";
import ClipLoader from "react-spinners/ClipLoader";

const BusinessLocation = ({
	lng,
	lat,
	name,
	whatsapp,
	phone,
	location,
	website,
	translation,
	instagram_profile_url,
	twitter_profile_url,
	facebook_profile_url,
	tiktok_profile_url,
	youtube_profile_url,
}: {
	lng: number;
	lat: number;
	name: string;
	whatsapp: number;
	phone: string;
	location: string;
	website: string;
	translation: any;
	instagram_profile_url: string | null;
	twitter_profile_url: string | null;
	facebook_profile_url: string | null;
	tiktok_profile_url: string | null;
	youtube_profile_url: string | null;
}) => {
	const CustomMap = useMemo(
		() =>
			dynamic(() => import("atoms/map"), {
				loading: () => (
					<div className="flex items-center justify-center w-full h-full">
						<ClipLoader
							className="animate-spin"
							color="#FF0000"
							loading={true}
						/>
					</div>
				),
				ssr: false,
			}),
		[]
	);

	return (
		<div>
			<h3 className="text-xl my-1 font-bold">
				{translation.locationAndContact}
			</h3>
			<div className="rounded-3xl overflow-hidden border-1 border-solid border-gray-100 text-gray-500 ">
				<div className="w-full h-[40vh]">
					<CustomMap lng={lng} lat={lat} name={name} />
				</div>
				{location && (
					<>
						<hr />
						<div className="flex justify-start items-center py-3 gap-1 px-2">
							<SlLocationPin className="w-8 h-8" />
							{location}
						</div>
					</>
				)}
				{phone && (
					<>
						<hr />
						<div className="flex justify-start items-center py-3 gap-1 px-2">
							<FaPhoneVolume className="w-4 h-4" />
							{phone}
						</div>
					</>
				)}
				{whatsapp && (
					<>
						<hr />
						<div className="flex justify-start items-center py-3 gap-1 px-2">
							<SiWhatsapp className="w-4 h-4" />
							{whatsapp}
						</div>
					</>
				)}
				{website && (
					<>
						<hr />
						<div className="flex justify-start items-center py-3 gap-1 px-2">
							<RiGlobalFill className="w-5 h-5" />
							<Link
								href={website}
								target="_blank"
								className="underline">
								{translation.site}
							</Link>
						</div>
					</>
				)}
				{(instagram_profile_url ||
					twitter_profile_url ||
					facebook_profile_url ||
					tiktok_profile_url ||
					youtube_profile_url) && (
					<>
						<hr />
						<div className="flex justify-center items-center py-3 gap-3 px-2">
							{youtube_profile_url && (
								<Link
									href={youtube_profile_url}
									target="_blank"
									className="underline">
									<Image
										alt="youtube"
										width={35}
										height={35}
										src={"/youtube.svg"}
									/>
								</Link>
							)}
							{tiktok_profile_url && (
								<Link
									href={tiktok_profile_url}
									target="_blank"
									className="underline">
									<Image
										alt="tiktok"
										width={35}
										height={35}
										src={"/tiktok.svg"}
									/>
								</Link>
							)}
							{instagram_profile_url && (
								<Link
									href={instagram_profile_url}
									target="_blank"
									className="underline">
									<Image
										alt="instagram"
										width={35}
										height={35}
										src={"/instagram.svg"}
									/>
								</Link>
							)}
							{facebook_profile_url && (
								<Link
									href={facebook_profile_url}
									target="_blank"
									className="underline">
									<Image
										alt="facebook"
										width={35}
										height={35}
										src={"/facebook.svg"}
									/>
								</Link>
							)}
							{twitter_profile_url && (
								<Link
									href={twitter_profile_url}
									target="_blank"
									className="underline">
									<Image
										alt="x"
										width={35}
										height={35}
										src={"/x.svg"}
									/>
								</Link>
							)}
						</div>
					</>
				)}
			</div>
		</div>
	);
};

export default BusinessLocation;
