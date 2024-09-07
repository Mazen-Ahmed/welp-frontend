"use server";

import { MetadataRoute } from "next";
import { getBusinessesSlugs } from "services/businesses";

const pathnames = [
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
	const products = await getBusinessesSlugs(1);
	const sitemapsNeeded = Math.ceil(products.count / 1000);

	return Array.from({ length: sitemapsNeeded }, (_, index) => ({
		id: (index + 1).toString(),
	}));
}

function getUrl(pathname: string) {
	return `${host}${pathname === "/" ? "" : pathname}`;
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
	// Generate static sitemap entries
	const staticEntries = pathnames.map((pathname) => ({
		url: getUrl(pathname),
		lastModified: new Date().toISOString(),
		alternates: {
			languages: {
				ar: getUrl(`${pathname}`),
				en: getUrl(`${pathname}`),
			},
		},
	}));

	// Generate dynamic sitemap entries
	const sitemaps = await generateStaticParams();

	const dynamicSitemapEntries = sitemaps.map((sitemap: any) => ({
		url: `${host}/sitemaps/businesses/sitemap/${sitemap.id}.xml`,
		lastModified: new Date().toISOString(),
	}));

	// Combine static and dynamic entries
	return [...staticEntries, ...dynamicSitemapEntries];
}
