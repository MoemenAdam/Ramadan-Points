import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import TopNavBar from "../components/HomeComponents/TopNavBar";
import FooterText from "../components/FooterText";

export default function NotFound() {
  const navigate = useNavigate();
  return (
    <section className="mainPage flex flex-col bg-black text-white min-h-[100dvh]">
      <TopNavBar />
      <div className="mainMargin flex mt-20 nav:mt-0 nav:flex-row flex-col gap-y-10 gap-x-20 flex-grow items-center justify-center">
        <div className="flex flex-col gap-y-5 nav:order-1 order-2">
          <h1 className="TitleFont font-bold text-5xl">الصفحة غير متوفرة</h1>
          <h2 className="w-1/2 opacity-80">عذراً, الصفحة التي تبحث عنها
            غير موجودة.</h2>
          <button className="loginColor2 Mainbt w-fit py-3 px-5 rounded-md font-normal text-xl text-black hover:scale-105 duration-300" onClick={() => { navigate('/') }}>العودة إلى الرئيسية</button>
        </div>
        <div className="order-1">
          <img src="../assets/404Image.png" alt="" />
        </div>
      </div>
      <FooterText />
    </section>
  )
}
