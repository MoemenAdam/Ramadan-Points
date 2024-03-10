
export default function AllUsers() {

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

  return (
    <main className="text-white w-full text-center mb-20">
      <GridDiv styles='bg-black' data={{right:'الترتيب',mid:'المتسابق',left:'النقاط'}}/>
      <GridDiv styles='LeaderBoardBg' data={{right:'4',mid:'سمبوسة 15',left:'700'}}/>
      <GridDiv styles='LeaderBoardBg' data={{right:'4',mid:'سمبوسة 15',left:'700'}}/>
      <GridDiv styles='LeaderBoardBg' data={{right:'4',mid:'سمبوسة 15',left:'700'}}/>
      <GridDiv styles='LeaderBoardBg' data={{right:'4',mid:'سمبوسة 15',left:'700'}}/>
      <GridDiv styles='LeaderBoardBg' data={{right:'4',mid:'سمبوسة 15',left:'700'}}/>
      <GridDiv styles='LeaderBoardBg' data={{right:'4',mid:'سمبوسة 15',left:'700'}}/>
      <GridDiv styles='LeaderBoardBg' data={{right:'4',mid:'سمبوسة 15',left:'700'}}/>
      <GridDiv styles='LeaderBoardBg' data={{right:'4',mid:'سمبوسة 15',left:'700'}}/>
      <GridDiv styles='LeaderBoardBg' data={{right:'4',mid:'سمبوسة 15',left:'700'}}/>
      <GridDiv styles='LeaderBoardBg' data={{right:'4',mid:'سمبوسة 15',left:'700'}}/>
      <GridDiv styles='LeaderBoardBg' data={{right:'4',mid:'سمبوسة 15',left:'700'}}/>
      <GridDiv styles='LeaderBoardBg' data={{right:'4',mid:'سمبوسة 15',left:'700'}}/>
      <GridDiv styles='LeaderBoardBg' data={{right:'4',mid:'سمبوسة 15',left:'700'}}/>
      <GridDiv styles='LeaderBoardBg' data={{right:'4',mid:'سمبوسة 15',left:'700'}}/>
    </main>
  )
}
