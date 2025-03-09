import { forwardRef, useState } from "react";
import { commentype } from "@/types/Types";
import Link from "next/link";
import { BiMemoryCard, BiPen, BiTrash } from "react-icons/bi";
import { MdCancel } from "react-icons/md";
import { UserType } from "@/types/User";

type CommentProps = {
  comment: commentype;
  index: number;
  user: UserType; 
  handleDelete: (id: number) => Promise<void>;
  ModhandleDelete: (id: number) => Promise<void>;
  handleEdit: (id: number, data: any) => Promise<void>;
};

const Comment = forwardRef<HTMLDivElement, CommentProps>(({ModhandleDelete,user, comment, handleDelete, handleEdit }, ref) => {
  const [Edit, SetEdit] = useState<boolean>(false);
  const [updatedComment, setUpdatedComment] = useState<string>(comment.comment);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await handleEdit(comment.id, { comment: updatedComment });
    SetEdit(false);
  };

  return (
    <div ref={ref} className="text-white m-3 bg-gray-800 p-2 rounded-md mb-2">
      {Edit ? (
        <form onSubmit={handleSubmit} className="flex flex-col w-full items-center gap-y-6">
          <textarea
            defaultValue={comment.comment}
            onChange={(e) => setUpdatedComment(e.target.value)}
            className="h-full w-4/5 bg-black rounded-md focus:outline-none focus:border focus:border-red-500 text-white"
          ></textarea>
          <div className="w-1/2 flex justify-around">
            <button className="p-4 rounded-md hover:text-black transition-colors duration-300 bg-green-500" type="submit">
              <BiMemoryCard size={20} />
            </button>
            <button className="p-4 rounded-md hover:text-black transition-colors duration-300 bg-red-500" onClick={() => SetEdit(false)}>
              <MdCancel size={20} />
            </button>
          </div>
        </form>
      ) : (
        <div className="flex justify-between m-1">
          <div className="self-start p-1">
            <Link href={`/user?id=${comment.user.id}`} className="text-sm text-gray-400 hover:text-white transition-colors duration-150">
              {comment.user.name}
            </Link>
            <p className="text-sm">{comment.comment}</p>
          </div>
          {comment.is_owner ? (
            <div className="p-1 flex flex-col justify-between items-stretch h-full">
              <button className="hover:text-black transition-colors duration-150 bg-red-500 rounded-md text-xs" onClick={() => handleDelete(comment.id)}>
                <BiTrash size={22} />
              </button>
              <button className="hover:text-black transition-colors duration-150 mt-2 bg-green-400 rounded-md text-xs" onClick={() => SetEdit(true)}>
                <BiPen size={22} />
              </button>
            </div>
            ) :
            user?.role<3&&
            <div className="p-2 h-24 w-24 flex flex-col justify-between items-stretch ">
                            <button className="flex flex-col items-center hover:text-black transition-colors duration-150 bg-violet-500 rounded-md text-xs" onClick={() => ModhandleDelete(comment.id)}>
              delted as mod  <BiTrash size={22} />
              </button>
            </div>
          }
        </div>
      )}
    </div>
  );
});

export default Comment;
