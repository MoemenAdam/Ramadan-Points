import {useState} from 'react'
import {motion, AnimatePresence} from 'framer-motion'

export default function Challenges() {
  const [Show, setShow] = useState(false)
  return (
    <div>
      <AnimatePresence>
        {Show && 
          <motion.div
            initial={{y:'100%'}}
            animate={{y:0}}
            exit={{y:'100%'}}
            transition={{duration:0.1}}
            className='ChallengesContent'
          >
a
          </motion.div>
        }
      </AnimatePresence>
      <div className='fixed bottom-0 left-0 z-[500] overflow-hidden' style={{borderRadius:'0 8px 0 0'}}>
        <button onClick={()=>{setShow(prev=>!prev)}} className='ChallengeBTN'>قائمة المهام</button>
      </div>
    </div>
  )
}
