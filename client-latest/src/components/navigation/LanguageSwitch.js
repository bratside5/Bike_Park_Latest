import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/router";

import { i18n, useTranslation } from "next-i18next";

import { Listbox, Transition, Menu, Switch } from "@headlessui/react";

function LanguageSwitch() {
  const [selectedLanguage, setSelectedLanguage] = useState("");
  const [enabled, setEnabled] = useState(false);

  const router = useRouter();
  const { locale } = router;
  const { i18n } = useTranslation();
  console.log(locale);

  return (
    <>
      <div className="py-3"></div>
    </>
  );
}

export default LanguageSwitch;
