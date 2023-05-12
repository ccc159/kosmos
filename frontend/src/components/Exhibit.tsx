import { motion } from "framer-motion";
import { IPiece } from "../types";

export default function Exhibit(data: IPiece) {
  const { name, author, owner, location, image_data } = data;
  console.log(data);
  console.log(data.name);
  return (
    <div className='flex flex-col w-full h-[60%]'>
      <motion.img src={image_data} className='w-full h-full' />
      <h1>{name}</h1>
      <h2>
        {author}, 1928, {owner}
      </h2>
      <h2>{location}</h2>
    </div>
  );
}
