import { useState } from "react"
const Home = ()=>{
  return(
    <svg width="20" height="21" viewBox="0 0 20 21" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M17.6833 5.78537C18.2927 6.14508 18.6666 6.80005 18.6666 7.5077V17.6667C18.6666 18.7713 17.7712 19.6667 16.6666 19.6667H14.1666C13.0621 19.6667 12.1666 18.7713 12.1666 17.6667V13C12.1666 11.8954 11.2712 11 10.1666 11H9.83331C8.72874 11 7.83331 11.8954 7.83331 13V17.6667C7.83331 18.7713 6.93788 19.6667 5.83331 19.6667H3.33331C2.22874 19.6667 1.33331 18.7713 1.33331 17.6667V7.5077C1.33331 6.80005 1.70726 6.14508 2.31666 5.78537L8.98333 1.85018C9.61054 1.47996 10.3894 1.47996 11.0166 1.85018L17.6833 5.78537Z" fill="#0C160E" stroke="#0C160E" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  )
}
const Verifi = ()=>{
  return(
    <svg width="26" height="26" viewBox="0 0 26 26" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M17.3334 9.75006L10.8334 16.2501L8.66669 14.0834M9.75002 2.70839L13 4.33339L16.25 2.70839L17.875 5.95839L21.6667 6.50006L21.125 10.2917L23.8334 13.0002L21.125 15.7084L21.6667 19.5001L17.875 20.0417L16.25 23.2917L13 21.6667L9.75002 23.2917L8.12502 20.0417L4.33335 19.5001L4.87502 15.7084L2.16669 13.0002L4.87502 10.2917L4.33335 6.50006L8.12502 5.95839L9.75002 2.70839Z" stroke="#0C160E" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  )
}
const Book = ()=>{
  return(
    <svg width="26" height="26" viewBox="0 0 26 26" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M13 7.93254C11.3115 5.68318 6.28743 5.57412 2.16669 6.66016V21.4619C5.08537 20.0957 10.3438 19.6565 13 21.9365M13 7.93254V21.9365M13 7.93254C14.6885 5.68318 19.7126 5.57412 23.8334 6.66016V21.4619C20.9147 20.0957 15.6562 19.6565 13 21.9365" stroke="#0C160E" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      <line x1="16" y1="10.5" x2="21" y2="10.5" stroke="#0C160E"/>
      <line x1="16" y1="13.5" x2="21" y2="13.5" stroke="#0C160E"/>
      <line x1="16" y1="16.5" x2="21" y2="16.5" stroke="#0C160E"/>
      <line x1="5" y1="10.5" x2="10" y2="10.5" stroke="#0C160E"/>
      <line x1="5" y1="13.5" x2="10" y2="13.5" stroke="#0C160E"/>
      <line x1="5" y1="16.5" x2="10" y2="16.5" stroke="#0C160E"/>
    </svg>
  )
}
const Star = ()=>{
  return(
    <svg width="26" height="26" viewBox="0 0 26 26" fill="none" xmlns="http://www.w3.org/2000/svg">
      <g clipPath="url(#clip0_835_85)">
      <path d="M1 24.3155V15.9894H6.68966V24.3155H1Z" stroke="#0C160E" strokeWidth="2"/>
      <path d="M19.3104 24.3155V13.3361H25V24.3155H19.3104Z" stroke="#0C160E" strokeWidth="2"/>
      <path d="M10.1546 24.3155V9.48575H15.8465V24.3155H10.1546Z" stroke="#0C160E" strokeWidth="2"/>
      <path d="M22.2134 6.77248L22.4063 7.16388L22.6388 7.63562L23.1593 7.71133L23.5943 7.7746L23.2812 8.08001L22.9052 8.44667L22.9937 8.96432L23.0676 9.39685L22.6799 9.19289L22.2143 8.94793L21.7487 9.19289L21.361 9.39685L21.4349 8.96432L21.5234 8.44667L21.1474 8.08001L20.834 7.77433L21.2672 7.71125L21.7871 7.63556L22.0197 7.16456L22.2134 6.77248Z" stroke="#0C160E" strokeWidth="2"/>
      <path d="M13.0418 2.94532L13.2351 3.33713L13.4676 3.80869L13.9879 3.88439L14.4238 3.9478L14.1096 4.25443L13.7336 4.62135L13.8224 5.13913L13.8963 5.56962L13.508 5.36566L13.043 5.12137L12.5779 5.36566L12.1886 5.57016L12.2624 5.13868L12.3509 4.62115L11.9752 4.25443L11.6609 3.94768L12.0958 3.88438L12.616 3.80866L12.8486 3.33713L13.0418 2.94532Z" stroke="#0C160E" strokeWidth="2"/>
      <path d="M3.71067 9.35107L3.90281 9.74107L4.13518 10.2127L4.65546 10.2886L5.09172 10.3523L4.77892 10.6574L4.40293 11.0241L4.49143 11.5418L4.56542 11.9746L4.17595 11.77L3.71067 11.5256L3.24549 11.7702L2.85758 11.9741L2.93143 11.5434L3.02024 11.0252L2.64381 10.6583L2.33075 10.3532L2.76532 10.2897L3.28542 10.2138L3.51781 9.74233L3.71067 9.35107Z" stroke="#0C160E" strokeWidth="2"/>
      </g>
      <defs>
      <clipPath id="clip0_835_85">
      <rect width="26" height="26" fill="white"/>
      </clipPath>
      </defs>
    </svg>

  )
}
const Clock = ()=>{
  return(
    <svg width="26" height="26" viewBox="0 0 26 26" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M17.3333 15.1667L13 13V7.58333M13 22.75C18.3848 22.75 22.75 18.3848 22.75 13C22.75 7.61522 18.3848 3.25 13 3.25C7.61522 3.25 3.25 7.61522 3.25 13C3.25 18.3848 7.61522 22.75 13 22.75Z" stroke="#0C160E" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  )
}
const Notes = ()=>{
  return(
    <svg width="26" height="26" viewBox="0 0 26 26" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M9.75002 18.4167H13M9.75002 9.75001H16.25M9.75002 14.0833H16.25M10.8334 2.16667H15.1667M7.41669 22.75H18.5834C19.6879 22.75 20.5834 21.8546 20.5834 20.75V7.41667C20.5834 6.3121 19.6879 5.41667 18.5834 5.41667H7.41669C6.31212 5.41667 5.41669 6.3121 5.41669 7.41667V20.75C5.41669 21.8546 6.31212 22.75 7.41669 22.75Z" stroke="#0C160E" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  )
}
const Hand = ()=>{
  return (
    <svg width="44" height="26" viewBox="0 0 44 26" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M14.1818 3.79167V11.9167V4.875C14.1818 3.97754 14.8381 3.25001 15.6477 3.25001C16.4573 3.25001 17.1137 3.97754 17.1137 4.875V11.9167V8.125C17.1137 7.22754 17.77 6.5 18.5796 6.5C19.3892 6.5 20.0455 7.22754 20.0455 8.125V17.3333C20.0455 20.9232 17.4202 23.8333 14.1818 23.8333H13.0801C11.5904 23.8333 10.1566 23.2048 9.06976 22.0753L4.22386 17.0393C3.52335 16.3113 3.50551 15.085 4.18449 14.3323C4.84827 13.5965 5.92449 13.5965 6.58827 14.3323L8.3182 16.25V7.04167C8.3182 6.14421 8.97451 5.41667 9.78411 5.41667C10.5937 5.41667 11.25 6.14421 11.25 7.04167V11.9167V3.79167C11.25 2.89421 11.9063 2.16667 12.7159 2.16667C13.5255 2.16667 14.1818 2.89421 14.1818 3.79167Z" stroke="#0C160E" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M29.8182 3.79167V11.9167V4.875C29.8182 3.97754 29.1619 3.25001 28.3523 3.25001C27.5427 3.25001 26.8863 3.97754 26.8863 4.875V11.9167V8.125C26.8863 7.22754 26.23 6.5 25.4204 6.5C24.6108 6.5 23.9545 7.22754 23.9545 8.125V17.3333C23.9545 20.9232 26.5798 23.8333 29.8182 23.8333H30.9199C32.4096 23.8333 33.8434 23.2048 34.9302 22.0753L39.7761 17.0393C40.4766 16.3113 40.4945 15.085 39.8155 14.3323C39.1517 13.5965 38.0755 13.5965 37.4117 14.3323L35.6818 16.25V7.04167C35.6818 6.14421 35.0255 5.41667 34.2159 5.41667C33.4063 5.41667 32.75 6.14421 32.75 7.04167V11.9167V3.79167C32.75 2.89421 32.0937 2.16667 31.2841 2.16667C30.4745 2.16667 29.8182 2.89421 29.8182 3.79167Z" stroke="#0C160E" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  )
  
}
export default function RightNavBar() {
  const [Turn,setTurn] = useState(1)

  const handleTurnChange =  (num) => {
    setTurn(num)
  }
  return (
    <aside className="
      hidden sm:flex flex-col items-center 
      fixed w-fit top-1/2 -translate-y-[40%] lg:right-[2.5rem] right-[2rem]
      gap-10 px-5 py-10
     bg-[#858975] z-50 rounded-full ">
      <div onClick={()=>{handleTurnChange(1)}} className="cursor-pointer flex flex-col items-center"> <Home /> {Turn===1 && 'الرئيسية'} </div>
      <div onClick={()=>{handleTurnChange(2)}} className="cursor-pointer flex flex-col items-center"> <Verifi /> {Turn===2 && 'الرئيسية'}</div>
      <div onClick={()=>{handleTurnChange(3)}} className="cursor-pointer flex flex-col items-center"> <Book /> {Turn===3 && 'الرئيسية'}</div>
      <div onClick={()=>{handleTurnChange(4)}} className="cursor-pointer flex flex-col items-center"> <Star /> {Turn===4 && 'الرئيسية'}</div>
      <div onClick={()=>{handleTurnChange(5)}} className="cursor-pointer flex flex-col items-center"> <Clock /> {Turn===5 && 'الرئيسية'}</div>
      <div onClick={()=>{handleTurnChange(6)}} className="cursor-pointer flex flex-col items-center"> <Notes /> {Turn===6 && 'الرئيسية'}</div>
      <div onClick={()=>{handleTurnChange(7)}} className="cursor-pointer flex flex-col items-center"> <Hand /> {Turn===7 && 'الرئيسية'}</div>
    </aside>
  )
}
