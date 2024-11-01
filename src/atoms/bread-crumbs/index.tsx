import { Link } from "navigation";
import { FaChevronLeft } from "react-icons/fa6";

const BreadCrumbs = ({
	links,
}: {
	links: Array<{ href: string; name: string }>;
}) => {
	return (
		<div className="flex flex-wrap gap-1 text-[18px] ">
			{links?.map((link, index) => (
				<div className="flex gap-1 items-center" key={link.name}>
					<Link
						className={
							index === links?.length - 1
								? "text-gray-200"
								: "text-gray-400"
						}
						href={link.href}>
						{link.name}
					</Link>
					{index != links?.length - 1 && (
						<FaChevronLeft className="text-gray-400 w-3 h-3" />
					)}
				</div>
			))}
		</div>
	);
};

export default BreadCrumbs;
