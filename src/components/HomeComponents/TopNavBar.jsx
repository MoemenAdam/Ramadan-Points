import { NavLink } from "react-router-dom"
import { Link } from "react-router-dom"
import Lites from "./Lites.svg"
export default function TopNavBar() {
  return (
    <>
      <section>
        <img className="select-none pointer-events-none absolute hidden sm:block -left-14 " src={Lites} alt="" />
      </section>
      <div className="text-white flex items-center justify-between">
        <section className="z-10">
          <Link to="/">
            <img className="select-none pointer-events-none w-28 h-28 flex-grow mr-6 lg:mr-8" src="Logo.png" alt="Logo" />
          </Link>
        </section>
        <section className="nav:flex-grow z-20">
          <nav className="hidden nav:block">
            <ul className="flex gap-x-12 justify-center text">
              <li><NavLink to="/">الرئيسية</NavLink></li>
              <li><NavLink to="/challenge">تحدي رمضان</NavLink></li>
              <li><NavLink to="#leaderboard">ترتيب المتسابقين</NavLink></li>
              <li><NavLink to="#duas">أدعية</NavLink></li>
              <li><NavLink to="#quran">قرآن</NavLink></li>
              <li><NavLink to="/login">تسجيل الدخول</NavLink></li>
            </ul>
          </nav>
          <nav className="nav:hidden block ">
            burger menu
          </nav>
        </section>
      </div>
    </>
  )
}
