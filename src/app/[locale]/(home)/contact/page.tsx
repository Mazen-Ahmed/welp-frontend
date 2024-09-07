import { ContactHeader, ContactInfo } from "components";
import { getTranslations } from "next-intl/server";

const ContactUs = async () => {
	const contactT = await getTranslations("contactUs");

	return (
		<div>
			<ContactHeader translation={{ contactUs: contactT("contactUs") }} />
			<ContactInfo
				translation={{
					contactInfo: contactT("contactInfo"),
					address: contactT("address"),
					email: contactT("email"),
					callUs: contactT("callUs"),
					followUs: contactT("followUs"),
				}}
			/>
		</div>
	);
};

export default ContactUs;
