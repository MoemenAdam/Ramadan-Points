import Top1 from './Top1.svg'
import Top2 from './Top2.svg'
import Top3 from './Top3.svg'
export default function TopUsers({data,currentUser}) {
  if(!data)return
  return (
    <div className="flex nav:flex-row flex-col gap-5 gap-y-32 nav:mt-60 mt-32 h-full">
      <div className={`relative ${data.third.id!==currentUser?'Topbg':'TopbgCurrent'} w-[300px] h-[230px] nav:order-1 order-3 flex justify-center items-center`}>
        <img style={{boxShadow:'0px 14px 100px 0px #C47A31'}} className='w-24 rounded-2xl absolute -top-32' src="assets/sambosa1.jpg" alt="" />
        <p className='absolute -top-6 text-white font-medium text-lg'>{data.third.name}</p>
        
        <div className='flex flex-col-reverse gap-2 text-center text-white'>
          <img src={Top3} alt="" />
          <div>
            <p className='font-black text-lg leading-6'>{data.third.score}</p>
            <p>نقطة</p>
          </div>
        </div>
      </div>
      <div className={`relative ${data.first.id!==currentUser?'Topbg':'TopbgCurrent'} w-[300px] h-[230px] nav:order-1 order-1 nav:-top-20 flex justify-center items-center`}>
        <img style={{boxShadow:'0px 14px 100px 0px #F6CB01'}} className='w-24 rounded-2xl absolute -top-32' src="assets/gozhend1.png" alt="" />
        <p className='absolute -top-6 text-white font-medium text-lg'>{data.first.name}</p>
        
        <div className='flex flex-col-reverse gap-2 text-center text-white'>
          <img src={Top1} alt="" />
          <div>
            <p className='font-black text-lg leading-6'>{data.first.score}</p>
            <p>نقطة</p>
          </div>
        </div>

      </div>
      <div className={`relative ${data.second.id!==currentUser?'Topbg':'TopbgCurrent'} w-[300px] h-[230px] nav:order-1 order-2 flex justify-center items-center`}>
        <img style={{boxShadow:'0px 14px 100px 0px #B6B5B5'}} className='w-24 rounded-2xl absolute -top-32' src="assets/sambosa2.png" alt="" />
        <p className='absolute -top-6 text-white font-medium text-lg'>{data.second.name}</p>
        
        <div className='flex flex-col-reverse gap-2 text-center text-white'>
          <img src={Top2} alt="" />
          <div>
            <p className='font-black text-lg leading-6'>{data.second.score}</p>
            <p>نقطة</p>
          </div>
        </div>
      </div>
    </div>
  )
}
