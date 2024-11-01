import { CategoriesSearchInput } from "atoms";
import { CategoriesList } from "components";
import { getTranslations } from "next-intl/server";
import React from "react";
import { getCategoriesList } from "services";

const Categories: React.FC<any> = async ({ params }: { params: any }) => {
	const categories = await getCategoriesList(false);

	const categoriesT = await getTranslations("categories");

	return (
		<div className="my-10 flex flex-col justify-center items-center gap-10  px-10  ">
			<h1 className="text-5xl font-semibold text-center">
				{categoriesT("allCategories")}
			</h1>
			{/* <CategoriesSearchInput
				translation={{
					search: categoriesT("searchCategories"),
				}}
				fetchedCategories={categories}
			/> */}
			<CategoriesList
				isChildren={false}
				translation={{
					noCategories: categoriesT("noCategories"),
				}}
				categories={categories}
			/>
		</div>
	);
};

export default Categories;
