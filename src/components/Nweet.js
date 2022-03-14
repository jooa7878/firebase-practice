import { deleteDoc, deleteField, doc, updateDoc } from "firebase/firestore";
import { useState } from "react";
import { dbService } from "../fb";

export default function Nweet({ msg, isOwner }) {
  const [edit, setEdit] = useState(false);
  const [editValue, setEditValue] = useState(msg.msg);
  const msgTextRef = doc(dbService, "nweets", `${msg.id}`);

  const onDeleteClick = async () => {
    const ok = window.confirm("Are you sure you want to delete this message ?");
    if (ok) {
      await deleteDoc(msgTextRef);
    }
  };

  const onEditClick = () => {
    setEdit((prev) => !prev);
  };

  const onChange = (e) => {
    setEditValue(e.target.value);
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setEdit((prev) => !prev);
    await updateDoc(msgTextRef, {
      msg: editValue,
    });
  };

  return (
    <div>
      {edit ? (
        <>
          <form onSubmit={onSubmit}>
            <input type="text" value={editValue} required onChange={onChange} />
            <input type="submit" value="Update" />
          </form>
          <button
            onClick={() => {
              setEdit((prev) => !prev);
            }}
          >
            Cancel
          </button>
        </>
      ) : (
        <>
          {" "}
          <h4 key={msg.id}>{msg.msg}</h4>
          {isOwner ? (
            <>
              <button onClick={onDeleteClick}>Delete</button>
              <button onClick={onEditClick}>Edit</button>
            </>
          ) : null}
        </>
      )}
    </div>
  );
}
