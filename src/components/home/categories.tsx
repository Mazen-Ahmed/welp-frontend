"use client";

import { CategoriesItem } from "atoms";
import { CategoryType } from "interfaces";
import Link from "next/link";
import { useBusinessesFilterStore } from "store/businesses-filters";

const Categories = ({
	categories,
	translation,
}: {
	categories: Array<CategoryType>;
	translation: any;
}) => {
	const filteredCategories = [
		categories?.[0],
		categories?.[1],
		categories?.[2],
		categories?.[3],
		categories?.[4],
		categories?.[5],
		categories?.[6],
	];

	const searchKeyword = useBusinessesFilterStore(
		(state) => state.searchKeyword
	);

	return (
		<div className="w-full flex justify-center px-5 md:px-0">
			<div className="grid grid-cols-4 my-6 md:bg-orange-100 min-h-20 py-2  no-scrollbar w-full md:w-1/2 rounded-full md:relative md:-top-16 md:flex items-center justify-around gap-x-8 gap-y-4 md:px-4 md:gap-4 md:overflow-auto ">
				{filteredCategories?.map(
					(item: CategoryType, index: number) => (
						<Link
							key={item.id}
							className={`${
								(index === 5 || index === 6) &&
								"block md:hidden"
							}`}
							href={
								searchKeyword
									? `/biz?category=${item.id}&search=${searchKeyword}`
									: `/biz?category=${item.id}`
							}>
							<CategoriesItem
								text={item.name}
								icon={item?.icon}
							/>
						</Link>
					)
				)}
				<Link href={"/categories"}>
					<CategoriesItem
						text={translation.more}
						icon={"/dots.png"}
					/>
				</Link>
			</div>
		</div>
	);
};

export default Categories;
