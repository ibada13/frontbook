import { useAuth } from "@/hooks/auth";
import { UserType } from "@/types/User";
import Image from "next/image";
import Link from "next/link";
export default function UserCard({ user, OnBan,OnMod }: { user: UserType, OnBan: (UserId: number) => Promise<void>, OnMod: (userId: number) => Promise<void> }) {
  const { user: thisuser } = useAuth({});
  function handleBan() { 
    OnBan(user.id);
  }
  function handleMod() { 
    OnMod(user.id);
  }
  return (
      <div className="w-3/4 mx-auto flex items-center justify-around bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 shadow-lg rounded-2xl p-5 border border-gray-700 transition-all duration-300 hover:shadow-xl">
      <div className="gap-y-4 flex flex-col items-center justify-center spac">
        <button className="px-4 py-2 bg-green-600 text-white rounded-lg shadow-md hover:bg-green-500 transition-all duration-300">
           موثوق
        </button>
        <button onClick={handleBan} className="px-4 py-2 bg-red-600 text-white rounded-lg shadow-md hover:bg-red-500 transition-all duration-300">
           حظر
        </button>
        {thisuser.role === 1 &&(
          
          <button onClick={handleMod} className="px-4 py-2 bg-orange-400 text-white rounded-lg shadow-md hover:bg-orange-800 transition-all duration-300">
           رفع الرتبة إلى مشرف
        </button>
        )}
      </div>
      <Link href={`/user/${user.id}`} className="flex justify-around items-center flex-grow">
      <div className=" text-center">
        <h3 className="text-xl font-semibold text-white">{user.name}</h3>
        <p className="text-sm text-gray-400">{user.email}</p>
      </div>
      <div className="relative h-24 w-24 flex-shrink-1 overflow-hidden rounded-full shadow">

              <Image
                  fill
          src={user.user_pfp || "/default-avatar.png"}
          alt={user.name}
          
            objectFit="cover"
            className="transition-transform duration-200 hover:scale-110"
            
            />
      </div>
            </Link>

    </div>
  );
}
