'use client';
import useSWR from "swr";
import AppLayout from "@/app/(authenticated)/layouts/layout";
import { data } from "@/types/Types";
import { fetcher } from "@/hooks/userhooks";
import Books from "@/app/(authenticated)/components/ui/Books";
import TypeIcon from "../../ui/TypeIcon";
import BookCard from "@/app/ui/Book";
import { book_type } from "@/app/(authenticated)/components/extra/def";
export default function Type({ params }: { params: {id:number,page:number} }) { 
    const id = Number(params.id) || 1
    const page = Number(params.page) || 1;
    const apiUrl =`/api/books/${id}/type?page=${page}`
    const TypeapiUrl = `/api/${id}/type`
    const { data: bookList, isLoading, error  } = useSWR<any>(apiUrl, fetcher);
    const { data: Type, isLoading:isLoadingType, error:errorType } = useSWR(TypeapiUrl, fetcher);
    console.log(Type)
    return (
        <AppLayout
        currentPage={page}
        middleware={'optional'}
        path={`/type/${id}/`}
        totalPages={bookList?.last_page || null}
        >
            <div className="flex w-full flex-col gap-y-10">
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
                
                    
                    <div className="w-4/6 text-xl text-white">
                    { Type.description}
                </div>
                                
                                </div>
                                )}
                                {
                                    error ? (
                                        <p className="text-red-400">خطأ في تحميل الكتب</p>
                                    ) :
                                        isLoading ? (
                                            <p className="text-red-400">يتم تحميل الكتب</p>
                    
                        ) : bookList && (
                                <div className="flex w-full flex-col items-center gap-y-5">
                                    <p className="text-5xl text-red-500">أشهر الكتب في هذا التصنيف</p>

                                            <div className="w-full min-h-screen grid md:grid-cols-3 grid-cols-2 gap-y-10 place-items-center justify-center">
                                                {bookList.data.map((book: any) => (
                                                    <BookCard book={book} key={book.id} />
                                                ))}
                                                </div>
                                            </div>)}
                
            </div>
            </AppLayout>
    );
    
}