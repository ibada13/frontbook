import { useEffect } from "react";
import { type_icon } from "../extra/def"
import { FaBook, FaLaugh, FaGhost, FaHistory, FaBible, FaTheaterMasks, FaUser, FaSkull, FaGavel, FaBomb } from 'react-icons/fa';
import { TbError404 } from "react-icons/tb";
const TypeIcon = ({ typekey }: { typekey: string }) => { 
    
    const typesicons: type_icon = {
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
        <p className="text-3xl ">
            
        {typesicons[typekey]|| <TbError404 />}
    </p>
      )


}


export default TypeIcon 