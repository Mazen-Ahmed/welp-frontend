"use server";

import { MetadataRoute } from "next";
import { getBusinessesSlugs } from "services/businesses";

export async function generateSitemaps() {
	const products = await getBusinessesSlugs(1);

	const sitemapsNeeded = Math.ceil(products.count / 1000);

	const sitemaps = Array.from({ length: sitemapsNeeded }, (_, index) => ({
		id: index + 1,
	}));

	return sitemaps;
}

export default async function sitemap({
	id,
}: {
	id: number;
}): Promise<MetadataRoute.Sitemap> {
	const businesses = await getBusinessesSlugs(id);

	return businesses.results.flatMap((business: any) => {
		const commonEntries = [
			{
				url: `${process.env.NEXT_PUBLIC_FRONTEND_URL}/biz/${business.slug}`,
				lastModified: new Date().toISOString(),
				alternates: {
					languages: {
						ar: `${process.env.NEXT_PUBLIC_FRONTEND_URL}/biz/${business.slug}`,
						en: `${process.env.NEXT_PUBLIC_FRONTEND_URL}/biz/${business.slug}`,
					},
				},
			},
		];

		const restaurantEntries =
			business.business_type === "RESTAURANT"
				? [
						{
							url: `${process.env.NEXT_PUBLIC_FRONTEND_URL}/biz/${business.slug}/menu`,
							lastModified: new Date().toISOString(),
							alternates: {
								languages: {
									ar: `${process.env.NEXT_PUBLIC_FRONTEND_URL}/biz/${business.slug}/menu`,
									en: `${process.env.NEXT_PUBLIC_FRONTEND_URL}/biz/${business.slug}/menu`,
								},
							},
						},
				  ]
				: [];

		return [...commonEntries, ...restaurantEntries];
	});
}
