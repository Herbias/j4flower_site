export default function MainLayout(props) {

    return (
        <div className="relative shadow-2xl bg-white">
            <div className="relative overflow-hidden w-full">
                {props.children}
            </div>
            <ol className="absolute flex bottom-0 justify-center text-white w-full">
                <li className='cursor-pointer mr-3 text-3xl text-red-400'>
                    •
                </li>
                <li className='cursor-pointer mr-3 text-3xl'>
                    •
                </li>
                <li className='cursor-pointer mr-3 text-3xl'>
                    •
                </li>
            </ol>
            <a className="absolute top-0 bottom-0 left-0 justify-center items-center flex">
                <span className="w-10 h-10 ml-2 md:ml-10 cursor-pointer text-3xl font-bold text-black hover:text-white rounded-full bg-white hover:bg-blue-700 leading-tight text-center">‹</span>
            </a>
            <a className="absolute top-0 bottom-0 right-0 justify-center items-center flex">
                <span className="w-10 h-10 mr-2 md:mr-10 cursor-pointer text-3xl font-bold text-black hover:text-white rounded-full bg-white hover:bg-blue-700 leading-tight text-center">›</span>
            </a>
        </div>
    );
}