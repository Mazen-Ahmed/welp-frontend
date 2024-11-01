"use client";

import { CategoryItemDropdown } from "atoms";
import { CategoryType } from "interfaces";
import { Link } from "navigation";
import { useLocale } from "next-intl";
import Image from "next/image";
import { FaChevronLeft } from "react-icons/fa6";

const CategoriesCard = ({
	item,
	opened,
	setOpened,
	isChildren,
}: {
	item: CategoryType;
	opened: number | null;
	setOpened: (state: number | null) => void;
	isChildren: boolean;
}) => {
	const locale = useLocale();

	return (
		<div
			className="relative select-none"
			onMouseEnter={() => {
				if (!isChildren)
					opened === item?.id ? setOpened(null) : setOpened(item.id);
			}}
			onMouseLeave={() => setOpened(null)}>
			<Link
				href={
					isChildren
						? `/category/${item.slug || item.id}`
						: `/categories/${item.slug || item.id}`
				}>
				<div className="cursor-pointer  hover:scale-95 duration-150 rounded-3xl flex py-3 px-3 justify-between items-center border border-solid border-gray-200 bg-categories-gray shadow-sm text-black">
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
					{!isChildren && (
						<div>
							<FaChevronLeft
								className={`w-4 h-4 duration-150 ${
									locale === "en" && "rotate-180"
								} ${item.id === opened && "rotate-90"}`}
							/>
						</div>
					)}
				</div>
			</Link>
			{item.id === opened && (
				<CategoryItemDropdown childrenCategories={item.children} />
			)}
		</div>
	);
};

export default CategoriesCard;
