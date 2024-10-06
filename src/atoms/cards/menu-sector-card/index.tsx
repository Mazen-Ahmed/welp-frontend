"use client";

import Modal from "atoms/modal";
import { ProductType } from "interfaces";
import Image from "next/image";
import React, { useState } from "react";
import { ClipLoader } from "react-spinners";

const MenuSectorCard = ({ item }: { item: ProductType }) => {
	const [isOpened, setIsOpened] = useState(false);

	const [isLoading, setIsLoading] = useState(true);

	const data = {
		isOpened,
		setIsOpened,
		title: item.name,
		description: item.description,
	};
	return (
		<>
			<Modal className={"w-full max-w-sm"} data={data}>
				<Image
					loading="lazy"
					src={item.image}
					className=" rounded-2xl object-cover max-h-72 w-auto"
					width={150}
					height={30}
					alt={item.name}
				/>
				<div className="my-4 flex justify-between">
					<h2 className=" text-xl font-bold leading-tight">
						{item.name}
					</h2>

					<div className="flex flex-col gap-3">
						<p className="text-secondary text-lg font-bold">
							{item.price_after_discount} ج.م
						</p>
						{!!item?.price_before_discount && (
							<p className="text-gray-500 line-through text-md font-bold">
								{item.price_before_discount} ج.م
							</p>
						)}
					</div>
				</div>
				{item.description}
			</Modal>
			<div
				className="flex flex-col  text-black rounded-2xl overflow-hidden bg-white shadow-md text-xs cursor-pointer"
				onClick={() => setIsOpened(true)}>
				{isLoading && (
					<div className="w-[114px] h-[114px]  flex items-center self-center rounded-[15px] justify-center absolute top-[8px] start-[8px] bg-gray-200">
						<ClipLoader color="#FF0000" size={30} />
					</div>
				)}
				<Image
					loading="lazy"
					src={item.image}
					className="  object-cover h-32 w-auto"
					width={150}
					height={30}
					onLoad={() => setIsLoading(false)}
					alt={item.name}
				/>
				<div className="my-4 flex justify-between px-3">
					<h2 className=" text-lg font-bold leading-tight">
						{item.name}
					</h2>

					<div className="flex flex-col gap-1">
						<p className="text-secondary text-md font-bold">
							{item.price_after_discount} ج.م
						</p>
						{!!item?.price_before_discount && (
							<p className="text-gray-500 line-through text-xs font-bold">
								{item.price_before_discount} ج.م
							</p>
						)}
					</div>
				</div>
				<p className="px-3 text-gray-400 mb-2">{item.description}</p>
			</div>
		</>
	);
};

export default MenuSectorCard;
