import { redirect } from "next/navigation";

export default function BooksPage() {
    redirect("/books/1"); 
    return null; 
}
