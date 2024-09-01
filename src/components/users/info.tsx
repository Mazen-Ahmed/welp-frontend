import Image from "next/image";
import React from "react";

const UserDownloadInfo = ({ translation }: { translation: any }) => {
	return (
		<div className="flex flex-col items-center justify-center gap-2 my-10 px-10">
			<h1 className="text-[25px] md:ext-[35px] text-center md:text-start">
				{translation.search}
			</h1>
			<h1 className="text-[25px] md:text-[35px]">&</h1>
			<h1 className="text-[25px] md:text-[35px] text-center md:text-start">
				{translation.allOfThis}
			</h1>

			<div className="grid grid-cols-1 md:grid-cols-3 gap-5">
				<div className="py-4 px-3 flex flex-col gap-2 items-center justify-center border border-gray-200 rounded-3xl">
					<Image
						src="/reviews.svg"
						width={100}
						height={100}
						alt="icon"
						className="w-20 h-20"
					/>
					<h1>{translation.realReviews}</h1>
					<p className="text-sm text-gray-500 text-center">
						{translation.realReviewsDescription}
					</p>
				</div>
				<div className="py-4 px-3 flex flex-col gap-2 items-center justify-center border border-gray-200 rounded-3xl">
					<Image
						src="/user-friendly.svg"
						width={100}
						height={100}
						alt="icon"
						className="w-20 h-20"
					/>
					<h1>{translation.userFriendly}</h1>
					<p className="text-sm text-gray-500 text-center">
						{translation.userFriendlyDescription}
					</p>
				</div>
				<div className="py-4 px-3 flex flex-col gap-2 items-center justify-center border border-gray-200 rounded-3xl">
					<Image
						src="/support.svg"
						width={100}
						height={100}
						alt="icon"
						className="w-20 h-20"
					/>
					<h1>{translation.support}</h1>
					<p className="text-sm text-gray-500 text-center">
						{translation.supportDescription}
					</p>
				</div>
			</div>
		</div>
	);
};

export default UserDownloadInfo;
