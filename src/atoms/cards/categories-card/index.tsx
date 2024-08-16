"use client";

import { CategoryItemDropdown } from "atoms";
import { CategoryType } from "interfaces";
import Image from "next/image";
import { FaChevronRight } from "react-icons/fa6";

const CategoriesCard = ({
	item,
	locale,
	opened,
	setOpened,
}: {
	item: CategoryType;
	locale: string;
	opened: number | null;
	setOpened: (state: number | null) => void;
}) => {
	return (
		<div className="relative select-none">
			<div
				onClick={() =>
					opened === item?.id ? setOpened(null) : setOpened(item.id)
				}
				className="cursor-pointer  hover:scale-95 duration-150 rounded-3xl flex py-3 px-3 justify-between items-center border border-solid border-gray-200 bg-categories-gray shadow-sm text-black">
				<div className="flex items-center gap-2">
					<Image
						loading="lazy"
						src={item.icon}
						width={50}
						height={50}
						alt={item.name}
					/>

					<h2>{item.name}</h2>
				</div>
				<div>
					<FaChevronRight
						className={`w-4 h-4 duration-150 ${
							locale === "ar" && "rotate-180"
						} ${item.id === opened && "rotate-90"}`}
					/>
				</div>
			</div>
			{item.id === opened && (
				<CategoryItemDropdown childrenCategories={item.children} />
			)}
		</div>
	);
};

export default CategoriesCard;
