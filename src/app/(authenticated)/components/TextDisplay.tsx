const TextDisplay = ({ text }: { text: string }) => {
  return (
    
    <div className="flex min-h-screen justify-center items-center bg-black text-red-500 text-4xl">
      {text}
    </div>
  );
}
 
export default TextDisplay