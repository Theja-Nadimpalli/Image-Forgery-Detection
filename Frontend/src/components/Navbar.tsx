
export default function Navbar(){

    return <div className=' bg-gray-50 px-20 flex justify-between text-black drop-shadow-md '> 
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