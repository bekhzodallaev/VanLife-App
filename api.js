import { initializeApp } from "firebase/app";
import {
  collection,
  getFirestore,
  getDocs,
  doc,
  getDoc,
  query,
  where,
} from "firebase/firestore";

const firebaseConfig = {
  apiKey: process.env.API_KEY,
  authDomain: "vanlife-835ca.firebaseapp.com",
  projectId: "vanlife-835ca",
  storageBucket: "vanlife-835ca.appspot.com",
  messagingSenderId: "386020327175",
  appId: "1:386020327175:web:e8a8980fe73e630b970fa2",
};

const app = initializeApp(firebaseConfig);

const db = getFirestore(app);

//Refactoring the fetching functions

const vansCollectionRef = collection(db, "vans");

export async function getVans() {
  const snapshot = await getDocs(vansCollectionRef);
  const vans = snapshot.docs.map((doc) => ({
    ...doc.data(),
    id: doc.id,
  }));
  return vans;
}

export async function getVan(id) {
  const docRef = doc(db, "vans", id);
  const snapshot = await getDoc(docRef);
  return {
    ...snapshot.data(),
    id: snapshot.id,
  };
}

export async function getHostVans() {
  const q = query(vansCollectionRef, where("hostId", "==", "123"));
  const snapshot = await getDocs(q);
  const vans = snapshot.docs.map((doc) => ({
    ...doc.data(),
    id: doc.id,
  }));
  return vans;
}
// export async function getHostVans(id) {
//   const url = id ? `/api/host/vans/${id}` : "/api/host/vans";
//   const res = await fetch(url);
//   if (!res.ok) {
//     throw {
//       message: "Failed to fetch vans",
//       statusText: res.statusText,
//       status: res.status,
//     };
//   }
//   const data = await res.json();
//   return data.vans;
// }

export async function loginUser(creds) {
  const res = await fetch("/api/login", {
    method: "post",
    body: JSON.stringify(creds),
  });
  const data = await res.json();

  if (!res.ok) {
    throw {
      message: data.message,
      statusText: res.statusText,
      status: res.status,
    };
  }

  return data;
}
