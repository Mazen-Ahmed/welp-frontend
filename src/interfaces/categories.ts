export interface CategoryChildType {
	id: number;
	name: string;
	icon: string;
	slug: string;
	children: Array<CategoryChildType>;
}

export interface CategoryType {
	id: number;
	name: string;
	slug: string;
	icon: string;
	children: Array<CategoryChildType>;
}
