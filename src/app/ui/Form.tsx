import { post } from "@/hooks/userhooks";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Image from "next/image";

export default function Form({ book , onSubmit  }: { book?: any , onSubmit:(FormData:any )=>Promise<number>  , }) {
    const router = useRouter();

    const [formdata, setFormData] = useState(() => ({
        title: book?.title ?? "",
        authors: Array.isArray(book?.authors) 
    ? book.authors.map((author: { name: string }) => author.name).join("*") 
    : "",
        pages: book?.pages?.toString() ?? "0",
        types: Array.isArray(book?.types) 
        ? book.types.map((type: { name: string }) => type.name).join("*") 
        : "",
        description: book?.description ?? "",
        published_year: book?.published_year?.toString() ?? "",
        isbn: book?.isbn ?? "",
        cover_path: book?.cover_path ?? null, 
    }));

    const [coverFile, setCoverFile] = useState<File | null>(null);

 
    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
        setFormData((prev) => ({
            ...prev,
            [e.target.name]: e.target.value,
        }));
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0] || null;
        setCoverFile(file);
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
        console.log(formData)
        if (coverFile) {
            formData.append("cover_path", coverFile);
        }
        const book_id = await onSubmit(formData)
       await router.push(`/book/${book_id}`);

    };

    return (
        <div className="min-h-screen w-screen flex justify-around bg-black items-center">
            <div className="bg-red-500 min-h-screen w-1/4 flex flex-col items-center justify-center p-4 rounded-lg">
                <label htmlFor="cover-upload" className="cursor-pointer bg-black text-white py-3 mb-2 px-6 rounded-lg">
                    اختر صورة الغلاف
                </label>
                <input id="cover-upload" type="file" accept="image/*" onChange={handleFileChange} className="hidden" />
                {(coverFile || formdata.cover_path) && (
                    <div className="flex-grow h-full w-full relative bg-pink-300">
                        <Image 
                            fill 
                            src={coverFile ? URL.createObjectURL(coverFile) : (formdata.cover_path as string)} 
                            alt="Book Cover Preview" 
                            className="object-cover rounded" 
                        />
                    </div>
                )}
            </div>
            <form onSubmit={handleSubmit} encType="multipart/form-data" className="w-1/2 bg-black h-5/6 flex flex-col items-center gap-y-6 p-6 rounded-lg">
                <input onChange={handleChange} value={formdata.title} placeholder="العنوان" type="text" name="title" className="w-1/2 p-2 rounded border-2 border-transparent text-center focus:border-red-500 text-black" />
                <input onChange={handleChange} value={formdata.authors} type="text" placeholder="المؤلفون" name="authors" className="w-2/3 p-2 rounded border-2 border-transparent text-center focus:border-red-500 text-black" />
                <input onChange={handleChange} value={formdata.pages} type="number" placeholder="عدد الصفحات" name="pages" className="w-1/3 p-2 rounded border-2 border-transparent text-center focus:border-red-500 text-black" />
                <input onChange={handleChange} value={formdata.types} type="text" placeholder="النوع" name="types" className="w-1/2 p-2 rounded border-2 border-transparent text-center focus:border-red-500 text-black" />
                <input onChange={handleChange} value={formdata.published_year} type="number" placeholder="تاريخ النشر" name="published_year" className="w-1/2 p-2 rounded border-2 border-transparent text-center focus:border-red-500 text-black" />
                <input onChange={handleChange} value={formdata.isbn} type="text" placeholder="الرقم التسلسلي" name="isbn" className="w-1/2 p-2 rounded border-2 border-transparent text-center focus:border-red-500 text-black" />
                <textarea onChange={handleChange} value={formdata.description} name="description" placeholder="الوصف" className="w-2/3 p-2 rounded border-2 border-transparent text-black"></textarea>
                <button type="submit" className="bg-red-500 px-4 py-2 rounded text-white hover:bg-red-600">إرسال</button>
            </form>
        </div>
    );
}
