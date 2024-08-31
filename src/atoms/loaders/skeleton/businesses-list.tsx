import React from "react";

const BusinessesListLoader = () => {
	return (
		<div className="flex bg-gray-businesses flex-col justify-start gap-3 overflow-hidden  rounded-md my-4  cursor-pointer">
			<div className=" bg-gray-200 w-full h-48  animate-pulse"></div>
			<div className="flex flex-col items-start justify-start gap-1 my-2 w-full px-2">
				<div className=" bg-gray-200 rounded-md  w-28 h-4 animate-pulse"></div>
				<div className=" bg-gray-200 rounded-md  w-3/4 h-4 animate-pulse"></div>
				<div className=" bg-gray-200 rounded-md  w-1/2 h-4 animate-pulse"></div>

				<div className=" bg-gray-200 rounded-md  w-14 h-4 animate-pulse"></div>
			</div>
		</div>
	);
};

export default BusinessesListLoader;
