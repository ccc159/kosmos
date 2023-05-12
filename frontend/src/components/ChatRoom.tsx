import { useEffect, useState } from "react";
import { onValue } from "firebase/database";
import { useParams } from "react-router-dom";

import { piecesRef } from "../db";
import { IPiece } from "../types";
import Exhibit from "./Exhibit";

export function ChatRoom() {
  const { id } = useParams();
  const [exhibits, setExhibits] = useState<IPiece[]>([]);

  useEffect(() => {
    onValue(piecesRef, (snapshot) => {
      setExhibits(snapshot.val());
    });
  }, []);

  return (
    <div className='flex flex-col w-full h-full'>
      {exhibits[id] && <Exhibit data={exhibits[id]} />}
    </div>
  );
}
