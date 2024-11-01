import { CategoriesList } from "components";
import { CategoryType } from "interfaces";
import { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import React from "react";
import { getCategory } from "services";

export async function generateMetadata({
	params: { slug },
}: {
	params: any;
}): Promise<Metadata> {
	const category = await getCategory(slug, true);

	return {
		title: category.name,
		openGraph: {
			images: [category.icon],
		},
		twitter: {
			card: "summary_large_image",
		},
	};
}
const CategoriesChildren = async ({ params: { slug } }: { params: any }) => {
	const category: CategoryType = await getCategory(slug, true);

	const categoriesT = await getTranslations("categories");

	return (
		<div className="my-10 flex flex-col justify-center items-center gap-10  px-10  ">
			<h1 className="text-5xl font-semibold text-center">
				{category.name}
			</h1>

			<CategoriesList
				isChildren
				translation={{
					noCategories: categoriesT("noCategories"),
				}}
				categories={category.children}
			/>
		</div>
	);
};

export default CategoriesChildren;
