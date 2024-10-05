"use client";

import { Modal } from "atoms";
import { ProductType } from "interfaces";
import Image from "next/image";
import { useState } from "react";

const ItemCard = ({ item }: { item: ProductType }) => {
	const [isOpened, setIsOpened] = useState(false);

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
					className=" rounded-md object-cover max-h-72 w-auto"
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
			<button
				style={{ boxShadow: " 0px 6px 21px 0px #00000014" }}
				className="flex  justify-start p-[8px] gap-3 overflow-hidden rounded-md my-4 shadow-[0px 6px 21px 0px #00000014] bg-white cursor-pointer w-full"
				onClick={() => setIsOpened(true)}>
				<Image
					loading="lazy"
					className="rounded-md object-cover self-center h-full"
					src={item.image}
					width={102}
					height={90}
					style={{ borderRadius: 5 }}
					alt="restaurant"
				/>
				<div className="flex flex-col items-start justify-between min-h-24 gap-1 my-2">
					<h1 className="font-bold text-base md:text-lg">
						{item.name}
					</h1>
					<p className="text-gray-600 text-start text-sm md:text-base">
						{item.description}
					</p>

					<div className="flex gap-3">
						{!!item?.price_before_discount && (
							<p className="text-gray-500 line-through text-sm font-bold">
								{item.price_before_discount} ج.م
							</p>
						)}
						<p className="text-secondary text-sm font-bold">
							{item.price_after_discount} ج.م
						</p>
					</div>
				</div>
			</button>
		</>
	);
};

export default ItemCard;
