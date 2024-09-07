import { BreadCrumbs } from "atoms";
import {
	AboutBusiness,
	BusinessLocation,
	BusinessOpen,
	BusinessRequest,
	BusinessReviews,
	BusinessesHeader,
	Facilities,
	MediaSector,
	MenuSector,
	Rating,
} from "components";
import { BusinessType } from "interfaces";
import { Metadata } from "next";
import { unstable_setRequestLocale, getTranslations } from "next-intl/server";
import { getBusiness, getBusinessesList } from "services";

export async function generateMetadata({ params }: any): Promise<Metadata> {
	unstable_setRequestLocale(params.locale);

	const { slug } = params;

	const data = await getBusiness(slug);

	return {
		title: data?.name,
		description: data?.description,
		keywords: [
			"مطعم",
			"مينيو",
			"ويلب",
			data?.name,
			...data?.name.split(" "),
		],
		openGraph: {
			images: [
				{
					url: data?.cover_image,
				},
			],
		},
		twitter: {
			card: "summary_large_image",
		},
	};
}

const BusinessPage = async ({ params }: { params: any }) => {
	unstable_setRequestLocale(params.locale);

	const { slug } = params;

	const businessT = await getTranslations("business");
	const breadCrumbsT = await getTranslations("breadCrumbs");

	const {
		id,
		name,
		city_name,
		business_type,
		description,
		whatsapp,
		phone_number,
		location_name,
		website,
		latitude,
		longitude,
		is_opened,
		reviews_stats,
		products,
		media,
		facilities,
		cover_image,
		instagram_profile_url,
		twitter_profile_url,
		facebook_profile_url,
		tiktok_profile_url,
		youtube_profile_url,
	} = await getBusiness(slug);

	return (
		<div>
			<BusinessesHeader
				title={name}
				city={city_name}
				type={business_type}
				image={cover_image}
			/>
			<div className="w-full px-4 md:px-12 my-[20px]">
				<BreadCrumbs
					links={[
						{ name: breadCrumbsT("home"), href: "/" },
						{
							name: breadCrumbsT("businesses"),
							href: "/categories",
						},
						{ name: name, href: "" },
					]}
				/>
			</div>
			<div className="grid grid-cols-12 gap-4 px-4 md:px-12 my-6">
				<div className="col-span-12 md:col-span-8 order-2 md:order-1 ">
					<AboutBusiness
						translation={{
							about: businessT("about"),
							noDescription: businessT("noDescription"),
						}}
						about={description}
					/>

					<BusinessReviews
						businessSlug={slug}
						translation={{
							noReviews: businessT("noReviews"),
							reviews: businessT("reviews"),
						}}
					/>
					{facilities?.length > 0 && (
						<Facilities
							facilities={facilities}
							translation={{
								facilities: businessT("facilities"),
								services: businessT("services"),
								payment: businessT("payment"),
								benefit: businessT("benefit"),
							}}
						/>
					)}
					{products?.length > 0 && (
						<MenuSector
							products={products}
							slug={id}
							translation={{
								menu: businessT("menu"),
								seeAll: businessT("seeAll"),
							}}
						/>
					)}
					{media?.length > 0 && (
						<MediaSector
							media={media}
							translation={{
								media: businessT("media"),
							}}
						/>
					)}
				</div>
				<div className="col-span-12 md:col-span-4  order-1 md:order-2">
					<BusinessLocation
						name={name}
						lng={parseFloat(longitude as string)}
						lat={parseFloat(latitude as string)}
						whatsapp={whatsapp}
						phone={phone_number}
						location={location_name}
						website={website}
						instagram_profile_url={instagram_profile_url}
						twitter_profile_url={twitter_profile_url}
						facebook_profile_url={facebook_profile_url}
						tiktok_profile_url={tiktok_profile_url}
						youtube_profile_url={youtube_profile_url}
						translation={{
							locationAndContact: businessT("locationAndContact"),
							site: businessT("site"),
						}}
					/>

					<BusinessOpen
						isOpened={is_opened}
						translation={{
							isOpened: businessT("isOpened"),
							isClosed: businessT("isClosed"),
						}}
					/>

					<Rating
						translation={{
							rating: businessT("rating"),
							review: businessT("review"),
						}}
						ratingStats={reviews_stats}
					/>
					{/* <BusinessRequest
						translation={{
							request: businessT("request"),
							sendRequest: businessT("sendRequest"),
							name: businessT("name"),
							phone: businessT("phone"),
							email: businessT("email"),
							message: businessT("message"),
						}}
					/> */}
				</div>
			</div>
		</div>
	);
};

export default BusinessPage;
