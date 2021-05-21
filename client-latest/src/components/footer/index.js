import FooterLogo from "@/components/footer/FooterLogo";
import FooterLinks from "./FooterLinks";
import LanguageSwitch from "./LanguageSwitch";

const Footer = () => {
  return (
    <>
      <div className="h-auto p-3 w-full  bg-gray-200">
        <div className="flex items-center justify-between">
          <FooterLogo />
          <FooterLinks />
          <LanguageSwitch />
        </div>
      </div>
    </>
  );
};

export default Footer;
