import { FormEvent, useEffect, useRef, useState } from "react";
import { commentype } from "../extra/def";
import { _delete_comment_ } from "../utils/api";
import { BiPencil ,BiTrash,BiMemoryCard  } from "react-icons/bi";
import { MdCancel } from "react-icons/md";
import useSWR from "swr";
const Comment = ({ comment , handleDelete }: {comment:commentype,handleDelete :(id:number)=>Promise<void>} ) => { 
    const [editing, SetEditing] = useState<boolean>(false);
    const handleDeleteClick = (event: React.MouseEvent<HTMLButtonElement>):void => { 
        event.preventDefault();
        handleDelete(comment.id);
    }
    useEffect(() => { 
        console.log(comment)
    }, [])
    
    return (
        <div className="relative min-h-[40vh]  flex justify-center ">
            {editing ?
                <form action="" className="flex flex-col w-full items-center gap-y-6">

                <textarea defaultValue={ comment.comment} className="h-full  w-4/5 bg-black rounded-md focus:outline-none focus:border focus:border-red-500 text-white flex justify-center items-center" name="" id="">
                    
                    </textarea>    
                    <div className="w-1/2 flex justify-around">

                    <button className="p-4 rounded-md hover:text-black transition-colors duration-300 bg-green-500" type="submit"><BiMemoryCard size={20}/></button>
                    <button className="p-4 rounded-md hover:text-black transition-colors duration-300 bg-red-500" onClick={e=>SetEditing(false)}><MdCancel size={20}/></button>
                    </div>
                </form>
            :
                <div className=" p-4 rounded-md gap-x-6 flex flex-col sm:flex-row justify-between items-center border border-red-500 w-4/5 text-center">
                        { comment.comment}
                    <form className="w-1/2 sm:w-1/6 h-full flex flex-row sm:flex-col justify-around items-end " >
                    <button onClick={e=>SetEditing(true)} className="p-4 w-1/3 rounded-md bg-green-500 hover:text-black duration-300 " ><BiPencil size={20}/></button>
                    <button onClick={(e)=>handleDeleteClick(e)} className="p-4 w-1/3 rounded-md hover:text-black transition-colors duration-300 bg-red-500" ><BiTrash size={20} /></button>

                    </form>
                </div>
            }
        </div>
    )
}

export default Comment;