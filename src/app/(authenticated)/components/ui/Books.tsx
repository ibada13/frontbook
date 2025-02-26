'use client';

import TextDisplay from "@/app/(authenticated)/components/TextDisplay";
import AppLayout from "../../layouts/layout";
import useSWR from "swr";
import { fetcher } from "@/hooks/userhooks";
import BookCard from "@/app/ui/Book";
import BookPreview from "@/app/ui/BookPreview";

interface Params {
  id: number;
  apiUrl: string;
  middleware: string;
  path: string;
  componenttype?: "card" | "preview";
}

interface Book {
  id: number;
  title: string;
  author: string;
  // Add other relevant fields
}

interface BookList {
  data: Book[];
  last_page?: number;
}

const Books = ({ params }: { params: Params }) => {
  const { id, apiUrl, middleware, path, componenttype } = params;
  const { data: bookList, error, isLoading } = useSWR<BookList>(apiUrl, fetcher);

  if (error) {
    console.error("Error fetching books:", error);
    return <TextDisplay text="حدث خطأ أثناء تحميل الكتب." />;
  }

  if (isLoading) {
    return <TextDisplay text="يتم تحميل الكتب ...." />;
  }

  return (
    <AppLayout
      currentPage={id}
      middleware={middleware}
      path={path}
      totalPages={bookList?.last_page || null}
    >
      <div className="w-[90%] self-center flex flex-col justify-center items-center space-y-6 bg-black">
        {bookList?.data?.length ? (
          componenttype === "preview" ? (
            <div className="flex flex-col w-full items-center gap-y-8">
              { 

            bookList.data.map((book) => <BookPreview  book={book} key={book.id} />)
              }
            </div>
          ) : (
            <div className="w-full min-h-screen grid md:grid-cols-3 grid-cols-2 gap-y-10 place-items-center justify-center">
              {bookList.data.map((book) => (
                <BookCard book={book} key={book.id} />
              ))}
            </div>
          )
        ) : (
          <p className="text-white text-2xl">لا توجد كتب متاحة حاليا.</p>
        )}
      </div>
    </AppLayout>
  );
};

export default Books;
