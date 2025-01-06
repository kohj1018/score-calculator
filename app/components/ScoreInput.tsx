import {UnivRatio} from "@/utils/constants/univRatio";
import {Dispatch, SetStateAction} from "react";
import {InputAdornment, TextField} from "@mui/material";

interface Props {
  label: string
  univRatio: UnivRatio
  value: string
  setValue: Dispatch<SetStateAction<string>>
}
export function ScoreInput({ label, univRatio, value, setValue }: Props) {
  if (label == "영어 틀린 개수" && univRatio.englishQuestionNum == 0) return <></>

  if (label == "영어 틀린 개수" || label == "수학 틀린 개수") {
    const maxNum = (label == "영어 틀린 개수" ? univRatio.englishQuestionNum : univRatio.mathQuestionNum)
    return (
      <TextField
        id="outlined-number"
        label={`${label} (최대 ${maxNum})`}
        type="number"
        value={value}
        onChange={(e) => { if (!e.target.value || ((parseInt(e.target.value) > -1) && (parseInt(e.target.value) < maxNum + 1))) setValue(e.target.value) }}
        slotProps={{
          inputLabel: {
            shrink: true,
          },
          input: {
            endAdornment: <InputAdornment position="end">개</InputAdornment>
          },
        }}
      />
    )
  }

  if (label == "서류 점수(가정)" || label == "면접 점수(가정)") {
    if (label == "서류 점수(가정)" && univRatio.docRatio == 0) return <></>
    if (label == "면접 점수(가정)" && univRatio.interviewRatio == 0) return <></>

    const maxNum = (label == "서류 점수(가정)" ? univRatio.docRatio : univRatio.interviewRatio)
    return (
      <TextField
        id="outlined-number"
        label={`${label} (최대 ${maxNum})`}
        type="number"
        value={value}
        onChange={(e) => { if (!e.target.value || ((parseInt(e.target.value) > -1) && (parseInt(e.target.value) < maxNum + 1))) setValue(e.target.value) }}
        slotProps={{
          inputLabel: {
            shrink: true,
          },
          input: {
            endAdornment: <InputAdornment position="end">점</InputAdornment>
          },
        }}
      />
    )
  }
}