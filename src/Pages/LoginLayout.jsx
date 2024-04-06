import { IoIosArrowBack } from "react-icons/io";
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import FooterText from "../components/FooterText";



export default function Login({children}) {
  const navigate = useNavigate();
  return (
    <section className='mainPage min-h-[100dvh] text-white flex flex-col'>
      <header className='ml-6 lg:ml-14 flex justify-between items-center'>
        <div className='sm:pr-6'>
          <Link to='/'>
            <img src="Logo.png" className='w-28 h-28 pointer-events-none' alt="Logo" />
          </Link>
        </div>
        <div onClick={()=>{navigate(-1)}} className='cursor-pointer bg-[#CBA947] p-3 rounded-lg'>
          <IoIosArrowBack color='black' size={30}/>
        </div>
      </header>
      <main className='loginbg max-w-[500px] self-center flex-grow h-full mainMargin  flex justify-center items-center'>
        {children}
      </main> 
        <FooterText/>
    </section>
  )
}
