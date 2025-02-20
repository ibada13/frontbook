import React, { useRef } from "react";
import Link from "next/link";
import { gsap } from "gsap";
import RandomImage from "./RandomImage";
import { book } from "../extra/def";
import TypeIcon from "./TypeIcon";
const BookCard = ({ book }: { book: book }) => {
  const overlayRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const handleMouseEnter = () => {
    gsap.to(overlayRef.current, {
      opacity: 1,
      y: "0",
      duration: 0.5,
      ease: "power2.out",
    });
    gsap.to(titleRef.current, {
      color: "#ff0000",
    });
  };

  const handleMouseLeave = () => {
    gsap.to(overlayRef.current, {
      opacity: 0, 
      y:"-100%",
      duration:1,
      ease: "power2.out",
    });
    gsap.to(titleRef.current, {
      color: '#fff',
    });
  };

  return (
    <div className="0" >
      <div
        className="relative group w-48 h-50 overflow-hidden border rounded-md cursor-pointer"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        
        <div
          ref={overlayRef}
          className="absolute flex flex-col justify-between items-center  top-0 left-0 opacity-0 w-full h-3/4 p-3 backdrop-blur-md text-white"
        >
          <div>
            {book.authors.map((author, index) => (
              <Link className="text-red-500" key={`author-${index}`}
                href={{pathname: `/author/${author.id}`,}}><p>{author.name}</p></Link>
              
            ))}
          </div>
          <div className="flex gap-x-3 ">
            {book.types.map((type, index) => (
              <Link className="hover:text-red-500 transition-colors duration-300" key={`type-${index}`} href={`type?id=${type.id}`}>
                

                <TypeIcon typekey={type.name} />
              
                
              </Link>
            ))}
          </div>
          <div><p className="text-xs">{book.description?book.description.length>50?book.description.substring(0,50)+"...":book.description:"الوصف غير متاح"}</p></div>
          <div className="flex gap-x-4"><p>{book.current_page_number}</p><p className="text-red-500">من</p><p>{book.pages }</p></div>
        </div>

        
        <Link href={{
          pathname: `/book/`,
          query: {
            book:JSON.stringify(book),
          }
          
        }} passHref className="flex flex-col justify-between items-center h-full p-4">
                  <RandomImage cover_path={book.cover_path } />
   
          <h4 ref={titleRef} id="title" className="text-center text-xs font-semibold truncate mt-4">{book.title}</h4>
        </Link>
      </div>
    </div>
  );
};

export default BookCard;
