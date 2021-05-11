import Link from "next/link";
import Image from "next/image";

const FooterLogo = () => {
  return (
    <>
      <div className="flex items-center justify-start w-full h-auto">
        <Link href="/">
          <a className="inline-flex items-center px-3">
            <span className="">
              <Image
                src="/images/BikePark.jpg"
                height={35}
                width={35}
                className="border rounded-full shadow-md"
              />
            </span>
          </a>
        </Link>
        <a
          className="inline-flex items-center"
          href="https://tignes.net"
          target="_blank"
          rel="noopener noreferrer"
        >
          <span className="px-3">
            <Image
              src="/images/logo-tignes.svg"
              height={35}
              width={35}
              className="border rounded-md shadow-md"
            />
          </span>
        </a>
      </div>
    </>
  );
};

export default FooterLogo;
