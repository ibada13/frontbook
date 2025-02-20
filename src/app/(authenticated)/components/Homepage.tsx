'use client';
import Book from "./ui/BookCard";
import { useEffect, useRef, useState } from "react";
import {fetch_books} from './utils/api'
import { book, data } from "./extra/def";
import { GiSurprisedSkull } from "react-icons/gi";
import { useAuth } from "../auth/auth";
import useSWR from "swr";
export const Homepage = () => { 
    const [page, Setpage] = useState<number>(1);
    const [wanteddata , Setwanteddata] = useState<book[]|undefined|null>(null)
    const searchinputRef = useRef<HTMLInputElement>(null);
    const { user } = useAuth({ middleware: 'auth' })
    if (!user) {
        return <p> loading ... </p>
    }
    console.log(user)
    
    const url = `http://localhost:8000/api/books?page=${page}`;
    const { data, isLoading:loading, error } = useSWR<data>(url,fetch_books);
    function search() { 
        console.log(searchinputRef?.current?.value)
        if (searchinputRef?.current?.value.length===0) { 
            Setwanteddata(null)
            return;
        }
        const wanteddata = data?.data.filter(book=>book.title.includes(searchinputRef.current?.value as string) )
        console.log(wanteddata)
        Setwanteddata(wanteddata)
    }   

    if (error) { 
        return (
            <div className="flex justify-center gap-y-10 flex-col min-h-screen  items-center text-red-500 text-4xl ">
                <div className="flex gap-x-1 items-center whitespace-pre-wrap">

                    يوجد خطأ  |  <GiSurprisedSkull   className="text-6xl"/>
                </div>
                <p className="text-gray-300 text-sm uppercase ">check the log for more infos</p>
            </div>
        )
    }
    if (loading) {
        return (
            <div className="flex min-h-screen justify-center items-center text-red-500 text-4xl ">
                    يتم تحميل الكتب ....
            </div>
        )
    }
    return (
        <div className="w-[90%]  flex flex-col justify-center items-center space-y-6">
            <input  onChange={search} type="text"className="text-black p-4 bg-gray-200 rounded-lg border-2 border-transport focus:outline-none focus:border-2 focus:border-red-500 " ref={searchinputRef} />
        <div className="w-full min-h-screen grid md:grid-cols-3 grid-cols-2 gap-y-10  place-items-center justify-center">
                {wanteddata ?
                    wanteddata.map((book, index) => (
                    <Book book={book} key={`b-${index}`}/>
                        
                    ))
                    :
                data?.data.map((book, index) => ( 
                    <Book book={book} key={`b-${index}`}/>
                ))
                }
        </div>
            <div className="w-1/2 self-center flex  m-4 justify-around items-center ">
                <button className="p-4 font-bold text-red-500 border rounded-md  disabled:text-red-500 disabled:border disabled:border-gray-600 disabled:cursor-not-allowed" disabled={ page<=1} onClick={e=>Setpage(page=>page-1)}>{'<'}-</button>
                <button className="p-4 font-bold text-red-500 border rounded-md  disabled:text-red-500 disabled:border disabled:border-gray-600 disabled:cursor-not-allowed" disabled={data ?page>=data?.last_page:undefined}  onClick={e=>Setpage(page=>page+1)}>-{'>'}</button>
            </div>
            </div>
    );
}