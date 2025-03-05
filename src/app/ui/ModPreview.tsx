import { UserType } from "@/types/User";
import Image from "next/image";
import Link from "next/link";
export default function ModPreview({ user,OnBan ,OnAdmin , onUnmod }: { user: UserType,OnBan:(UserId: number) => Promise<void>,OnAdmin:(UserId: number) => Promise<void> ,onUnmod:(UserId:number)=>Promise<void>}) {
  function handleBan() { 
    OnBan(user.id);
  }
  function handleAdmin() { 
    OnAdmin(user.id);
  }
  function handleunmod() { 
    onUnmod(user.id);
  }
  return (
      <div className="w-3/4 mx-auto flex items-center justify-around  bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 shadow-lg rounded-2xl p-8 border border-gray-700 transition-all duration-300 hover:shadow-xl">
      <div className="gap-y-4 self-center flex-grow flex flex-col items-center justify-center spac">
        <button className="px-4 py-2 bg-green-600 text-white rounded-lg shadow-md hover:bg-green-500 transition-all duration-300">
           Trust
        </button>
        <button onClick={handleBan} className="px-4 py-2 bg-red-600 text-white rounded-lg shadow-md hover:bg-red-500 transition-all duration-300">
           Ban
              </button>
              
                  
                  <button onClick={handleunmod} className="px-4 py-2 bg-red-600 text-white rounded-lg shadow-md hover:bg-red-500 transition-all duration-300">
           unmod
              </button>
             
              
                  
                  <button onClick={handleAdmin} className="px-4 py-2 bg-blue-400 text-white rounded-lg shadow-md hover:bg-blue-800 transition-all duration-300">
           admin
              </button>
           
              {/* <button onClick={handleBan} className="px-4 py-2 bg-red-600 text-white rounded-lg shadow-md hover:bg-red-500 transition-all duration-300">
           Ban
        </button> */}
      </div>

      <Link href={ `/users/${user.id}`} className="flex-grow flex flex-col  gap-y-5 items-center text-center">
        <h3 className="text-xl font-semibold text-white">{user.name}</h3>
        <p className="text-sm text-gray-400">{user.email}</p>
   
      <div className="relative h-24 w-24 flex-shrink-1 overflow-hidden rounded-full shadow">

              <Image
                  fill
          src={user.user_pfp || "/default-avatar.png"}
          alt={user.name}
          
          objectFit="cover"
          className="transition-transform duration-200 hover:scale-110"
          
          />
      </div>
          </Link >
            </div>

  );
}
