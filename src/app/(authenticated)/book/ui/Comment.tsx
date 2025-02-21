import { forwardRef } from "react";
import { commentype } from "@/types/Types";

type CommentProps = {
  comment: commentype;
  index: number;
  handleDelete: (id: number) => Promise<void>;
};

const Comment = forwardRef<HTMLDivElement, CommentProps>(
  ({ comment, index, handleDelete }, ref) => {
    return (
      <div ref={ref} key={comment.id} className="m-3 bg-gray-800 p-2 rounded-md mb-2">
        <p className="text-sm">{comment.comment}</p>
        {comment.is_owner && (
          <button
            className="text-red-500 hover:underline text-xs"
            onClick={() => handleDelete(comment.id)}
          >
            حذف
          </button>
        )}
      </div>
    );
  }
);

export default Comment;
