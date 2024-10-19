"use client";

import { daysMap } from "data";
import { useTranslations } from "next-intl";
import { useState } from "react";
import { FaRegClock } from "react-icons/fa";
import { FaChevronDown } from "react-icons/fa6";
import { IoLockClosed } from "react-icons/io5";
import { openingHoursFormat } from "utils";

const BusinessOpen = ({
	isOpened,
	translation,
	openingHours,
}: {
	isOpened: boolean;
	translation: any;
	openingHours: any;
}) => {
	const [opened, setOpened] = useState(false);

	const sharedT = useTranslations("shared");
	return (
		<button
			onClick={() => setOpened((prev) => !prev)}
			className="rounded-3xl overflow-hidden border-1 border-solid  border-gray-100 my-7 w-full h-auto">
			{isOpened ? (
				<div className="flex items-center text-green-500 bg-none font-semibold gap-1 p-3">
					<div className="bg-green-500 text-white rounded-md p-1">
						<FaRegClock />
					</div>
					{translation.isOpened}
					<FaChevronDown
						className={`text-green-500  w-3 h-3 duration-150 ${
							opened ? `rotate-180` : `rotate-0`
						}`}
					/>
				</div>
			) : (
				<div className="flex items-center text-red-500 font-semibold gap-1">
					<div className="bg-red-500 text-white rounded-md p-1">
						<IoLockClosed />
					</div>
					{translation.isClosed}
				</div>
			)}

			<div
				className={`px-3  duration-150 ${
					opened ? `max-h-96 pb-3` : `max-h-0`
				}`}>
				{openingHours.map(
					({
						day,
						time_from,
						time_to,
					}: {
						day: number;
						time_from: any;
						time_to: any;
					}) => (
						<div key={day} className="flex my-[2px]">
							{`${sharedT(daysMap[day])}: ${sharedT(
								"from"
							)} ${openingHoursFormat(
								time_from,
								sharedT("pm"),
								sharedT("am")
							)} - ${sharedT("to")}
							${openingHoursFormat(time_to, sharedT("pm"), sharedT("am"))}`}
						</div>
					)
				)}
			</div>
		</button>
	);
};

export default BusinessOpen;
