import { forwardRef } from "react";
import { commentype } from "@/types/Types";
import Link from "next/link";
import { BiTrash } from "react-icons/bi";

type CommentProps = {
  comment: commentype;
  index: number;
  handleDelete: (id: number) => Promise<void>;
};

const Comment = forwardRef<HTMLDivElement, CommentProps>(
  ({ comment, index, handleDelete }, ref) => {
    return (
      <div ref={ref} key={comment.id} className="flex justify-between m-3 bg-gray-800 p-2 rounded-md mb-2">
        <div className="self-start p-1">

        <Link href={`/user?id=${comment.user.id}`} className="text-sm text-gray-400 hover:text-white transition-colors duration-150">{ comment.user.name}</Link>
        <p className="text-sm">{comment.comment}</p>
        </div>
        {comment.is_owner && (
        <div className="p-1 flex flex-col justify-between items-stretch bg-green-400 h-full">

          <button
          className="text-white bg-red-500 rounded-md hover:underline text-xs"
          onClick={() => handleDelete(comment.id)}
          >
            {/* حذف */}
            <BiTrash size={22} className=""/>
            </button>
                <button
                className="text-white bg-red-500 rounded-md hover:underline text-xs"
                onClick={() => handleDelete(comment.id)}
                >
                  {/* حذف */}
                  <BiTrash size={22} className=""/>
                </button>
        </div>
        )}
      </div>
    );
  }
);

export default Comment;
