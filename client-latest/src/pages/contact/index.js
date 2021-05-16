import { useState } from "react";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

import RenderMarkDown from "@/components/md-article";
import PageTitle from "@/components/page-title";
import GeoLocate from "@/components/geolocate";
import { fetchAPI } from "@/utils/api";
import { FaPhoneAlt } from "react-icons/fa";

const Contact = ({ data }) => {
  const [contactData, setContactData] = useState([data]);

  if (contactData.length > 0) {
    const { title, texte_principal } = contactData[0];
    return (
      <>
        <PageTitle title={title} />
        <RenderMarkDown article={texte_principal} />
        <div className="h-auto w-auto text-6xl flex items-center justify-center py-6">
          <div className="border rounded-md shadow-md py-12 px-12 w-auto h-auto text-center flex items-center justify-center">
            <a href="tel:112" className="">
              <span className="text-center mx-auto ">
                <FaPhoneAlt className="text-center mx-auto" />
              </span>
              <hr className="my-3" />
              112
            </a>
          </div>
        </div>

        <GeoLocate />
      </>
    );
  }
  return (
    <div className="flex h-screen w-auto justify-center items-center">
      Not Found...
    </div>
  );
};
export const getServerSideProps = async ({ locale }) => {
  if (locale === "en") {
    const data = await fetchAPI(`/contact-d-urgence?_locale=en`);
    return {
      props: {
        ...(await serverSideTranslations(locale, ["common"])),
        data,
        locale,
      },
    };
  } else {
    const data = await fetchAPI(`/contact-d-urgence`);
    console.log(locale);
    return {
      props: {
        ...(await serverSideTranslations(locale, ["common"])),
        data,
        locale,
      },
    };
  }
};

export default Contact;
