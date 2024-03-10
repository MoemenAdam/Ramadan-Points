import { useEffect } from "react"

export default function AllUsers({data,currentUser}) {

  const GridDiv = ({data,styles})=>{
    return(
      <div className={`grid grid-cols-12 border-black border-b-8 w-full big:w-[950px] m-auto py-4 rounded-md text-white text-right ${styles}`}>
        <div className="col-span-2"></div>
        <div className="col-span-2">
          <h1>{data.right}</h1>
        </div>
        <div className="col-span-4 text-center">
          <h1>{data.mid}</h1>
        </div>
        <div className="col-span-2 text-left">
          <h1>{data.left}</h1>
        </div>
        <div className="col-span-2"></div>
      </div>
    )
  }

  useEffect(()=>{
    window.scrollTo(0,0);
  },[])

  if(!data) return;

  return (
    <main className="text-white w-full text-center mb-20">
      <GridDiv styles='bg-black' data={{right:'الترتيب',mid:'المتسابق',left:'النقاط'}}/>
      {
        data.map((e,idx)=>{
          return(
            <GridDiv key={e._id} 
            styles={`${e._id===currentUser?'LeaderBoardCurrentBg':'LeaderBoardBg'}`}
             data={{right:idx+4,mid:e.img,left:e.points}}/>
          )
        })
      }
      {/* .LeaderBoardCurrentBg */}
    </main>
  )
}
