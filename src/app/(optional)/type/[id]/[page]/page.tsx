'use client';
import useSWR from "swr";
import AppLayout from "@/app/(authenticated)/layouts/layout";
import { data } from "@/types/Types";
import { fetcher } from "@/hooks/userhooks";
import Books from "@/app/(authenticated)/components/ui/Books";
import TypeIcon from "../../ui/TypeIcon";
import BookCard from "@/app/ui/Book";
import { book_type } from "@/app/(authenticated)/components/extra/def";
import { useState } from "react";
import { handleEdit } from "../../functions";
import { useAuth } from "@/hooks/auth";
export default function Type({ params }: { params: {id:number,page:number} }) { 
    const id = Number(params.id) || 1
    const page =  Number(params.page)||1;
    const apiUrl =`/api/books/${id}/type?page=${page}`
    const TypeapiUrl = `/api/${id}/type`
    const {user} = useAuth({})
    const { data: bookList, isLoading, error  } = useSWR<any>(apiUrl, fetcher);
    const { data: Type, isLoading:isLoadingType, error:errorType ,mutate } = useSWR(TypeapiUrl, fetcher);
    const [UpdatedDescription , SetUpdatedDescription] = useState<string|undefined>(Type?.description)
    const [Edit, SetEdit] = useState<boolean>(false);
    function Onsubmit(e:React.FormEvent) { 
        e.preventDefault()
        handleEdit(Type.id, {description:UpdatedDescription});
        SetEdit(false)
        mutate();
    }
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
                                    {Edit &&user?.role<3 ?
                                        <form className="w-full flex justify-around items-center " onSubmit={Onsubmit}>

                                            <textarea className="rounded-lg bg-gray-800 text-red-500 w-1/2 text-lg" defaultValue={Type.description||""} onChange={(e)=>SetUpdatedDescription(e.target.value)} name="" id=""></textarea>
                                            <button className="bg-green-500 hover:bg-green-800 hover:text-black transition-colors duration-200 px-6 py-4 rounded-xl" type="submit">تعديل</button>
                                            <button className="bg-red-500 hover:bg-red-800 hover:text-black transition-colors duration-200 px-6 py-4 rounded-xl" onClick={e=>SetEdit(false)}>إلغاء</button>
                                        </form>
                                        
                                        :
                                        <p onClick={ (e)=>SetEdit(true)} className={` ${user?.role<3?"cursor-pointer":null} text-xl text-white`}>
                                            
                    { Type.description }
                                </p>
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