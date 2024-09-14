import * as client from "fetch/client";
import * as server from "fetch/server";
import { notFound } from "next/navigation";
import { toast } from "react-toastify";

export const getBusinessesList = async (
	page: number,
	categories: Array<number> | [],
	isOpened: boolean,
	priceCategory: string | null,
	isDeliveryAvailable: boolean,
	searchKeyword: string | null,
	city: any,
	lat: string | null,
	long: string | null,
	nearest: boolean | null
) => {
	try {
		const validCategories = categories?.filter(
			(category) => typeof category === "number" && !isNaN(category)
		);

		let url = `businesses?page=${page}&page_size=9`;

		if (validCategories?.length > 0) {
			url += `&categories__in=${validCategories.join(",")}`;
		}

		if (isOpened) {
			url += `&is_opened=${isOpened}`;
		}

		if (priceCategory) {
			url += `&price_category=${priceCategory}`;
		}

		if (isDeliveryAvailable) {
			url += `&is_delivery_available=${isDeliveryAvailable}`;
		}

		if (searchKeyword) {
			url += `&search=${searchKeyword}`;
		}

		if (city) {
			url += `&city=${city}`;
		}

		if (lat) {
			url += `&latitude=${lat}`;
		}

		if (long) {
			url += `&longitude=${long}`;
		}

		if (nearest) {
			url += `&nearest=true`;
		}

		const response = await client.get(url);

		return response;
	} catch (error: any) {
		toast.error(error.message);
	}
};

export const getFeaturedBusinesses = async () => {
	const data = await server.get(`businesses?is_featured=${true}`);

	return data.results;
};
export const getHomePageData = async () => {
	const data = await server.get(`utilities/app-home-screen`);

	return data;
};

export const getBusiness = async (slug: string) => {
	try {
		const { data } = await server.get(`businesses/${slug}`);

		return data;
	} catch (error: any) {
		if (error?.message.includes(404)) {
			return notFound();
		}
	}
};

export const getBusinessProductTypes = async (businessSlug: string) => {
	try {
		const response = await client.get(
			`businesses/${businessSlug}/products-types`
		);

		return response.data;
	} catch (error: any) {
		toast.error(error.message);
	}
};

export const getBusinessProducts = async (
	businessId: string | string[],
	type: string | null,
	page: number
) => {
	try {
		let url = `businesses/${businessId}/products`;

		if (type) {
			url += `?product_type=${type}`;
		}

		if (page) {
			if (type) {
				url += `&page=${page}`;
			} else {
				url += `?page=${page}`;
			}
		}

		const response = await client.get(url);

		return response;
	} catch (error: any) {
		toast.error(error.message);
	}
};

export const businessRequest = async (
	name: string,
	description: string,
	location: string,
	city: number,
	image: File
) => {
	let data = new FormData();
	data.append("name", name);
	data.append("description", description);
	data.append("city", city.toString());
	data.append("location_name", location);
	data.append("image", image);
	try {
		const response = await client.post(`businesses/`, data, false, true);

		return response;
	} catch (error: any) {
		toast.error(error.message);
	}
};
