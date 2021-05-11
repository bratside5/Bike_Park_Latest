import FooterLogo from "@/components/footer/FooterLogo";
import FooterLinks from "./FooterLinks";

const Footer = () => {
  return (
    <>
      <div className="h-auto p-3 w-full  bg-gray-200">
        <div className="flex items-center justify-around">
          <FooterLogo />
          <FooterLinks />
        </div>
      </div>
    </>
  );
};

export default Footer;
