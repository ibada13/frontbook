'use client';
import useSWR from "swr";
import AppLayout from "@/app/(authenticated)/layouts/layout";
import { data } from "@/types/Types";
import { fetcher } from "@/hooks/userhooks";
import Books from "@/app/(authenticated)/components/ui/Books";
import TypeIcon from "../ui/TypeIcon";
import BookCard from "@/app/ui/Book";
import { book_type } from "@/app/(authenticated)/components/extra/def";
export default function Type({ params }: { params: {id:number} }) { 
    const id = Number(params.id)||1
    const apiUrl =`/api/books/${id}/type`
    const TypeapiUrl = `/api/${id}/type`
    const { data: bookList, isLoading, error, mutate } = useSWR<any>(apiUrl, fetcher);
    const { data: Type, isLoading:isLoadingType, error:errorType, mutate:mutateType } = useSWR(TypeapiUrl, fetcher);
    console.log(Type)
    return (
        <AppLayout
        currentPage={id}
        middleware={'optional'}
        path={'/type/'}
        totalPages={bookList?.last_page || null}
        >
            <div className="flex w-full flex-col">
            {errorType ? (
            <p className="text-red-400">خطأ في تحميل معلومات حول التصنيف</p>
            ) :
                isLoadingType ? (
            <p className="text-red-400">يتم تحميل معلومات حول التصنيف</p>
                    
                ) : Type && (

                    <div className="flex w-full items-center justify-around">
                <div className="w-1/3  flex justify-center items-center">
                <TypeIcon className="text-white font-semibold text-9xl"  typekey={Type.name}/>
                </div>
                
                    
                    <div className="w-4/6 text-white">
                    { Type.description}
                </div>
                                
                                </div>
                                )}
                                {
                                    error ? (
                                        <p className="text-red-400">خطأ في تحميل معلومات حول التصنيف</p>
                                    ) :
                                        isLoading ? (
                                            <p className="text-red-400">يتم تحميل معلومات حول التصنيف</p>
                    
                                        ) : bookList && (
                                            <div className="w-full min-h-screen grid md:grid-cols-3 grid-cols-2 gap-y-10 place-items-center justify-center">
                                                {bookList.data.map((book: any) => (
                                                    <BookCard book={book} key={book.id} />
                                                ))}
                                            </div>)}
                
            </div>
            </AppLayout>
    );
    
}