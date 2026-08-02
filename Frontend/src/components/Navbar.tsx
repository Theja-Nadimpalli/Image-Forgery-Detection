
export default function Navbar(){

    return <div className='fixed top-0 left-0 w-full z-50 bg-black px-20 flex justify-between text-white border-b-[0.5px] rounded-b-md
    shadow-md shadow-white border-white'> 
      <span className='text-[25px] my-3 font-bold'> 
        Image <span className="text-blue-500">Forgery</span> Detection
      </span>
      <span className='flex items-center'>
          <span className='mx-4 hover:cursor-pointer'>Home</span>
          <span className='mx-4 hover:cursor-pointer'>About</span>
          <span className='mx-4 hover:cursor-pointer'>How it Works</span>
      </span>


  </div>
}