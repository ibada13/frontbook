import { ReactNode, useEffect } from "react";

import { FaBook, FaLaugh, FaGhost, FaHistory, FaBible, FaTheaterMasks, FaUser, FaSkull, FaGavel, FaBomb } from 'react-icons/fa';
import { TbError404 } from "react-icons/tb";
const TypeIcon = ({ typekey ,className }: { typekey: string , className?:string }) => { 
    
    const typesicons:  Record<string, ReactNode> = {
        'فلسفة': <FaBook />,
        'رواية': <FaTheaterMasks />,
        'شعر': <FaBook />,
        'فانتازيا': <FaSkull />,
        'خيال علمي': <FaGavel />,
        'مغامرة': <FaLaugh />,
        'تاريخ': <FaHistory />,
        'ديني': <FaBible />,
        'تراجيدي': <FaTheaterMasks />,
        'فكاهي': <FaLaugh />,
        'سيرة': <FaUser />,
        'رعب': <FaGhost />,
        'سياسة': <FaGavel />,
        'حرب': <FaBomb />
      };
      
    return (
      <p className={className}>
            
        {typesicons[typekey]|| <TbError404 />}
    </p>
      )


}


export default TypeIcon 