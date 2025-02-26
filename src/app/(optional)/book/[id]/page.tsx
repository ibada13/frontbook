'use client';

import { useSearchParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { useRef, useCallback, useState } from "react";
import useSWRInfinite from "swr/infinite";
import useSWR from "swr";
import AppLayout from "@/app/(authenticated)/layouts/layout";
import { del, fetcher, post, put } from "@/hooks/userhooks";
import Comments from "../../../ui/Comments";
import TextDisplay from "@/app/(authenticated)/components/TextDisplay";
import { useAuth } from "@/hooks/auth";
import axios from "axios";
import { useRouter } from "next/router";
import { BiHeart, BiTag } from "react-icons/bi";
import { BsBookmarkFill, BsFillHeartFill, BsFillTagFill, BsTagFill } from "react-icons/bs";

const Book = ({ params }: { params: {id:number} }) => {
    // const router = useRouter();
    // const id = router.query?.id ? Number(router.query.id) : null;
    const id = Number(params.id)||1
    const apiUrl = `/api/book?id=${id}`;
    const { user} = useAuth({})
    const [Edit, SetEdit] = useState<boolean>(false);
    const { data: book, error,mutate, isLoading } = useSWR<any>(apiUrl, fetcher);
    const [formData, setFormData] = useState<{pages:""|number}>({ pages: "" });
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value ? Number(e.target.value) : "";
        setFormData({ pages: value });
    };
    const startreading = async (id:number) => { 
        try {

            const url = `/api/book/start-reading/${id}`
            
            
            post(url)
            mutate()
        } catch (err) { 
            console.error("error " , err)
        }
    }
    const saveit = async (id:number) => { 
        try {

            const url = `/api/book/${id}/save`
            
            
            post(url)
            mutate()
        } catch (err) { 
            console.error("error " , err)
        }
    }
    const favoriteit = async (id: number) => { 
        try {

            const url = `/api/book/${id}/favorite`
            
            
            post(url)
            mutate()
        } catch (err) { 
            console.error("error " , err)
        }
    }


    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!formData.pages || isNaN(formData.pages)) return;
        try {
            const url = `/api/book/${book.id}/update-pages`
            await put(url, { ...formData })
            mutate();
        } catch (err) {
            console.error("err ", err)
        } finally { 
            SetEdit(false)

        }
}
    // if (isLoading) return <TextDisplay text='يتم تحميل الكتاب ....'/>;
        
    // if (error || !book) return <TextDisplay text='هذا الكتاب غير متاح حاليا.'/>;


    return (
        <AppLayout currentPage={id} middleware="optional">
            { 
                isLoading ?
                    <TextDisplay text='يتم تحميل الكتاب ....' />
                    :
                    (error || !book) ?<TextDisplay text='هذا الكتاب غير متاح حاليا.'/>
                        :
                    (
                    
                    <div className="flex flex-col w-full justify-around text-white">
                <div className="p-6">

                    <p>ناشر الكتاب : <Link href={`/user/${book.publisher.id}`}>{book.publisher.name}</Link> </p>
                </div>
                <div className="flex w-full flex-col space-y-6 md:flex-row justify-center md:justify-around items-center min-h-screen p-6">
                    <div className="w-1/4 bg-red-500 h-1/2 border rounded-md self-center">
                        {book.cover_path && (
                            <Image alt={book.title} width={300} height={200} src={book.cover_path} />
                        )}
                    </div>
                    <div className="md:w-2/3 w-full flex flex-col justify-around items-center min-h-screen space-y-12">
                        <p className="text-5xl text-red-500">{book.title}</p>
                        <div className="flex gap-x-3 font-bold w-full">
                            <p>المؤلفون:</p>
                            {book?.authors?.map((author:any) => (
                                <Link key={author.id} href={`/author/${author.id}`}>{author.name}</Link>
                            ))}
                        </div>
                        <div className="flex flex-col gap-y-3 sm:gap-y-0 sm:flex-row sm:gap-x-4 text-lg">
                            {book?.types?.map((type:any) => (
                                <Link key={type.id} className="hover:text-red-500 transition-colors duration-300" href={`/type/${type.id}`}> 
                                    {type.name}
                                </Link>
                            ))}
                        </div>
                        { 
                            book.is_owner&& (
                                
                                
                                <div className="items-center  self-center flex flex-col sm:flex-row w-1/2 gap-y-3 sm:gap-y-0 sm:items-center sm:justify-around">
                            <Link className="p-4 sm:w-1/4 w-1/2 text-md font-black bg-green-400 hover:text-black transition-colors duration-300 rounded-md text-center" href={{ pathname: `/book/edit/`, query: { book: JSON.stringify(book) } }}>
                                تعديل
                            </Link>
                            <button className="p-4 sm:w-1/4 w-1/2 text-md font-black bg-red-500 hover:text-black transition-colors duration-300 rounded-md text-center">
                                حذف
                            </button>
                        </div>
                        )
                    }
                        { 
                                            user ?
                                                <div className="flex flex-col sm:flex-row gap-y-8 sm:gap-y-0 sm:gap-x-4   w-full sm:justify-around ">
{
                                book?.pages_read !== null ?
                                    Edit ?
                                        (
                                            <form className=" p-2 flex " onSubmit={handleSubmit}>
                                                <div className="flex items-center justify-center">

                                                <input defaultValue={book.pages_read} onChange={handleChange} className="text-black text-xl font-semibold  h-2/3 w-1/2 rounded-lg" type="number" placeholder="أدخل رقم الصفحة التي وصلت لها " />
                                                </div>
                                                <div className="flex flex-col justify-around p-2">

                                                <button className="mb-2 transition-colors duration-150 bg-red-500 hover:bg-red-700 hover:text-black p-2 rounded-lg"  onClick={ ()=>SetEdit(false)}>إلغاء</button>
                                                <button className="mt-2 transition-colors duration-150 bg-green-500 hover:bg-green-700 hover:text-black p-2 rounded-lg" type="submit">حفظ</button>
                                                </div>
                                                
                                        </form>
                                        )
                                        
                                                                : book.pages_read === book.pages ?
                                                                    <div className="flex justify-center items-center">

                            <span onClick={()=>SetEdit(true)} className="cursor-pointer text-green-400 text-4xl font-bold">تمت قرائته</span>
                                                                    </div>

                                        :
                            (<p onClick={()=>SetEdit(true)} className=" cursor-pointer text-xl flex items-center justify-center text-white gap-x-4">
                            <span>{book.pages_read}</span>
                            <span className="text-red-500">من</span>
                            <span>{book.pages}</span>
                                        </p>) :
                                    (
                                        <div className="flex flex-col justify-around items-center gap-y-10">
                                            <p className="mb-3">
                                                <span>عدد الصفحات :</span>
                            <span className="mb-2 font-bold text-lg">{book.pages}</span>
                                                    
                                        </p>

                                        <button className="bg-green-500 hover:text-black hover:bg-green-600 transition-colors duration-150 rounded-lg py-4 px-6 font-semibold" onClick={() => startreading(book.id)}>أريد قراءة هذا الكتاب</button>
                                        </div>
                                                            )}
                                                        <div className="flex gap-y-10 flex-col  items-center justify-around">
                                                        <div><BsFillHeartFill className={`${book.favorited ? "text-red-500 hover:text-transparent" : "hover:text-red-500"} transition-colors duration-200 cursor-pointer `} onClick={() => favoriteit(book.id)} size={70} /></div>
                                                    <div><BsBookmarkFill  className={`${book.saved ?"text-green-600 hover:text-transparent":"hover:text-green-600"} transition-colors duration-200 cursor-pointer `} onClick={() => saveit(book.id)} size={70}/></div>
                                                    </div>
                                                </div>
                                : null
                        }
                        <p className="text-md">{book.description}</p>
                        </div>
                </div>
                    <Comments user={user} id={id}/>
            </div>
)
    }
        </AppLayout>
    );
};

export default Book;
