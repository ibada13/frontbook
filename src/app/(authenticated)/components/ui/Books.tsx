'use client';
import TextDisplay from "@/app/(authenticated)/components/TextDisplay";
import AppLayout from "../../layouts/layout";
import useSWR from "swr";
import { data } from "@/types/Types";
import { fetcher } from "@/hooks/userhooks";
import BookCard from "@/app/(optional)/books/ui/Book";


const Books = ({ params }: { params: {id:number , apiUrl:string ,middleware:string ,path:string} }) => {
    const id =  params.id;
  
    const { data: bookList, error, isLoading } = useSWR<data>( params.apiUrl , fetcher);
  
   
    console.log(bookList)
    return (
        <AppLayout currentPage={id} middleware={params.middleware} path={ params.path} totalPages={bookList?.last_page||null}>

        {
          error ? (
  
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