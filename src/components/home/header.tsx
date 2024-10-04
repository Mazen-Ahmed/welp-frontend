import { SearchInput } from "atoms";
import { env } from "next-runtime-env";
import React from "react";

const Header = ({ translation }: { translation: any }) => {

	return (
		<div className="header flex items-center justify-center">
			<div>{/* <SearchInput /> */}</div>
		</div>
	);
};

export default Header;
