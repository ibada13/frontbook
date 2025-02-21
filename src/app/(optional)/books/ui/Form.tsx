export default function Form() { 
    return (
        <div  className="w-3/5  h-screen  flex flex-col items-center gap-y-6">
        <input placeholder="العنوان" type="text" className="w-1/2 p-3 rounded focus:outline-none border-2 border-transparent text-center focus:border-2 focus:border-red-500 text-black" name=""/>
        <input type="text" placeholder="المؤلفون"  className="w-2/3 p-3 rounded focus:outline-none border-2 border-transparent text-center focus:border-2 focus:border-red-500 text-black" name=""/>
        <input type="number" placeholder="عدد الصفحات" className="w-1/3 p-3 rounded focus:outline-none border-2 border-transparent text-center focus:border-2 focus:border-red-500 text-black" name=""/>
        <input type="text" placeholder="النوع" className="w-1/2 p-3 rounded focus:outline-none border-2 border-transparent text-center focus:border-2 focus:border-red-500 text-black" name=""/>
        <input type="text" placeholder="" className="w-1/2 p-3 rounded focus:outline-none border-2 border-transparent text-center focus:border-2 focus:border-red-500 text-black" name=""/>

            <textarea className="h-1/2 w-2/3 focus:outline-none focus:border=2 focus:border-red-500 border-2 border-transparent p-3 text-black rounded-md" spellCheck={false} name="description" placeholder="الوصف" id=""></textarea>
    
    </div>
    )
} 