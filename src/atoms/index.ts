import BreadCrumbs from "./bread-crumbs";
import BusinessCard from "./cards/business-card";
import BusinessHorizontalCard from "./cards/business-horizontal-card";
import CategoriesCard from "./cards/categories-card";
import ForBusinessCard from "./cards/for-business-card";
import ItemCard from "./cards/item-card/index";
import MediaCard from "./cards/media-card";
import MenuSectorCard from "./cards/menu-sector-card";
import ReviewCard from "./cards/review-card";
import CategoriesItem from "./categories-item";
import CheckBox from "./checkbox";
import Chip from "./chip/index";
import Drawer from "./drawer";
import CategoryItemDropdown from "./dropdowns/category-item-dropdown";
import FileLink from "./file-link";
import AutoComplete from "./inputs/auto-complete";
import CategoriesSearchInput from "./inputs/categories-search-input";
import FileInput from "./inputs/file";
import TextInputWithIcon from "./inputs/text";
import CircularLoader from "./loaders/circular";
import ProgressBar from "./loaders/progress-bar";
import BusinessesListLoader from "./loaders/skeleton/businesses-list";
import CitiesLoader from "./loaders/skeleton/cities-loader";
import ProductsLoader from "./loaders/skeleton/products";
import ReviewsLoader from "./loaders/skeleton/reviews";
import TagsLoader from "./loaders/skeleton/tags";
import CustomMap from "./map";
import CustomPagination from "./pagination";
import RadioButton from "./radio";
import CustomSwiper from "./slider";
import dynamic from "next/dynamic";

const SearchInput = dynamic(() => import("./inputs/search-input"), {
	ssr: false,
});

const Modal = dynamic(() => import("./modal/index"), {
	ssr: false,
});

export {
	FileInput,
	BusinessHorizontalCard,
	FileLink,
	TextInputWithIcon,
	CitiesLoader,
	AutoComplete,
	BreadCrumbs,
	BusinessesListLoader,
	BusinessCard,
	RadioButton,
	Drawer,
	ForBusinessCard,
	CheckBox,
	CategoriesSearchInput,
	CategoryItemDropdown,
	MediaCard,
	CustomSwiper,
	Chip,
	ItemCard,
	MenuSectorCard,
	SearchInput,
	Modal,
	ReviewsLoader,
	CustomPagination,
	ReviewCard,
	TagsLoader,
	ProductsLoader,
	CircularLoader,
	CustomMap,
	CategoriesItem,
	ProgressBar,
	CategoriesCard,
};
