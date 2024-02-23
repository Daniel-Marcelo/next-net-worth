import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  query,
  QueryConstraint,
} from "firebase/firestore";
import { db } from "../utils/firebase";

export class FirebaseService<T> {
  constructor(public readonly collectionName: string) {}

  async create(item: T) {
    await addDoc(collection(db, this.collectionName), item);
  }

  async delete(id: string) {
    await deleteDoc(doc(db, this.collectionName, id));
  }

  async get(id: string) {
    const document = await getDoc(doc(db, this.collectionName, id));
    const item = document.data() as T;

    if (item) {
      return {
        id: document.id,
        ...item,
      } as T;
    }
    throw new Error("Document does not exist");
  }

  async getByQuery(...queryConstraints: QueryConstraint[]) {
    const list = [] as T[];
    const querySnapshot = await getDocs(
      query(collection(db, this.collectionName), ...queryConstraints)
    );

    querySnapshot.forEach((document) => {
      const item = document.data() as T;
      list.push({
        id: document.id,
        ...item,
      });
    });
    return list;
  }

  async getList() {
    const list = [] as T[];
    const querySnapshot = await getDocs(collection(db, this.collectionName));
    querySnapshot.forEach((document) => {
      const item = document.data() as T;
      list.push({
        id: document.id,
        ...item,
      });
    });
    return list;
  }
}
