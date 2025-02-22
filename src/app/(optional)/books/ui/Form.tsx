import { post } from "@/hooks/userhooks";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Form() { 
    const router = useRouter();
    const [FormData, SetFormData] = useState({
        title: "",
        authors: "",
        pages: "",
        types: "",
        description: "",
        published_year: "",
        isbn:""
    });


    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
        SetFormData({ ...FormData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            const response = await post("/api/book", { ...FormData });

        

            router.push(`/book/${response.book_id}`); 
        } catch (error) {
            console.error("Error posting book:", error);
        }
    };

    return (
        <div className="min-h-screen flex justify-around bg-black items-center">
            <div className="bg-red-500 min-h-[83vh] w-1/3 block">fafasfasf</div>

            <form onSubmit={handleSubmit} className="w-1/2 bg-black h-5/6 flex flex-col items-center gap-y-6">
                <input onChange={handleChange} placeholder="العنوان" type="text" name="title" className="w-1/2 p-2 rounded focus:ring-0 focus:outline-none border-2 border-transparent text-center focus:border-2 focus:border-red-500 text-black"/>
                <input onChange={handleChange} type="text" placeholder="المؤلفون" name="authors" className="w-2/3 p-2 rounded focus:ring-0 focus:outline-none border-2 border-transparent text-center focus:border-2 focus:border-red-500 text-black"/>
                <input onChange={handleChange} type="number" placeholder="عدد الصفحات" name="pages" className="w-1/3 p-2 rounded focus:ring-0 focus:outline-none border-2 border-transparent text-center focus:border-2 focus:border-red-500 text-black"/>
                <input onChange={handleChange} type="text" placeholder="النوع" name="types" className="w-1/2 p-2 rounded focus:ring-0 focus:outline-none border-2 border-transparent text-center focus:border-2 focus:border-red-500 text-black"/>
                <input onChange={handleChange} type="number" placeholder="تاريخ النشر" name="published_year" className="w-1/2 p-2 rounded focus:ring-0 focus:outline-none border-2 border-transparent text-center focus:border-2 focus:border-red-500 text-black"/>
                <input onChange={handleChange} type="text" placeholder="الرقم التسلسلي" name="isbn" className="w-1/2 p-2 rounded focus:ring-0 focus:outline-none border-2 border-transparent text-center focus:border-2 focus:border-red-500 text-black"/>
                <textarea onChange={handleChange} name="description" placeholder="الوصف" className="w-2/3 focus:ring-0 focus:outline-none focus:border=2 focus:border-red-500 border-2 border-transparent p-2 text-black rounded-md"></textarea>
                <button type="submit" className="bg-red-500 px-4 py-2 rounded text-white">إرسال</button>
            </form>

   
        </div>
    );
}
