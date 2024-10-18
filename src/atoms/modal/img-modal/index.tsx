"use client";

import Image from "next/image";
import React, { ReactNode, useEffect } from "react";

interface Data {
	setIsOpened: Function;
	isOpened: boolean;
}

const ImageModal = ({
	data,
	children,
	className,
}: {
	data: Data;
	children: ReactNode;
	className?: string;
}) => {
	const { setIsOpened, isOpened } = data;

	const handleClose = () => setIsOpened(false);

	useEffect(() => {
		if (isOpened) {
			document.body.style.overflow = "hidden";
		} else {
			document.body.style.overflow = "auto";
		}
	}, [isOpened]);
	return (
		<>
			{isOpened && (
				<div
					onClick={handleClose}
					className="fixed inset-0 z-[9999] transition-opacity duration-300 ease-in-out bg-gray-500 bg-opacity-75">
					<div className="flex items-center justify-center min-h-screen px-4 pt-2">
						<div
							onClick={(e) => e.stopPropagation()}
							className={` overflow-hidden relative ${className} `}>
							<div className="flex flex-col px-4 py-2 text-black h-full w-full">
								{children}
							</div>
						</div>
					</div>
				</div>
			)}
		</>
	);
};

export default ImageModal;
