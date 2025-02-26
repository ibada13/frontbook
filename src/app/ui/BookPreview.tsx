import Link from "next/link";



export default function BookPreview({ book }: {book:any}){
    return (
        <Link
            href={ `/book/${book.id}`}
            className="w-[75vw] flex text-white self-center"
        >
            <div>{ book.publisher.name}</div>
            <div>{ book.title}</div>
            <div>{ }</div>
        </Link>
    );

 }