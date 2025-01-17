"use client";

import {UnivRatio} from "@/utils/constants/univRatio";
import {useEffect, useState} from "react";
import {ScoreInput} from "@/app/components/ScoreInput";
import KeyboardDoubleArrowRight from "@mui/icons-material/KeyboardDoubleArrowRight";

interface Props {
  order: number
  univ: string
  univRatio: UnivRatio
  fullMarksNotice?: string
}

export function Calculator({ order, univ, univRatio, fullMarksNotice = "각각 100점 만점" }: Props) {
  const [englishWrongAnswerNum, setEnglishWrongAnswerNum] = useState<string>('')
  const [mathWrongAnswerNum, setMathWrongAnswerNum] = useState<string>('')
  const [docScore, setDocScore] = useState<string>('')
  const [interviewScore, setInterviewScore] = useState<string>('')
  const [firstConversionScore, setFirstConversionScore] = useState<string>('0')
  const [secondConversionScore, setSecondConversionScore] = useState<string>('0')

  useEffect(() => {
    if (!!mathWrongAnswerNum
      && (univRatio.firstEnglishRatio == 0 || (univRatio.firstEnglishRatio > 0 && !!englishWrongAnswerNum))
      && (univRatio.docRatio == 0 || (univRatio.docRatio > 0 && !!docScore))
      && (univRatio.interviewRatio == 0 || (univRatio.interviewRatio > 0 && !!interviewScore))
    ) {
      let firstEngConScore: number = 0
      let secondEngConScore: number = 0

      if (univRatio.firstEnglishRatio != 0) {
        firstEngConScore = (univRatio.englishQuestionNum - parseInt(englishWrongAnswerNum)) / univRatio.englishQuestionNum * univRatio.firstEnglishRatio // 1차 영어 환산 점수
      }

      if (univRatio.secondEnglishRatio != 0) {
        secondEngConScore = (univRatio.englishQuestionNum - parseInt(englishWrongAnswerNum)) / univRatio.englishQuestionNum * univRatio.secondEnglishRatio // 2차 영어 환산 점수
      }

      let firstDocScore: number = 0;
      if (univ == "성균관대") {
        firstDocScore = parseInt(docScore)
      }

      setFirstConversionScore((
        firstEngConScore
        + (univRatio.mathQuestionNum - parseInt(mathWrongAnswerNum)) / univRatio.mathQuestionNum * univRatio.firstMathRatio // 1차 수학 환산 점수
        + firstDocScore
      ).toFixed(2));

      setSecondConversionScore((
        secondEngConScore
        + (univRatio.mathQuestionNum - parseInt(mathWrongAnswerNum)) / univRatio.mathQuestionNum * univRatio.secondMathRatio // 2차 수학 환산 점수
        + parseInt(0 + docScore)
        + parseInt(0 + interviewScore)
      ).toFixed(2))
    }
  }, [englishWrongAnswerNum, mathWrongAnswerNum, docScore, interviewScore])

  if (!univ) return <></>
  return (
    <div className='w-full flex-col'>
      <p className='text-lg font-bold'>
        {`${order}. ${univ}`}
      </p>
      <div className='w-full flex flex-wrap items-center pt-5 gap-y-5'>
        <div className='flex flex-wrap items-center gap-x-2 w-[70vw] md:w-[40vw] gap-y-3'>
          <ScoreInput label={"영어 틀린 개수"} univRatio={univRatio} value={englishWrongAnswerNum} setValue={setEnglishWrongAnswerNum} />
          <ScoreInput label={"수학 틀린 개수"} univRatio={univRatio} value={mathWrongAnswerNum} setValue={setMathWrongAnswerNum} />
          <ScoreInput label={"서류 점수(가정)"} univRatio={univRatio} value={docScore} setValue={setDocScore} />
          <ScoreInput label={"면접 점수(가정)"} univRatio={univRatio} value={interviewScore} setValue={setInterviewScore} />
        </div>
        <div className='flex items-center'>
          <div className='px-5 md:px-10'>
            <KeyboardDoubleArrowRight />
          </div>
          <div className='pl-5 flex-col gap-y-3'>
            <p className='text-lg'>환산 점수 <span className='text-sm'>({fullMarksNotice})</span></p>
            <li className='text-base'>1차 : {firstConversionScore}</li>
            <li className='text-base'>2차 : {secondConversionScore}</li>
          </div>
        </div>
      </div>
    </div>
  )
}