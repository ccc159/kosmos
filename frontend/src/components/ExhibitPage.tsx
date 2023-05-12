import { useEffect, useState } from "react";
import { onValue } from "firebase/database";
import { useParams } from "react-router-dom";

import { piecesRef } from "../db";
import { Firebase, IPiece } from "../types";
import Exhibit from "./Exhibit";

export default function ExhibitPage() {
  const { id } = useParams();
  const [exhibits, setExhibits] = useState<Firebase<IPiece>[]>([]);
  const [exhibit, setExhibit] = useState<IPiece>();

  useEffect(() => {
    onValue(piecesRef, (snapshot) => {
      setExhibits(snapshot.val());
      const item = exhibits?.find(({ data }) => data.id === id);
      if (item !== undefined) {
        setExhibit(item.data);
      }
    });
  });

  return (
    <div className='flex flex-col w-full h-full'>
      {exhibit ? <Exhibit data={exhibit} /> : null}
    </div>
  );
}
