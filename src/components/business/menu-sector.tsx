import { MenuSectorCard } from "atoms";
import { ProductType } from "interfaces";
import { Link } from "navigation";

const MenuSector = ({
	products,
	translation,
	slug,
}: {
	products: Array<ProductType>;
	translation: any;
	slug: any;
}) => {
	return (
		<div>
			<h3 className="text-xl my-1 font-bold">{translation.menu}</h3>
			<div className=" p-3 w-full rounded-3xl overflow-hidden border-1 border-solid border-gray-100">
				<div className="grid grid-cols-1 md:grid-cols-3 gap-5">
					{products.map((item) => (
						<MenuSectorCard key={item.id} item={item} />
					))}
				</div>
				<hr className="my-3" />
				<Link
					href={`/biz/${slug}/menu`}
					className="text-yellow-500 font-bold text-lg ">
					{translation.seeAll}
				</Link>
			</div>
		</div>
	);
};

export default MenuSector;
