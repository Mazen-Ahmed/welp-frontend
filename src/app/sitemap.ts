"use server";

import { apiBaseURL, appId } from "config";
import { getLocale } from "next-intl/server";
import { cookies } from "next/headers";

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

export async function generateNumberOfSitemapsNeeded(): Promise<Array<any>> {
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

export default async function SiteMap(): Promise<any> {
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

	const sitemaps = await generateNumberOfSitemapsNeeded();
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
