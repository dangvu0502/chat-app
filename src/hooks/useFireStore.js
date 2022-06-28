import { useState, useEffect } from "react";
import { db } from "../firebase/config";
import {
  collection,
  onSnapshot,
  query,
  where,
  orderBy,
} from "firebase/firestore";

const useFireStore = (collectionName, condition) => {
  const [documents, setDocuments] = useState([]);

  useEffect(() => {
    let collectionRef = collection(db, collectionName);
    if (condition) {
      if (!condition.compareValue || !condition.compareValue.length) {
        // reset documents data
        setDocuments([]);
        return;
      }
      collectionRef = query(
        collectionRef,
        where(condition.fieldName, condition.operator, condition.compareValue),
        orderBy("createdAt")
      );
    }

    const unsubscribe = onSnapshot(collectionRef, (snapshot) => {
      const documents = snapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      setDocuments(documents);
    });
    return unsubscribe;
  }, [collectionName, condition]);

  return documents;
};

export default useFireStore;
