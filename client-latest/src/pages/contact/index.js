import { useState } from "react";
import RenderMarkDown from "@/components/md-article";
import PageTitle from "@/components/page-title";
import { fetchAPI } from "@/utils/api";

const Contact = ({ data }) => {
  const [contactData, setContactData] = useState([data]);

  if (contactData.length > 0) {
    const { title, texte_principal } = contactData[0];
    return (
      <>
        <PageTitle title={title} />
        <RenderMarkDown article={texte_principal} />
      </>
    );
  }
  return (
    <div className="flex h-screen w-auto justify-center items-center">
      Not Found...
    </div>
  );
};
export const getServerSideProps = async () => {
  const data = await fetchAPI(`/contact-d-urgence`);

  if (!data) {
    console.log("empty Data");
    return {
      notFound: true,
    };
  }
  return {
    props: {
      data,
    },
  };
};

export default Contact;
