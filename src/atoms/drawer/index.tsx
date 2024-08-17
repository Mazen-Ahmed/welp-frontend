"use client";

import { useLocale } from "next-intl";
import React, { ReactNode, useEffect } from "react";
import { IoIosArrowBack } from "react-icons/io";

const Drawer = ({
	opened,
	setOpened,
	children,
	title,
}: {
	opened: boolean;
	title: string;
	setOpened: (state: boolean) => void;
	children: ReactNode;
}) => {
	const toggleBodyScroll = (disable: boolean) => {
		if (disable) {
			document.body.style.overflow = "hidden";
		} else {
			document.body.style.overflow = "";
		}
	};

	const locale = useLocale();

	useEffect(() => {
		toggleBodyScroll(opened);
	}, [opened]);
	return (
		<div
			id="drawer-example"
			className={`fixed top-0 start-0 z-10 h-screen overflow-y-auto transition-transform duration-300 ${
				opened ? "w-full p-4 " : "w-0 "
			} bg-white `}
			//@ts-ignore
			tabIndex="-1"
			aria-labelledby="drawer-label">
			<div className="flex items-center justify-start my-4 font-bold">
				<IoIosArrowBack
					className={`w-5 h-5 ${locale === "ar" && " rotate-180"} `}
					onClick={() => setOpened(false)}
				/>
				{title}
			</div>

			{children}
		</div>
	);
};

export default Drawer;
