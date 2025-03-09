'use client';
import useSWR from "swr";
import AppLayout from "@/app/(authenticated)/layouts/layout";
import { fetcher } from "@/hooks/userhooks";
import Image from "next/image";
import BookCard from "@/app/ui/Book";
import { useState } from "react";
import { useAuth } from "@/hooks/auth";
import { handleEdit } from "../functions";
export default function Author({ params }: { params: {id:number,page:number} }) { 
    const id = Number(params.id) || 1
    const page = Number(params.page)||1;
    const apiUrl =`/api/books/${id}/author?page=${page}`
    const AuthorapiUrl = `/api/${id}/author`
    const { data: bookList, isLoading, error  } = useSWR<any>(apiUrl, fetcher);
    const { data: Author, isLoading:isLoadingAuthor, error:errorAuthor ,mutate} = useSWR(AuthorapiUrl, fetcher);
    const [Edit, SetEdit] = useState<boolean>(false);
    const [UpdatedBio, SetUpdatedBio] = useState<string>();
    const { user } = useAuth({})
        function Onsubmit(e:React.FormEvent) { 
            e.preventDefault()
            handleEdit(Author.id, {bio:UpdatedBio});
            SetEdit(false)
            mutate();
        }
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
                                    {Edit && user?.role < 3 ?
                                        <form className="w-full flex justify-around items-center " onSubmit={Onsubmit}>

                                            <textarea className="rounded-lg bg-gray-800 text-red-500 w-1/2 text-lg" defaultValue={Author.bio || ""} onChange={(e) => SetUpdatedBio(e.target.value)} name="" id=""></textarea>
                                            <button className="bg-green-500 hover:bg-green-800 hover:text-black transition-colors duration-200 px-6 py-4 rounded-xl" type="submit">تعديل</button>
                                            <button className="bg-red-500 hover:bg-red-800 hover:text-black transition-colors duration-200 px-6 py-4 rounded-xl" onClick={e => SetEdit(false)}>إلغاء</button>
                                        </form> :
                                        
                                        <p className="cursor-pointer " onClick={e=>SetEdit(true)}>{Author.bio}</p>
                                        }
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