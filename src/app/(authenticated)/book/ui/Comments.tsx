import { del, fetcher } from "@/hooks/userhooks";
import { comment_data } from "@/types/Types";
import { useCallback, useRef } from "react";
import useSWRInfinite from "swr/infinite";
import Comment from "./Comment";

const Comments = ({id}:{id:Number }) => { 

    const getKey = (pageIndex: number, previousPageData: comment_data | null) => {
        if (previousPageData && !previousPageData.next_page_url) return null;
        return `/api/comments?book_id=${id}&page=${pageIndex}`;
    };

    const { data, size, setSize, mutate, isValidating } = useSWRInfinite(getKey, fetcher, {
        initialSize: 3,
    });

    const observer = useRef<IntersectionObserver | null>(null);
    
    const lastCommentRef = useCallback(
        (node: any) => {
            if (isValidating || !data || data[data.length - 1]?.next_page_url === null) return;
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
    ? Array.from(new Map(data.flatMap((page) => page.data).map(comment => [comment.id, comment])).values())
        : [];
    
        const handleDelete = async (id: number) => {
            try {
                await del(`?id=${id}`);
                mutate(
                    (pages) =>
                        pages?.map((page) => ({
                            ...page,
                            data: page.data.filter((comment: any) => comment.id !== id),
                        })),
                    false
                );
            } catch (error) {
                console.error("Error deleting comment:", error);
            }
        };
    return (
        
        <div className=" m-5 h-100 flex flex-col justify-around p-2 bg-gray-900 rounded-md border border-gray-700 scrollbar-default">
            <div className="h-80 overflow-y-auto">
                
        {comments.map((comment, index) => (
            <Comment handleDelete={handleDelete} comment={comment} index={index} cond={comments.length - 1 && data?.[data.length - 1]?.next_page_url} ref={ lastCommentRef} />
        ))}
        </div>
        <form className="w-full flex justify-around items-center p-3">
  <div className="flex-shrink-0 ml-6">
    <button className="px-8 py-4 rounded-lg bg-red-500 hover:text-black transition-colors duration-300" type="submit">نشر</button>
  </div>
  <textarea  
                    className="w-3/4 text-center focus:ring-0 border-2 border-gray-700 text-lg rounded-lg focus:border-2 focus:outline-none focus:border-red-400 transition-colors duration-200 bg-black mr-6"
                    placeholder="تعليق"
                    spellCheck={ true}
                ></textarea>
</form>

    </div>
    );
}
export default Comments