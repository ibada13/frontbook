import { del, fetcher, post, put } from "@/hooks/userhooks";
import { comment_data } from "@/types/Types";
import { useCallback, useRef, useState } from "react";
import useSWRInfinite from "swr/infinite";
import Comment from "./Comment";
import { useUser } from "@/app/UserContext";
import { useAuth } from "@/hooks/auth";
import { UserType } from "@/types/User";

const Comments = ({ user, id }: { user: UserType; id: number }) => {
  const getKey = (pageIndex: number, previousPageData: comment_data | null) => {
    if (previousPageData && (!previousPageData.next_page_url || previousPageData.data.length === 0)) {
      return null;
    }
    return `/api/comments?book_id=${id}&page=${pageIndex + 1}`;
  };

  const { data, size, setSize, mutate, isValidating } = useSWRInfinite(getKey, fetcher, {
    initialSize: 1,
  });

  const observer = useRef<IntersectionObserver | null>(null);

  const lastCommentRef = useCallback(
    (node: HTMLDivElement | null) => {
      if (isValidating || !data || !data[data.length - 1]) return;

      const lastPage = data[data.length - 1];

      if (!lastPage.next_page_url) {
        if (observer.current) observer.current.disconnect();
        return;
      }

      if (observer.current) observer.current.disconnect();

      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
          setSize((prev) => prev + 1);
        }
      });

      if (node) observer.current.observe(node);
    },
    [isValidating, data, setSize]
  );

  const comments = data
    ? Array.from(new Map(data.flatMap((page) => page.data).map((comment) => [comment.id, comment])).values())
    : [];

  const handleDelete = async (commentId: number) => {
    try {
      await del(`/api/comments/${commentId}`);
      mutate();
    } catch (error) {
      console.error("Error deleting comment:", error);
    }
  };
  const ModhandleDelete = async (commentId: number) => {
    try {
      await del(`/api/mod/comments/${commentId}`);
      mutate();
    } catch (error) {
      console.error("Error deleting comment:", error);
    }
  };

  const handleEdit = async (commentId: number, data: any) => {
    try {
      await put(`/api/comments/${commentId}`, data);
      mutate();
    } catch (error) {
      console.error("Error editing comment:", error);
    }
  };

  const [formData, setFormData] = useState({ comment: "" });

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.comment.trim()) return;

    try {
      const newComment = await post("/api/comments", { ...formData, book_id: id });
      if (newComment) {
        mutate();
        setFormData({ comment: "" });
      }
    } catch (error) {
      console.error("Error posting comment:", error);
    }
  };

  return (
    <div className="m-5 h-100 flex flex-col justify-around p-2 bg-gray-900 rounded-md border border-gray-700">
      <div className="h-80 overflow-y-auto">
        {comments.map((comment, index) => {
          const isLastComment = index === comments.length - 1;
          return (
            <Comment
              ModhandleDelete={ModhandleDelete}
              user={user}
              key={comment.id}
              handleDelete={handleDelete}
              handleEdit={handleEdit}
              comment={comment}
              index={index}
              ref={isLastComment ? lastCommentRef : null}
            />
          );
        })}
      </div>
      {user ? (
        <form className="w-full flex justify-around items-center p-3" onSubmit={handleSubmit}>
          <div className="flex-shrink-0 ml-6">
            <button className="px-8 py-4 rounded-lg bg-red-500 hover:text-black transition-colors duration-300" type="submit">
              نشر
            </button>
          </div>
          <textarea
            className="w-3/4 text-center focus:ring-0 border-2 border-gray-700 text-lg rounded-lg focus:border-2 focus:outline-none focus:border-red-400 transition-colors duration-200 bg-black mr-6"
            placeholder="تعليق"
            spellCheck={true}
            name="comment"
            value={formData.comment}
            onChange={handleChange}
          ></textarea>
        </form>
      ) : (
        <div className="text-center text-lg">يجب عليك تسجيل الدخول لنشر تعليق</div>
      )}
    </div>
  );
};

export default Comments;
