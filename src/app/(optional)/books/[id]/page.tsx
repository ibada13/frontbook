'use client'; // Ensure this is a client-side component

import { useAuth } from '@/hooks/auth';
import BookCard from "../../../ui/Book";
import useSWR from "swr";
import { useSearchParams } from 'next/navigation';
import AppLayout from '@/app/(authenticated)/layouts/layout';
import { fetcher } from '@/hooks/userhooks';
import { data } from '@/types/Types';
import TextDisplay from '@/app/(authenticated)/components/TextDisplay';
const Books = ({ params }: { params: {id:number} }) => {
  const id =  Number(params.id)||1;
  const apiUrl = `/api/books?id=${id}`;

  const { data: bookList, error, isLoading } = useSWR<data>( apiUrl , fetcher);

 
  console.log(bookList)
  return (
    <AppLayout currentPage={id} middleware='optional' path="/books" totalPages={bookList?.last_page||null}>
      {error ? (

        <TextDisplay text='حدث خطأ أثناء تحميل الكتب.'/>

      ) : isLoading ? (
        <TextDisplay text='يتم تحميل الكتب ....'/>
      ) : (
        bookList && (
          <div className="w-[90%] self-center flex flex-col justify-center items-center space-y-6 bg-black">
            <div className="w-full min-h-screen grid md:grid-cols-3 grid-cols-2 gap-y-10 place-items-center justify-center">
              {bookList.data.length > 0 ? (
                bookList.data.map((book: any, index: any) => (
                  <BookCard book={book} key={`b-${index}`} />
                ))
              ) : (
                <p className="text-white text-2xl">لا توجد كتب متاحة حاليا.</p>
              )}
            </div>
          </div>
        )
      )}
    </AppLayout>
  );
  
}

export default Books;
