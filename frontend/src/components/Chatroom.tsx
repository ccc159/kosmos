import { useEffect, useState } from "react";
import { onValue } from "firebase/database";
import { useParams } from "react-router-dom";

import { piecesRef } from "../db";
import { IPiece } from "../types";
import Exhibit from "./Exhibit";
import Chat from "./Chat";

export default function Chatroom() {
  const { id } = useParams();
  const [exhibits, setExhibits] = useState<IPiece[]>([]);

  useEffect(() => {
    onValue(piecesRef, (snapshot) => {
      const items = Object.values(snapshot.val());
      setExhibits(items);
    });
  }, [id]);

  return (
    <div className='flex flex-col w-full h-full'>
      <Exhibit data={exhibits.find((x) => x.id === id)} />
      <Chat />
    </div>
  );
}
