'use client';
import useSWR from "swr";
import AppLayout from "@/app/(authenticated)/layouts/layout";
import { fetcher } from "@/hooks/userhooks";
import Image from "next/image";
import BookCard from "@/app/ui/Book";
export default function Author({ params }: { params: {id:number,page:number} }) { 
    const id = Number(params.id) || 1
    const page = Number(params.page)||1;
    const apiUrl =`/api/books/${id}/author?page=${page}`
    const AuthorapiUrl = `/api/${id}/author`
    const { data: bookList, isLoading, error  } = useSWR<any>(apiUrl, fetcher);
    const { data: Author, isLoading:isLoadingAuthor, error:errorAuthor } = useSWR(AuthorapiUrl, fetcher);
    return (
        <AppLayout
        currentPage={page}
        middleware={'optional'}
        path={`/author/${id}/`}
        totalPages={bookList?.last_page || null}
        >
            <div className="flex w-full flex-col gap-y-10">
            {errorAuthor ? (
            <p className="text-red-400">خطأ في تحميل معلومات حول الكاتب</p>
            ) :
                isLoadingAuthor ? (
            <p className="text-red-400">يتم تحميل معلومات حول الكاتب</p>
                    
                ) : Author && (

                    <div className="flex w-full items-center justify-around">
<div className="w-48 h-48 relative flex justify-center items-center">
    <Image fill alt="some pfp" src={Author.author_pfp} className="rounded-full object-cover" />
</div>

                
                    
                    <div className="w-4/6 text-xl text-white">
                    { Author.bio}
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
                                    <p className="text-5xl text-red-500">أشهر الكتب لهاذا المؤلف</p>

                                            <div className="w-full  min-h-screen grid md:grid-cols-3 grid-cols-2 gap-y-10 place-items-center justify-center">
                                                {bookList.data.map((book: any) => (
                                                    <BookCard book={book} key={book.id} />
                                                ))}
                                                </div>
                                            </div>)}
                
            </div>
            </AppLayout>
    );
    
}