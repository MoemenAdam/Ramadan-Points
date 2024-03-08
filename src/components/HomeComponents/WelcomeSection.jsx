import TopNavBar from "./TopNavBar"
import RightNavBar from "./RightNavBar"

export default function WelcomeSection() {
  return (
    <main className="welcomePage min-h-screen relative overflow-hidden flex flex-col">
      <TopNavBar/>
      <section className="mainMargin2 flex-grow flex items-center">
        <div className="flex flex-col mobile:w-[400px] w-[350px] ">
          <h1 className="text-white font-bold text-5xl mobile:leading-[72px] leading-0 test2"> أهلاً بك في </h1>
          <h1 className="text-white font-bold text-5xl mr-auto mobile:leading-[72px] leading-0 test2"> رمضان بوينتس </h1>
          <div className="flex justify-center mt-5">
            <p className="text-center font-bold text-white brightness-50 w-[90%]">
            اغتنم شهر رمضان الكريم في العبادة والتقرب إلى الله وقراءة القرآن الكريم, احرص على صلاتك وختم القرآن خلال الشهر الكريم وتابع تقدمك واربح الجوائز!
            </p>
          </div>
          <button className="Mainbtn mt-10"> إبدأ التحدي </button>
        </div>
      </section>
      <RightNavBar/>
    </main>
  )
}