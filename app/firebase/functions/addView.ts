import {doc, setDoc} from "@firebase/firestore";
import {db} from "@/app/firebase/firebase";

export const addView = async (
  like: number,
  view: number
) => {
  await setDoc(doc(db, "main", "info"), {
    like: like,
    view: view + 1
  })
}