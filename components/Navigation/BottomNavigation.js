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
          <a className="block py-2 px-4">Accessories</a>
        </div>
      </div>
      <div className="py-2 px-4 text-teal-400">Set</div>
      <div className="py-2 px-4 text-teal-400">Laptop</div>
      <Link href="/motherboard">
        <a className="py-2 px-4 text-teal-400">Motherboard</a>
      </Link>

      <div className="py-2 px-4 text-teal-400">Processor</div>
      <Link href="/ram">
        <a className="py-2 px-4 text-teal-400">Memory</a>
      </Link>

      <div className="py-2 px-4 text-teal-400">Storage</div>
      <div className="py-2 px-4 text-teal-400">Video Card</div>
      <div className="py-2 px-4 text-teal-400">Power Supply</div>
      <div className="py-2 px-4 text-teal-400">Cooler</div>
      <div className="py-2 px-4 text-teal-400">Case</div>
      <div className="py-2 px-4 text-teal-400">Monitor</div>
    </div>
  );
}

export default BottomNavigation;
