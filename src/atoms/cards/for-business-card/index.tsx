"use client";

import { Modal } from "atoms";
import { useTranslations } from "next-intl";
import Image from "next/image";
import React, { useState } from "react";
import { textReformat } from "utils";

const ForBusinessCard = ({
	image,
	title,
	description,
}: {
	image: string;
	title: string;
	description: string;
}) => {
	const [isOpened, setIsOpened] = useState(false);

	const businessesT = useTranslations("business");

	const data = {
		isOpened,
		setIsOpened,
		title: title,
		description: description,
	};
	return (
		<div className="bg-white rounded-3xl flex flex-col gap-2 overflow-hidden relative">
			<Modal className={"xs:full md:w-1/2"} data={data}>
				<h2 className=" text-xl font-bold leading-tight mb-4">
					{title}
				</h2>

				<p className="text-gray-500 xs:font-[8px] md:font-[10px] max-h-96 overflow-auto">
					{description}
				</p>
			</Modal>
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
				<h3 className=" text-[14px] font-bold mb-3">{title}</h3>
				<p className="text-gray-500 font-[10px]">
					{textReformat(description, 100)}
				</p>
			</div>

			{description?.length > 100 && (
				<button
					onClick={() => setIsOpened(true)}
					className="py-2 absolute w-full  text-yellow-500 bottom-0">
					{businessesT("seeMore")}
				</button>
			)}
		</div>
	);
};

export default ForBusinessCard;
