import { motion } from "framer-motion";
import { IPiece } from "../types";

export default function Exhibit(data: IPiece) {
  return data ? (
    <div className='flex flex-col w-full h-[60%]'>
      <motion.img src={data?.image_data} className='w-full h-full' />
      <h1>{data?.name}</h1>
      <h2>
        {data?.author}, 1928, {data?.owner}
      </h2>
      <h2>{data?.location}</h2>
    </div>
  ) : null;
}
