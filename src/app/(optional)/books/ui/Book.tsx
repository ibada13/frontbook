import React, { useRef } from "react";
import Link from "next/link";
import { gsap } from "gsap";
import Image from "next/image";
import useSWR from "swr";
import { data } from "@/types/Types";
import { fetcher } from "@/hooks/userhooks";
import { useSearchParams } from "next/navigation";
// import TypeIcon from "./TypeIcon";
const BookCard = ({ book }: { book: any }) => {
  const overlayRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);


  const handleMouseEnter = () => {
    gsap.to(overlayRef.current, {
      opacity: 1,
      y: "0",
      scale: 1.05,  
      duration: 0.5,
      ease: "power2.out",
    });
    gsap.to(titleRef.current, {
      // color: "#ff0000",
    });
  };

  const handleMouseLeave = () => {
    gsap.to(overlayRef.current, {
      // opacity: 0, 
      scale:1,
      // y:"-100%",
      duration:1,
      ease: "power2.out",
    });
    gsap.to(titleRef.current, {
      // color: '#f00',
    });
  };

  return (
    <div ref={ overlayRef} className="0 text-white hover:text-red-500 transition-colors duration-300" >
      <div
        className="relative group w-48 h-50 overflow-hidden border rounded-md cursor-pointer"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        
        
        <Link href={`/book/${book.id}`} passHref className="flex flex-col justify-between items-center h-full p-4">
          { 
            book.cover_path&&
          <Image width={200} height={200} src={book.cover_path} alt={`${book.title}'s cover`} />
          }
   
          <h4 ref={titleRef} id="title" className="text-center text-xs font-semibold truncate mt-4">{book.title}</h4>
        </Link>
      </div>
    </div>
  );
};

export default BookCard;
