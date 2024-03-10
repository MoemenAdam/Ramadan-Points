import { CiFacebook } from "react-icons/ci";
import { FaInstagram } from "react-icons/fa";
import { CgMail } from "react-icons/cg";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="h-[276px]  bg-black2 flex justify-center items-center">
      <div className="h-fit w-full  mainMargin fold3:gap-4 fold3:mb-8 fold2:mb-16 mb-32 flex-col flex justify-center items-center">
        <div className="h-[66px] w[80px] overflow-hidden flex justify-center items-center">
          <img
            className="w-[119.15px] h-[119.97px]"
            src="Logo.png"
            alt="logo"
          />
        </div>
        <div className="ChallengeActiveFooter h-[6px] w-full fold3:m-0 m-5 "></div>
        <div className="flex fold3:justify-around fold3:flex-row gap-y-10 flex-col items-cdenter   w-full   fold3:mt-5 h-[28px]">
          <p className="text-white2 text-center">
            © 2024 جميع الحقوق محفوظة لدى موقع رمضان بوينتس
          </p>
          <div className="flex flex-row gap-3 justify-center items-center">
            <Link to={"https://mustafa-elsharawy.vercel.app"} target="_blank">
              <CgMail className="w-[28px] h-[28px] text-white2" />
            </Link>
            <Link to={"https://www.facebook.com/profile.php?id=61557429622952&mibextid=JRoKGi"} target="_blank">
              <CiFacebook className="w-[28px] h-[28px] text-white2" />
            </Link>
            <Link to={"https://mustafa-elsharawy.vercel.app"} target="_blank">
              <FaInstagram className="w-[28px] h-[28px] text-white2" />
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
