import {Calculator} from "@/app/components/Calculator";
import {건국대, 경희대, 동국대, 서강대, 서울시립대자연계열1, 서울시립대자연계열2, 성균관대, 중앙대, 한양대, 홍익대} from "@/utils/constants/univRatio";

export default function Home() {
  return (
    <>
      <title>편입 점수 계산기</title>
      <div className='px-10 pt-5 pb-20'>
        <header>
          <h1 className='inline text-2xl font-bold pr-5'>
            2025 편입 점수 계산기
          </h1>
          <p className='inline-block text-base'>
           (by 올컴러)
          </p>
        </header>
        <main className='mt-5 space-y-10'>
          <Calculator order={1} univ={"한양대"} univRatio={한양대} />
          <Calculator order={2} univ={"성균관대"} univRatio={성균관대} fullMarksNotice={"각각 80, 100점 만점"} />
          <Calculator order={3} univ={"서강대"} univRatio={서강대} fullMarksNotice={"각각 90, 100점 만점"} />
          <Calculator order={4} univ={"중앙대"} univRatio={중앙대} />
          <Calculator order={5} univ={"경희대"} univRatio={경희대} />
          <Calculator order={6} univ={"서울시립대자연계열1"} univRatio={서울시립대자연계열1} />
          <Calculator order={7} univ={"서울시립대자연계열2"} univRatio={서울시립대자연계열2} />
          <Calculator order={8} univ={"건국대"} univRatio={건국대} />
          <Calculator order={9} univ={"동국대"} univRatio={동국대} />
          <Calculator order={10} univ={"홍익대"} univRatio={홍익대} />
        </main>
      </div>
    </>
  );
}
