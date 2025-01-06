import {doc, setDoc} from "@firebase/firestore";
import {db} from "@/app/firebase/firebase";

export const addLike = async (
  like: number,
  view: number
) => {
  await setDoc(doc(db, "main", "info"), {
    like: like + 1,
    view: view
  })
}