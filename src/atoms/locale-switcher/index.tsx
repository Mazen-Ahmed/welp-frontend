"use client";

import Image from "next/image";
import { IoChevronDown } from "react-icons/io5";

const LocalSwitcher = ({ translation }: { translation: any }) => {
	return (
		<>
			<div
				style={{ boxShadow: "0px 0px 6px 0px #00000040" }}
				className="bg-white flex h-[35px] min-w-[100px] justify-between gap-[8px] items-center rounded-full px-[8px] py-[5px]">
				<Image
					src={"/egypt.svg"}
					width={20}
					height={20}
					alt="country"
				/>
				<IoChevronDown className="text-black w-4 h-4 shrink-0" />
			</div>
		</>
	);
};

export default LocalSwitcher;
