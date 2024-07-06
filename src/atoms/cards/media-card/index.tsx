"use client";

import { Modal } from "atoms";
import { MediaType } from "interfaces";
import Image from "next/image";
import { useState } from "react";

const MediaCard = ({ item }: { item: MediaType }) => {
	const [isOpened, setIsOpened] = useState(false);

	const data = {
		isOpened,
		setIsOpened,
	};
	return (
		<div className="rounded-2xl shadow-lg overflow-hidden">
			<Modal className={"w-full md:w-1/2 h-96 pb-1"} data={data}>
				<Image
					src={item.file}
					className=" rounded-2xl object-contain mb-5 max-h-72 w-full"
					width={150}
					height={150}
					alt={item.file}
				/>
			</Modal>
			<Image
				onClick={() => setIsOpened(true)}
				src={item.file}
				width={150}
				height={30}
				className="  object-cover h-32 w-full shadow-md cursor-zoom-in"
				alt={"media"}
			/>
		</div>
	);
};

export default MediaCard;
