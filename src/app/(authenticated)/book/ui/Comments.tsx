import { del, fetcher, post } from "@/hooks/userhooks";
import { comment_data } from "@/types/Types";
import { useCallback, useRef, useState } from "react";
import useSWRInfinite from "swr/infinite";
import Comment from "./Comment";

type CommentsProps = {
  id: number;
};

const Comments = ({ id }: CommentsProps) => {
  const getKey = (pageIndex: number, previousPageData: comment_data | null) => {
    if (previousPageData && !previousPageData.next_page_url) return null;
    return `/api/comments?book_id=${id}&page=${pageIndex + 1}`; // Ensure correct page number
  };

  const { data, size, setSize, mutate, isValidating } = useSWRInfinite(getKey, fetcher, {
    initialSize: 1,
  });

  const observer = useRef<IntersectionObserver | null>(null);

  const lastCommentRef = useCallback(
    (node: HTMLDivElement | null) => {
      if (isValidating || !data || !data[data.length - 1]) return;
      
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
      await del(`/api/comments?id=${commentId}`);
      mutate();
    } catch (error) {
      console.error("Error deleting comment:", error);
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
        {comments.map((comment, index) => (
          <Comment
            key={comment.id}
            handleDelete={handleDelete}
            comment={comment}
            index={index}
            ref={index === comments.length - 1 ? lastCommentRef : null} // Attach ref correctly
          />
        ))}
      </div>

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
    </div>
  );
};

export default Comments;
