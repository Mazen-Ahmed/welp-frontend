// server.js (or app/server.js for Next.js 13+)
import { MetadataRoute } from "next";
import { getBusinessesSlugs } from "services/businesses";

// Assuming this fetches business data

const staticPaths = [
	"/",
	"/users",
	"/categories",
	"/businesses",
	"/biz",
	"/download",
	"/contact",
	"/privacy",
	"/terms",
];

const host = process.env.NEXT_PUBLIC_FRONTEND_URL;

export async function generateStaticParams() {
	const businessesResponse = await getBusinessesSlugs(1); // Assuming this returns count or relevant data
	const businessCount = businessesResponse.count || 0; // Handle potential missing count

	const sitemapsNeeded = Math.ceil(businessCount / 1000); // Calculate sitemap splits

	return Array.from({ length: sitemapsNeeded }, (_, index) => ({
		id: (index + 1).toString(),
	}));
}

function getUrl(pathname: string) {
	return `${host}${pathname === "/" ? "" : pathname}`;
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
	// Generate static sitemap entries
	const staticEntries = staticPaths.map((pathname) => ({
		loc: getUrl(pathname), // Use 'loc' for URL as per XML Sitemap standard
		lastmod: new Date().toISOString(), // Use 'lastmod' for last modified date
		alternates: {
			languages: {
				ar: getUrl(pathname),
				en: getUrl(pathname),
			},
		},
	}));

	// Generate dynamic sitemap entries for business pages
	const sitemaps = await generateStaticParams();
	const dynamicSitemapEntries = sitemaps.map((sitemap) => ({
		loc: `${host}/sitemaps/businesses/sitemap/${sitemap.id}.xml`, // Use 'loc' for URL
		lastmod: new Date().toISOString(), // Use 'lastmod' for last modified date
	}));

	// Combine static and dynamic entries
	const sitemapEntries: any = [
		...staticEntries.map((entry) => ({ ...entry, url: entry.loc })),
		...dynamicSitemapEntries.map((entry) => ({ ...entry, url: entry.loc })),
	];

	return sitemapEntries;
}
