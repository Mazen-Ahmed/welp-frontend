import * as client from "fetch/client";

export async function getBusinessReviews(businessSlug: string, page: number) {
	try {
		const response = await client.get(
			`businesses/${businessSlug}/reviews?page=${page}`
		);

		return response;
	} catch (error) {
		return error;
	}
}
