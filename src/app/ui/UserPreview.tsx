import { UserType } from "@/types/User";

export default function UserCard({ user }: { user: UserType }) {
  return (
    <div className="w-3/4 mx-auto flex items-center justify-around bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 shadow-lg rounded-2xl p-5 border border-gray-700 transition-all duration-300 hover:shadow-xl">
      <div className="gap-y-4 flex flex-col items-center justify-center spac">
        <button className="px-4 py-2 bg-green-600 text-white rounded-lg shadow-md hover:bg-green-500 transition-all duration-300">
           Trust
        </button>
        <button className="px-4 py-2 bg-red-600 text-white rounded-lg shadow-md hover:bg-red-500 transition-all duration-300">
           Ban
        </button>
      </div>
      <div className="relative">
        <img
          src={user.user_pfp || "/default-avatar.png"}
          alt={user.name}
          className="w-16 h-16 rounded-full object-cover border-4 border-gray-600 hover:border-green-400 transition-all duration-300"
        />
      </div>

      <div className=" text-center">
        <h3 className="text-xl font-semibold text-white">{user.name}</h3>
        <p className="text-sm text-gray-400">{user.email}</p>
      </div>

    </div>
  );
}
