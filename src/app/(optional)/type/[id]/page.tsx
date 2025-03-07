'use client';
import useSWR from "swr";
import AppLayout from "@/app/(authenticated)/layouts/layout";
import { data } from "@/types/Types";
import { fetcher } from "@/hooks/userhooks";
import Books from "@/app/(authenticated)/components/ui/Books";
import TypeIcon from "../ui/TypeIcon";
import BookCard from "@/app/ui/Book";
export default function Type({ params }: { params: {id:number} }) { 
    const id = Number(params.id)||1
    const apiUrl = `/book/${id}/type`
    const TypeapiUrl = `/api/${id}/type`
    // const { data: bookList, isLoading, error, mutate } = useSWR(apiUrl, fetcher);
    const { data: Type, isLoading:isLoadingType, error:errorType, mutate:mutateType } = useSWR(TypeapiUrl, fetcher);
    console.log(Type)
    return (
        <AppLayout
        currentPage={id}
        middleware={'optional'}
        path={'/type/${id}/'}
        // totalPages={bookList?.last_page || null}
        >
            {errorType ? (
            <p className="text-red-400">خطأ في تحميل معلومات حول التصنيف</p>
            ) :
                isLoadingType ? (
            <p className="text-red-400">يتم تحميل معلومات حول التصنيف</p>
                    
                ) : Type && (
                        <div className="flex w-full flex-col">

                    <div className="flex w-full items-center justify-around">
                <div className="w-1/3  flex justify-center items-center">
                <TypeIcon className="text-white font-semibold text-9xl"  typekey={Type.name}/>
                </div>
                {Type&&(
                    
                    <div className="w-4/6 text-white">
                    { Type.description}
                </div>
                                )}
                                <div>
                                {bookList.data.map((book) => (
                <BookCard book={book} key={book.id} />
              ))}
                                </div>
                </div>
                
            </div>
            )}
            </AppLayout>
    );
    
}