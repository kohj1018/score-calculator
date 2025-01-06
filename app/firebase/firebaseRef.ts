import {collection} from "@firebase/firestore"
import {db} from "@/app/firebase/firebase";

export const mainCollectionRef = collection(db, "main")