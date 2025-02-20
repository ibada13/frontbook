import {  commentype } from "@/types/Types";

const Comment = ({ comment ,index ,  cond , ref , handleDelete}: {comment:commentype , index:number,cond:number , ref:(node: any) => void , handleDelete: (id: number) => Promise<void>
} ) => { 

    return (
        <div key={comment.id} className="m-3 bg-gray-800 p-2 rounded-md mb-2" ref={index ===cond ? ref : null}>
        <p className="text-sm">{comment.comment}</p>
        <button className="text-red-500 hover:underline text-xs" onClick={() => handleDelete(comment.id)}>
            حذف
        </button>
    </div>
    );
}
export default Comment