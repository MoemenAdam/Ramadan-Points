export default function Quran() {
  // cooment for future
  // qframe has 3 parts top, middle, bottom
  // qframeMiddle has quranText 
  // quranText has suraHeaderFrame if exist and ayaText
  // quranText has semi yellow background

  // now how to use
  // qFrameTop for top
  // qFrameMiddle for middle
  // qFrameBottom for bottom
  // suraHeaderFrame for sura header
  // ayaText for aya text
  // quranText for quran text
  return (
    <div className='w-[500px]'>
      <div className="qFrame qFrameTop"></div>

      <div className="qFrameMiddle ">
        <div className="quranText" id="quranText">
          <div className="suraHeaderFrame">سورة الأنعام</div>
          <div className="ayaText text-center">بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ </div>
          <div className="leading-[55px]">

            هُوَ الَّذِي خَلَقَكُم مِّن طِينٍ ثُمَّ قَضَىٰ أَجَلًا ۖ وَأَجَلٌ مُّسَمًّى عِندَهُ ۖ ثُمَّ أَنتُمْ تَمْتَرُونَ &lrm;﴿٢﴾&lrm; وَهُوَ اللَّهُ فِي السَّمَاوَاتِ وَفِي الْأَرْضِ ۖ يَعْلَمُ سِرَّكُمْ وَجَهْرَكُمْ وَيَعْلَمُ مَا تَكْسِبُونَ ‎﴿٣﴾‏ فَقَدْ كَذَّبُوا بِالْحَقِّ لَمَّا جَاءَهُمْ ۖ فَسَوْفَ يَأْتِيهِمْ أَنبَاءُ مَا كَانُوا بِهِ يَسْتَهْزِئُونَ ‎﴿٥﴾‏ أَلَمْ يَرَوْا كَمْ أَهْلَكْنَا مِن قَبْلِهِم مِّن قَرْنٍ مَّكَّنَّاهُمْ فِي الْأَرْضِ مَا لَمْ نُمَكِّن لَّكُمْ وَأَرْسَلْنَا السَّمَاءَ عَلَيْهِم مِّدْرَارًا وَجَعَلْنَا الْأَنْهَارَ تَجْرِي مِن تَحْتِهِمْ فَأَهْلَكْنَاهُم بِذُنُوبِهِمْ وَأَنشَأْنَا مِن بَعْدِهِمْ قَرْنًا آخَرِينَ ‎﴿٦﴾‏ وَلَوْ نَزَّلْنَا عَلَيْكَ كِتَابًا فِي قِرْطَاسٍ فَلَمَسُوهُ بِأَيْدِيهِمْ لَقَالَ الَّذِينَ كَفَرُوا إِنْ هَٰذَا إِلَّا سِحْرٌ مُّبِينٌ ‎﴿٧﴾‏ وَقَالُوا لَوْلَا أُنزِلَ عَلَيْهِ مَلَكٌ ۖ وَلَوْ أَنزَلْنَا مَلَكًا لَّقُضِيَ الْأَمْرُ ثُمَّ لَا يُنظَرُونَ ‎﴿٨﴾‏
          </div>

        </div>
      </div>

      <div className="qFrame qFrameBottom"></div>
    </div>
  )
}
