import Bots from './Bots'

export default function Userpage(){
    return(
        <div className="container min-h-screen max-w-7xl my-auto mx-auto p-8 bg-base-300 border border-[#38bdf8] shadow-lg">
            <h1 className="text-3xl font-bold mb-4 text-white">Admin</h1>
            <hr className='text-[#38bdf8] '></hr>
            <Bots/>
        </div>
    );
}