import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/router";

import { i18n, useTranslation } from "next-i18next";

import { Listbox, Transition, Menu, Switch } from "@headlessui/react";

function LanguageSwitch({}) {
  const router = useRouter();
  const { locales, locale } = router;
  const [selectedLanguage, setSelectedLanguage] = useState(router.locale);

  console.log(selectedLanguage);
  const { i18n } = useTranslation();

  function handleChange(e) {
    setSelectedLanguage(e.target.value);
    router.push();
  }
  const handleRoute = (locale) =>
    router.push(router.asPath, router.asPath, { locale: locale });

  return (
    <>
      <div className="py-3 inline-flex ">
        {/* <select value={selectedLanguage} className="" onChange={handleChange}>
          {router.locales.map((locale, index) => (
         ))} 
        </select> */}
      </div>
    </>
  );
}

export default LanguageSwitch;

{
  /* <Link href={router.asPath} locale={locale}>
  <div key={index}>
  <span className="mr-6 text-white">
  <a className=" hover:bg-gray-700 text-white py-2 px-2 rounded-lg text-md font-medium">
  {selectedLanguage === locale ? (
    <span className="text-blue-500">{locale}</span>
    ) : (
      <span className="text-gray-50">{locale}</span>
      )}
      </a>
      </span>
      </div>
      </Link> */
}

// <option value="en" onClick={() => handleRoute("en")}>
//   en
// </option>
// <option value="fr" onClick={() => handleRoute("fr")}>
//   fr
// </option>
