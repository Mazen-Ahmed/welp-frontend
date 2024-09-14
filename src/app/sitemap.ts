import { MetadataRoute } from "next";
import { getBusinessesSlugs } from "services/businesses";

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
	const businessesResponse = await getBusinessesSlugs(1);
	const businessCount = businessesResponse.count || 0;

	const sitemapsNeeded = Math.ceil(businessCount / 1000);

	return Array.from({ length: sitemapsNeeded }, (_, index) => ({
		id: (index + 1).toString(),
	}));
}

function getUrl(pathname: string) {
	return `${host}${pathname === "/" ? "" : pathname}`;
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
	const staticEntries = staticPaths.map((pathname) => ({
		loc: getUrl(pathname),
		lastmod: new Date().toISOString(),
		alternates: {
			languages: {
				ar: getUrl(pathname),
				en: getUrl(pathname),
			},
		},
	}));

	const sitemaps = await generateStaticParams();
	const dynamicSitemapEntries = sitemaps.map((sitemap) => ({
		loc: `${host}/sitemaps/businesses/sitemap/${sitemap.id}.xml`,
		lastmod: new Date().toISOString(),
	}));

	// Combine static and dynamic entries
	const sitemapEntries: any = [
		...staticEntries.map((entry) => ({ ...entry, url: entry.loc })),
		...dynamicSitemapEntries.map((entry) => ({ ...entry, url: entry.loc })),
	];

	return sitemapEntries;
}
