import { post } from "@/hooks/userhooks";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Image from "next/image";
export default function Form() { 
    const router = useRouter();
    const [formdata, SetFormData] = useState({
        title: "",
        authors: "",
        pages: "",
        types: "",
        description: "",
        published_year: "",
        isbn: "",
        cover_path:null as File | null,
    });


    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
        SetFormData({ ...formdata, [e.target.name]: e.target.value });
    };
    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0] || null;
        if (file) {
            console.log("Selected file:", file);
        }
        SetFormData({ ...formdata, cover_path: file });
    };  
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
    
        const formData = new FormData();
        formData.append("title", formdata.title);
        formData.append("authors", formdata.authors);
        formData.append("pages", formdata.pages);
        formData.append("types", formdata.types);
        formData.append("description", formdata.description);
        formData.append("published_year", formdata.published_year);
        formData.append("isbn", formdata.isbn);
    
        // Append file only if selected
        if (formdata.cover_path) {
            formData.append("cover_path", formdata.cover_path);
        }
        try { 
            const response = await post("/api/book", formdata );

        

            router.push(`/book/${response.book_id}`); 
        } catch (error) {
            console.error("Error posting book:", error);
        }
    };

    return (
        <div className="min-h-screen w-screen flex justify-around bg-black items-center">
<div className="bg-red-500 min-h-screen w-1/4 flex flex-col items-center justify-center p-4 rounded-lg">
                <label htmlFor="cover-upload" className="cursor-pointer bg-black text-white py-3 mb-2  px-6 rounded-lg">
                    اختر صورة الغلاف
                </label>
                <input id="cover-upload" type="file" accept="image/*" onChange={handleFileChange} className="hidden"/>
                {formdata.cover_path && (
                    <div className="flex-grow h-full w-full  relative bg-pink-300">

                    <Image fill src={URL.createObjectURL(formdata.cover_path)} alt="Book Cover Preview" className=" object-cover rounded" />
                    </div>
                )}
            </div>
            <form onSubmit={handleSubmit} encType="multipart/form-data" className="w-1/2 bg-black h-5/6 flex flex-col items-center gap-y-6">
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
