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
      && (univRatio.firstEnglishRatio == 0 || !!englishWrongAnswerNum)
      && (univRatio.secondDocRatio == 0 || (univRatio.secondDocRatio > 0 && !!docScore))
      && (univRatio.interviewRatio == 0 || (univRatio.interviewRatio > 0 && !!interviewScore))
    ) {
      let firstEngConScore: number = (univRatio.firstEnglishRatio == 0 ? 0 : (univRatio.englishQuestionNum - parseInt(englishWrongAnswerNum)) / univRatio.englishQuestionNum * univRatio.firstEnglishRatio) // 영어 환산 점수
      let firstMathConScore: number = (univRatio.mathQuestionNum - parseInt(mathWrongAnswerNum)) / univRatio.mathQuestionNum * univRatio.firstMathRatio // 수학 환산 점수
      let firstDocScore: number = univRatio.firstDocRatio

      console.log("firstEng", firstEngConScore)
      if (univ == "성균관대") {
        firstEngConScore = firstEngConScore * 80 / 100
        firstMathConScore = firstMathConScore * 80 / 100
        firstDocScore = parseInt(docScore) * univRatio.firstDocRatio / univRatio.secondDocRatio
      }
      if (univ == "서강대") {
        firstEngConScore = firstEngConScore * 90 / 100
        firstMathConScore = firstMathConScore * 90 / 100
      }

      setFirstConversionScore((
        firstEngConScore
        + firstMathConScore
        + firstDocScore
      ).toFixed(2));

      const secondEngConScore: number = (univRatio.secondEnglishRatio == 0 ? 0 : (univRatio.englishQuestionNum - parseInt(englishWrongAnswerNum)) / univRatio.englishQuestionNum * univRatio.secondEnglishRatio) // 영어 환산 점수
      setSecondConversionScore((
        secondEngConScore
        + (univRatio.mathQuestionNum - parseInt(mathWrongAnswerNum)) / univRatio.mathQuestionNum * univRatio.secondMathRatio // 수학 환산 점수
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
        <div className='flex flex-wrap items-center gap-x-2 w-[40vw] gap-y-3'>
          <ScoreInput label={"영어 틀린 개수"} univRatio={univRatio} value={englishWrongAnswerNum} setValue={setEnglishWrongAnswerNum} />
          <ScoreInput label={"수학 틀린 개수"} univRatio={univRatio} value={mathWrongAnswerNum} setValue={setMathWrongAnswerNum} />
          <ScoreInput label={"서류 점수(가정)"} univRatio={univRatio} value={docScore} setValue={setDocScore} />
          <ScoreInput label={"면접 점수(가정)"} univRatio={univRatio} value={interviewScore} setValue={setInterviewScore} />
        </div>
        <div className='flex items-center'>
          <div className='px-10'>
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