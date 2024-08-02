import { BusinessHeader, Menu, OpenApp } from "components";
import { Metadata } from "next";
import { headers } from "next/headers";
import { ReactNode } from "react";
import { getBusiness } from "services";

export async function generateMetadata({ params }: any): Promise<Metadata> {
	const { slug } = params;

	const data = await getBusiness(slug);

	return {
		title: data.name,
		description: data.description,
		keywords: ["مطعم", "مينيو", "ويلب", ...data.name.split(" ")],
		openGraph: {
			images: [
				{
					url: data.cover_image,
				},
			],
		},
		twitter: {
			card: "summary_large_image",
		},
	};
}

const MenuPage = async ({ params }: { params: any }) => {
	const headersList = headers();

	const userAgent = headersList.get("user-agent");

	const isMobile = new RegExp("Mobile|Android|iP(ad|od|hone)").test(
		userAgent || ""
	);

	const isAndroid = /Android/i.test(userAgent || "");

	const deviceType = isAndroid ? "android" : "ios";

	const { slug } = params;

	const business = await getBusiness(slug);

	return (
		<div>
			<BusinessHeader business={business} />
			<Menu slug={business.id} />
		</div>
	);
};

export default MenuPage;

MenuPage.getLayout = function getLayout({ MenuPage }: { MenuPage: ReactNode }) {
	return <div>{MenuPage}</div>;
};
