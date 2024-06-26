import { ForBusinessCard } from "atoms";
import React from "react";

const BusinessPageInfo = ({ translation }: { translation: any }) => {
	return (
		<div className="bg-orange-200 min-h-screen py-5">
			<div className="flex flex-col gap-5 ">
				<ul className="list-disc justify-self-start w-full  px-24">
					<li className=" font-bold text-start  text-gray-500  text-[20px] ">
						{translation.maintain}
					</li>
					<li className="text-start font-bold mt-[24px] text-gray-500 text-[20px] ">
						{translation.addPortfolio}
					</li>
				</ul>
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 px-5 md:px-20 gap-5">
					<ForBusinessCard
						image="/for-businesses-1.png"
						title={translation.benefits}
						description={translation.benefitsDescription}
					/>
					<ForBusinessCard
						image="/for-businesses-2.png"
						title={translation.reviews}
						description={translation.reviewsDescription}
					/>
					<ForBusinessCard
						image="/for-businesses-3.png"
						title={translation.presence}
						description={translation.maintain}
					/>
				</div>
			</div>
		</div>
	);
};

export default BusinessPageInfo;
