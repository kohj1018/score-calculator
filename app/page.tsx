"use client";

import {Calculator} from "@/app/components/Calculator";
import {건국대, 경희대, 동국대, 서강대, 서울시립대자연계열1, 서울시립대자연계열2, 성균관대, 중앙대, 한양대, 홍익대} from "@/utils/constants/univRatio";
import RemoveRedEyeOutlined from "@mui/icons-material/RemoveRedEyeOutlined";
import ThumbUp from "@mui/icons-material/ThumbUp";
import ThumbUpOutlined from "@mui/icons-material/ThumbUpOutlined";
import {useEffect, useState} from "react";
import {getLikeAndView} from "@/app/firebase/functions/getLikeAndView";
import {addView} from "@/app/firebase/functions/addView";
import {addLike} from "@/app/firebase/functions/addLike";
import {deleteLike} from "@/app/firebase/functions/deleteLike";
import {useRouter} from "next/router";

const TRACKING_ID = process.env.NEXT_PUBLIC_GA_ID

export default function Home() {
  const [like, setLike] = useState(0)
  const [view, setView] = useState(0)
  const [isLiked, setIsLiked] = useState(false)
  let likeLoading = false
  const router = useRouter()

  useEffect(() => {
    // if (process.env.ENV_STATE !== 'production') return  // production 상태가 아니면 통계 포함 X

    if (!TRACKING_ID || router.isPreview) return

    gtag("config", TRACKING_ID, {
      send_page_view: false, // manually send page views to have full control
    })

    gtag("event", "page_view", {
      page_path: window.location.pathname,
      send_to: TRACKING_ID,
    })
  }, [])

  // 조회수와 좋아요 수를 불러옴
  useEffect(() => {
    getLikeAndView().then(r =>
      {
        if (!!r) {
          setLike(r[0])
          setView(r[1] + 1)

          addView(r[0], r[1])
        }
      }
    )
  }, [])

  const clickLike = () => {
    if (!likeLoading) {
      likeLoading = true
      if (!isLiked) {
        setIsLiked(true);
        addLike(like, view).then(() => {
          setLike(like + 1)
        });
      } else {
        setIsLiked(false);
        deleteLike(like, view).then(() => {
          setLike(like - 1)
        });
      }
      likeLoading = false
    }
  }

  return (
    <>
      <title>편입 점수 계산기</title>
      <div className='px-10 pt-5 pb-20'>
        <header>
          <h1 className='inline text-2xl md:text-3xl font-bold pr-5'>
            2025 편입 점수 계산기
          </h1>
          <p className='inline-block text-base'>
           (by 올컴러)
          </p>
        </header>
        <div className='w-full flex justify-end items-center space-x-2'>
          <div className='flex items-center space-x-1'>
            <RemoveRedEyeOutlined />
            <p className='text-sm'>{view}</p>
          </div>
          <button
            className='flex items-center space-x-1'
            onClick={clickLike}
          >
            {isLiked ? <ThumbUp /> : <ThumbUpOutlined />}
            <p className='text-sm'>{like}</p>
          </button>
        </div>
        <main className='mt-7 md:mt-12 space-y-10'>
          <Calculator order={1} univ={"한양대"} univRatio={한양대} />
          <Calculator order={2} univ={"성균관대"} univRatio={성균관대} fullMarksNotice={"각각 80, 100점 만점"} />
          <Calculator order={3} univ={"서강대"} univRatio={서강대} fullMarksNotice={"각각 90, 100점 만점"} />
          <Calculator order={4} univ={"중앙대"} univRatio={중앙대} />
          <Calculator order={5} univ={"경희대"} univRatio={경희대} fullMarksNotice={"90점 만점/토익배제"} />
          <Calculator order={6} univ={"서울시립대자연계열1"} univRatio={서울시립대자연계열1} />
          <Calculator order={7} univ={"서울시립대자연계열2"} univRatio={서울시립대자연계열2} />
          <Calculator order={8} univ={"건국대"} univRatio={건국대} />
          <Calculator order={9} univ={"동국대"} univRatio={동국대} />
          <Calculator order={10} univ={"홍익대"} univRatio={홍익대} />
        </main>
        <footer className='mt-20 text-base text-slate-400'>
          각 학교 모집요강 기반 추정치입니다.
          참고용으로만 확인 바랍니다.
          추가 원하는 사항은 문의주시면 반영해보도록 하겠습니다.
        </footer>
      </div>
    </>
  );
}
