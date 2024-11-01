"use client";

import { CategoryType } from "interfaces";
import { Link } from "navigation";
import React from "react";

const CategoryItemDropdown: React.FC<any> = ({
	childrenCategories,
}: {
	childrenCategories: Array<CategoryType>;
}) => {
	return (
		<div className="bg-white shadow-md absolute start-0 p-3 w-3/4 max-h-96 overflow-y-auto origin-bottom-right rounded-md z-20">
			{childrenCategories?.map((item, index) => (
				<div key={item.id} className="my-2 ">
					<Link href={`/category/${item.slug || item.id}`}>
						<div className=" hover:bg-gray-100 duration-150 p-1 rounded-md w-full">
							{item.name}
						</div>
					</Link>
					{index !== childrenCategories?.length - 1 && (
						<hr className="my-2" />
					)}
				</div>
			))}

			{childrenCategories?.length === 0 && (
				<div className="w-full h-full flex items-center justify-center">
					لا يوجد فئات
				</div>
			)}
		</div>
	);
};

export default CategoryItemDropdown;
