import AboutBusiness from "./business/about";
import Facilities from "./business/facilities";
import BusinessesHeader from "./business/header";
import BusinessLocation from "./business/location";
import MediaSector from "./business/media";
import MenuSector from "./business/menu-sector";
import BusinessOpen from "./business/open";
import Rating from "./business/rating";
import BusinessRequest from "./business/request";
import BusinessReviews from "./business/reviews";
import BusinessesFiltersContent from "./businesses-list/businesses-filters-content";
import BusinessesFilters from "./businesses-list/filters";
import BusinessesList from "./businesses-list/list";
import ResponsiveBusinessesFilters from "./businesses-list/responsive-filters";
import CategoriesList from "./categories/categories-list";
import ContactInfo from "./contact-us/body";
import ContactHeader from "./contact-us/header";
import DownloadWelpAppBody from "./download-welp-app/body";
import DownloadBusinessApp from "./for-businesses/download-app";
import ForBusinessesHeader from "./for-businesses/header";
import BusinessPageInfo from "./for-businesses/info";
import AddPlacesForm from "./forms/add-places";
import BusinessRequestForm from "./forms/businesses/business-request";
import BoostBusiness from "./home/boost-business";
import Categories from "./home/categories";
import Cities from "./home/cities";
import Featured from "./home/featured";
import Header from "./home/header";
import CategoriesSlider from "./menu/categories-slider";
import BusinessHeader from "./menu/header";
import Menu from "./menu/menu";
import OpenApp from "./menu/open-app";
import ProductsList from "./menu/products-list";
import OpenAppBody from "./open-app-body";
import PrivacyBody from "./privacy/body";
import PrivacyHeader from "./privacy/header";
import Footer from "./shared/footer";
import Navbar from "./shared/navbar";
import TermsBody from "./terms/body";
import TermsHeader from "./terms/header";
import UsersDownloadHeader from "./users/header";
import ImagesSection from "./users/images";
import UserDownloadInfo from "./users/info";
import dynamic from "next/dynamic";

const DownloadApp = dynamic(() => import("./home/download-app"), {
	ssr: false,
});

export {
	AddPlacesForm,
	OpenAppBody,
	DownloadWelpAppBody,
	ContactInfo,
	ContactHeader,
	PrivacyBody,
	PrivacyHeader,
	TermsHeader,
	TermsBody,
	UserDownloadInfo,
	ForBusinessesHeader,
	ImagesSection,
	MenuSector,
	AboutBusiness,
	BoostBusiness,
	Categories,
	Facilities,
	ResponsiveBusinessesFilters,
	UsersDownloadHeader,
	CategoriesList,
	MediaSector,
	BusinessReviews,
	BusinessOpen,
	DownloadBusinessApp,
	Footer,
	Header,
	BusinessesFilters,
	BusinessesList,
	BusinessPageInfo,
	BusinessesHeader,
	Cities,
	BusinessHeader,
	BusinessRequestForm,
	OpenApp,
	Menu,
	BusinessRequest,
	CategoriesSlider,
	Rating,
	ProductsList,
	Navbar,
	DownloadApp,
	Featured,
	BusinessLocation,
	BusinessesFiltersContent,
};
