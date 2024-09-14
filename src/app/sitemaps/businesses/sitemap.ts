import { getBusinessesSlugs } from "services/businesses";

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
