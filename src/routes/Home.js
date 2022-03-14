import {
  addDoc,
  collection,
  doc,
  getDocs,
  onSnapshot,
  orderBy,
  query,
} from "firebase/firestore";
import { useEffect, useState } from "react";
import Nweet from "../components/Nweet";
import { dbService } from "../fb";

function Home({ userObj }) {
  const [msg, setMsg] = useState("");
  const [msgs, setMsgs] = useState([]);

  useEffect(() => {
    const q = query(
      collection(dbService, "nweets"),
      orderBy("createdAt", "desc")
    );
    onSnapshot(q, (snapshot) => {
      const msgList = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setMsgs(msgList);
    });
  }, []);
  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const result = await addDoc(collection(dbService, "nweets"), {
        msg,
        createdAt: Date.now(),
        creatorId: userObj.uid,
      });
    } catch (error) {
      console.log(error);
    }

    setMsg("");
  };

  const onChange = (e) => {
    setMsg(e.target.value);
  };

  return (
    <div>
      <form onSubmit={onSubmit}>
        <input
          value={msg}
          type="text"
          placeholder="What's on your mind?"
          maxLength={120}
          onChange={onChange}
        />
        <input type="submit" value="Submit" />
      </form>
      <div>
        {msgs.map((msg) => (
          <Nweet
            key={msg.id}
            msg={msg}
            isOwner={msg.creatorId === userObj.uid}
          />
        ))}
      </div>
    </div>
  );
}

export default Home;
