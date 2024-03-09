import {useState} from 'react'

export default function Challenges() {
  const [Show, setShow] = useState(false)
  return (
    <div>
      {Show && <div></div>}
      <div className='fixed bottom-0 left-0 z-[500] '>
        <button onClick={()=>{setShow(prev=>!prev)}} className='ChallengeBTN' style={{borderRadius:'0 8px 0 0'}}>قائمة المهام</button>
      </div>
    </div>
  )
}
