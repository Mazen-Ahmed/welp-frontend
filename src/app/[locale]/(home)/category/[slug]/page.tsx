import { BusinessesFilters, BusinessesList } from "components";
import { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { env } from "next-runtime-env";
import React from "react";
import { getCategory } from "services";

export async function generateMetadata({
	params: { slug, locale },
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
		alternates: {
			canonical: `{${env(
				"NEXT_PUBLIC_FRONTEND_URL"
			)}}/${locale}/biz/category${slug}`,
		},
	};
}
const CategoryBusinessesListPage = async ({
	params: { slug },
}: {
	params: any;
}) => {
	const category = await getCategory(slug, true);
	const businessT = await getTranslations("business");
	const navbarT = await getTranslations("navbar");
	return (
		<div className="grid grid-cols-4 gap-5 px-10 my-10">
			<BusinessesFilters
				category={category}
				translation={{
					filters: businessT("filters"),
					price: businessT("price"),
					high: businessT("high"),
					medium: businessT("medium"),
					low: businessT("low"),
					expensive: businessT("expensive"),
					isOpened: businessT("isOpened"),
					suggested: businessT("suggested"),
					offersDelivery: businessT("offersDelivery"),
				}}
			/>
			<BusinessesList
				category={category}
				translation={{
					noResults: businessT("noResults"),
					filters: businessT("filters"),
					price: businessT("price"),
					high: businessT("high"),
					medium: businessT("medium"),
					low: businessT("low"),
					expensive: businessT("expensive"),
					isOpened: businessT("isOpened"),
					suggested: businessT("suggested"),
					offersDelivery: businessT("offersDelivery"),
					currentLocation: navbarT("currentLocation"),
				}}
			/>
		</div>
	);
};

export default CategoryBusinessesListPage;
