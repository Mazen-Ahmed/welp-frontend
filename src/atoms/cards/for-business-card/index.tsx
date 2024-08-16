import Image from "next/image";
import React from "react";

const ForBusinessCard = ({
	image,
	title,
	description,
}: {
	image: string;
	title: string;
	description: string;
}) => {
	return (
		<div className="bg-white rounded-3xl flex flex-col gap-2 overflow-hidden">
			<div className="w-full h-64">
				<Image
					loading="lazy"
					src={image}
					alt="for businesses"
					width="200"
					height="200"
					className="h-full  w-full object-cover"
				/>
			</div>

			<div className="px-3 pb-10">
				<h1 className=" text-[14px] font-bold mb-3">{title}</h1>
				<p className="text-gray-500 font-[10px]">{description}</p>
			</div>
		</div>
	);
};

export default ForBusinessCard;
