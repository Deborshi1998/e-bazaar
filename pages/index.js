import Hero from "../components/hero";
import Offers from "../components/offers";
import Featured from "../components/featured";
import { collection, getDocs, where, query } from "firebase/firestore";
import { db } from "../utils/firebaseSetup";
import { timeStampToDate } from "../utils/otherFunctions";

export default function Home({ data }) {
  return (
    <>
      <div>
        <Hero />
        <Offers />
        <Featured  dataProducts={data} />
      </div>
    </>
  );
}

export async function getServerSideProps() {
  // fetch data or do any logic here that should run on the server
  const data = [];
  const q = query(collection(db, "products"), where("feature", "==", true));
  const querySnapshot =  await getDocs(q);
  querySnapshot.forEach((doc) => {
    const { created_date, modified_date, ...rest } = doc.data();
    const docId = doc.id;
    data.push({
      ...rest,
      id: docId,
      created_date: timeStampToDate(created_date),
      modified_date: timeStampToDate(modified_date),
    });
  });

  return {
    props: {
      data,
    },
  };
}
