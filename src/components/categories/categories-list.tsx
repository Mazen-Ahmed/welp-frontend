"use client";

import { CategoriesCard } from "atoms";
import { CategoryType } from "interfaces";
import { useState } from "react";
import { useCategoriesStore } from "store/categories";

const CategoriesList = ({
	translation,
	categories,
	isChildren,
}: {
	translation: any;
	categories: CategoryType[];
	isChildren: boolean;
}) => {
	const [opened, setOpened] = useState<number | null>(null);

	const searchKeyword = useCategoriesStore((state) => state.searchKeyword);

	return (
		<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4  my-4 w-full">
			{categories.map((item: CategoryType) => (
				<CategoriesCard
					isChildren={isChildren}
					opened={opened}
					setOpened={setOpened}
					key={item.id}
					item={item}
				/>
			))}

			{categories?.length === 0 && searchKeyword && (
				<div className="col-span-3 flex items-center justify-center  h-32">
					{translation.noCategories}
				</div>
			)}
		</div>
	);
};

export default CategoriesList;
