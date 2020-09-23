import Link from "next/link";

function BottomNavigation({ props }) {
  return (
    <div className="flex justify-start items-center w-full px-6 border-t border-b border-teal-400 bg-white text-black">
      <div className="dropdown-button py-2 px-4 bg-teal-400 font-semibold text-xl text-white">
        More
        <div className="dropdown-content absolute z-10 float-left w-auto h-auto mt-2 -mb-2 -ml-4 bg-white text-md text-teal-500 font-normal border border-teal-300">
          <a className="block py-2 px-4 border-b border-teal-300">Keyboard</a>
          <a className="block py-2 px-4 border-b border-teal-300">Mouse</a>
          <a className="block py-2 px-4 border-b border-teal-300">
            Voltage Regulator
          </a>
          <a className="block py-2 px-4 border-b border-teal-300">Printer</a>
          <a className="block py-2 border-b border-teal-300 px-4">
            Accessories
          </a>
          <div className="cctv-dropdown block py-2 px-4 relative">
            <span>CCTV</span>
            <div className="cctv-dropdown-content w-full float-right -mt-0 ml-48 absolute top-0 left-0 bg-white text-md text-teal-500 font-normal border border-teal-300">
              <Link href="/shop/cctvkit/">
                <a className="block py-2 px-4 border-b border-teal-300">Kit</a>
              </Link>
              <Link href="/shop/cctvcamera/">
                <a className="block py-2 px-4 border-b border-teal-300">
                  Camera
                </a>
              </Link>
              <Link href="/shop/cctvvideorecorder/">
                <a className="block py-2 px-4 border-b border-teal-300">
                  Video Recorder
                </a>
              </Link>
            </div>
          </div>
        </div>
      </div>
      <div className="py-2 px-4 text-teal-400">Set</div>
      <div className="py-2 px-4 text-teal-400">Laptop</div>
      <Link href="/motherboard">
        <a className="py-2 px-4 text-teal-400">Motherboard</a>
      </Link>
      <Link href="/cpu">
        <a className="py-2 px-4 text-teal-400">Processor</a>
      </Link>
      <Link href="/ram">
        <a className="py-2 px-4 text-teal-400">Memory</a>
      </Link>
      <Link href="/storage">
        <a className="py-2 px-4 text-teal-400">Storage</a>
      </Link>
      <Link href="/gpu">
        <a className="py-2 px-4 text-teal-400">Video Card</a>
      </Link>
      <Link href="/psu">
        <a className="py-2 px-4 text-teal-400">Power Supply</a>
      </Link>
      <Link href="/cooler">
        <a className="py-2 px-4 text-teal-400">Cooler</a>
      </Link>
      <Link href="/case">
        <a className="py-2 px-4 text-teal-400">Case</a>
      </Link>
      <Link href="/monitor">
        <div className="py-2 px-4 text-teal-400">Monitor</div>
      </Link>
    </div>
  );
}

export default BottomNavigation;
