import Link from "next/link";
import Image from "next/image";

export default function BookPreview({
  book,

  onAccept,
  onDecline,
}: {
  book: any;
    onAccept: (BookId: number) => Promise<void>;
    onDecline: (BookId: number) => Promise<void>;
}) {
  const isPendingDelete = book.status === 3;
 function handleOnAccept() {

    onAccept(book.id);
     
   
  }
  function handleOnDecline() {
  onDecline(book.id)
  }
  return (
    <div
      className={`flex items-center justify-between gap-4 p-4 border rounded-xl w-full max-w-2xl shadow-md transition duration-300 
        ${isPendingDelete ? "bg-red-900 border-red-700 hover:bg-red-800" : "bg-green-900 border-green-700 hover:bg-green-800"}`}
    >
      <div className="flex flex-col items-start w-1/3 gap-2">
        <button
          onClick={handleOnAccept}
          className="px-4 py-2 text-sm font-medium text-white bg-green-400 rounded-lg hover:bg-green-800 transition-all duration-150 shadow"
        >
           قبول
        </button>
        <button
          onClick={handleOnDecline}
          className="px-4 py-2 text-sm font-medium text-white bg-red-400 rounded-lg hover:bg-red-800 transition-all duration-200 shadow"
        >
            رفض
        </button>
      </div>
      <Link href={`/book/${book.id}`} className="flex justify-between items-center gap-4 flex-1">
        <div>
          <h3 className="text-xl font-semibold text-white">{book.title}</h3>
          <p className="text-sm text-gray-300">{book.publisher.name}</p>
        </div>

        <div className="relative h-24 w-16 flex-shrink-0 overflow-hidden rounded-lg shadow">
          <Image
            src={book.cover_path}
            alt={book.title}
            layout="fill"
            objectFit="cover"
            className="transition-transform duration-200 hover:scale-110"

            />
        </div>
            </Link>
    </div>
  );
}
  