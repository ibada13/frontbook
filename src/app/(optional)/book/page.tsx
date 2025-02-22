'use client';

import { useSearchParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { useRef, useCallback } from "react";
import useSWRInfinite from "swr/infinite";
import useSWR from "swr";
import { comment_data, booktype } from "@/types/Types";
import AppLayout from "@/app/(authenticated)/layouts/layout";
import { del, fetcher, post } from "@/hooks/userhooks";
import Comments from "./ui/Comments";
import TextDisplay from "@/app/(authenticated)/components/TextDisplay";
import { UserType } from "@/types/User";
import { useAuth } from "@/hooks/auth";
import axios from "axios";

const Book = () => {
    const searchParams = useSearchParams();
    const id = Number(searchParams.get('id')) || 1;
    const apiUrl = `/api/book?id=${id}`;
    const { user} = useAuth({})
    
    const { data: book, error,mutate, isLoading } = useSWR<any>(apiUrl, fetcher);

    const startreading = async (id:number) => { 
        try {

            const url = `/api/book/start-reading/${id}`
            
            
            post(url)
            mutate()
        } catch (err) { 
            console.error("error " , err)
        }
    }
    if (isLoading) return <TextDisplay text='يتم تحميل الكتاب ....'/>;
        
    if (error || !book) return <TextDisplay text='هذا الكتاب غير متاح حاليا.'/>;


    return (
        <AppLayout middleware="optional">
            <div className="flex flex-col justify-around text-white">
                <div className="flex flex-col space-y-6 md:flex-row justify-center md:justify-around items-center min-h-screen p-6">
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
                                
                                
                                <div className="self-center flex flex-col sm:flex-row w-1/2 gap-y-3 sm:gap-y-0 sm:items-center sm:justify-around">
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
                                book?.pages_read!==null ?
                            (<p className="text-xl flex text-white gap-x-4">
                            <span>{book.pages_read}</span>
                            <span className="text-red-500">من</span>
                            <span>{book.pages}</span>
                                </p>) :
                                    <button className="bg-green-500 hover:text-black hover:bg-green-600 transition-colors duration-150 rounded-lg py-4 px-6 font-semibold" onClick={() => startreading(book.id)}>أريد قراءة هذا الكتاب</button>
                                : null
                        }
                        <p className="text-md">{book.description}</p>
                        </div>
                </div>
                    <Comments user={user} id={id}/>
            </div>
        </AppLayout>
    );
};

export default Book;
