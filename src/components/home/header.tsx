import { SearchInput } from "atoms";
import { env } from "next-runtime-env";
import React from "react";

const Header = ({ translation }: { translation: any }) => {
	console.log(env("NEXT_PUBLIC_APP_ID") || process.env.NEXT_PUBLIC_APP_ID);

	return (
		<div className="header flex items-center justify-center">
			<div>{/* <SearchInput /> */}</div>
		</div>
	);
};

export default Header;
