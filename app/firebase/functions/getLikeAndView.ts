import {doc, getDoc} from "@firebase/firestore";
import {db} from "@/app/firebase/firebase";

export const getLikeAndView = async () => {
  const docRef = doc(db, "main", "info")
  const docSnap = await getDoc(docRef)

  if (docSnap.exists()) {
    return [docSnap.data().like as number, docSnap.data().view as number]
  }
}