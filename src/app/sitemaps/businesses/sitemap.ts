import { MetadataRoute } from "next";
import { getBusinessesSlugs } from "services/businesses";

// Fetch the number of sitemaps required and define the paths
export async function getStaticPaths() {
	const businesses = await getBusinessesSlugs(1);

	console.log(businesses, "buss build");

	// Determine the number of sitemaps needed (e.g., one for every 1000 businesses)
	const sitemapsNeeded = Math.ceil(businesses.count / 1000);

	// Generate an array of paths for each sitemap
	const paths = Array.from({ length: sitemapsNeeded }, (_, index) => ({
		params: { id: (index + 1).toString() }, // `id` should be a string
	}));

	return {
		paths,
		fallback: false, // If you want to serve 404 for non-existing sitemaps
	};
}

export async function getStaticProps({ params }: { params: { id: string } }) {
	const id = Number(params.id); // Ensure the id is a number

	// Fetch businesses for this specific page/sitemap
	const businesses = await getBusinessesSlugs(id);

	// If no businesses, return 404
	if (!businesses || businesses.results.length === 0) {
		return {
			notFound: true,
		};
	}

	// Return the props needed to render the sitemap
	return {
		props: {
			businesses: businesses.results,
		},
		revalidate: 60 * 60, // Regenerate the page every hour if needed
	};
}

export default function Sitemap({ businesses }: { businesses: any[] }) {
	// Ensure businesses is an array to prevent flatMap from failing
	if (!businesses || !Array.isArray(businesses)) {
		return []; // Or return an empty array or appropriate fallback
	}

	const sitemapEntries: MetadataRoute.Sitemap = businesses.flatMap(
		(business: any) => {
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
		}
	);

	return sitemapEntries;
}
