"use server";

import { apiBaseURL } from "config";

export const getBusinessesSlugs = async (page: any) => {
	try {
		const response = await fetch(
			`${apiBaseURL}/businesses/slugs?page=${page}`,
			{
				headers: {
					"Content-Type": "application/json",
					"App-ID": "WEBSITE",
					"X-Country-Code": "EG",
					"Accept-Language": "AR",
				},
			}
		);

		const data = await response.json();

		if (!response.ok) {
			throw new Error(
				`API request failed with status ${response.status}`
			);
		}

		return data;
	} catch (error: any) {
		throw new Error(error.message);
	}
};

export async function generateSitemaps(): Promise<Array<any>> {
	const businesses = await getBusinessesSlugs(1);

	const sitemapsNeeded = Math.ceil(businesses.count / 1000);

	const sitemaps = Array.from({ length: sitemapsNeeded }, (_, index) => ({
		id: index + 1,
	}));

	return sitemaps;
}

export default async function SiteMap({ id }: { id: number }): Promise<any> {
	const businesses = await getBusinessesSlugs(id);

	return businesses.results.flatMap((business: any) => {
		const commonEntries: any = [
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

		const restaurantEntries: any =
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
