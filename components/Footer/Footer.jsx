import { useRouter } from "next/router";

import CustomButton from "../CustomButton";
import { useIconHook } from "../../hooks/iconHook";

export default function Footer(props) {
  const logo = useIconHook("logo");
  const facebook = useIconHook("facebook");
  const instagram = useIconHook("instagram");
  const viber = useIconHook("viber");
  const pin = useIconHook("mapPin");
  const phone = useIconHook("phone");

  const router = useRouter();

  return (
    <footer className="p-4 flex justify-between flex-wrap bg-footer text-white">
      <div
        onClick={() => router.push("/")}
        className="w-1/4 flex content-center justify-center cursor-pointer"
      >
        <div className="">
          <CustomButton
            classNames={
              "border-2 mt-4 py-2 border-white rounded-full font-extrabold"
            }
            size={12}
            view={24}
            icon={logo}
          />
          <span className="font-semibold text-xl tracking-tight">AppyGo</span>
        </div>
        <p className="ml-2 p-2 text-justify">
          Affordable brand-new and branded computer parts for any purpose,
          whether for schools, offices and gaming. Aims to provide top notch
          services to customer.
        </p>
      </div>
      <div className="w-1/4">
        <h3 className="font-bold">Logistics</h3>
        <div className="mb-2 flex flex-wrap content-center items-center">
          <img className="h-16 w-40 mr-2" src="/logistics/dailyoverland.png" />
          <img className="h-16 w-40 mr-2" src="/logistics/prieto.webp" />
          <img className="h-16 w-20" src="/logistics/capex.webp" />
          <img className="h-16 w-20" src="/logistics/srbcargo.webp" />
          <img className="h-16 w-16" src="/logistics/mabuhaypadala.bmp" />
        </div>
        <h3 className="font-bold">Payments</h3>
        <div className="mb-2 flex flex-wrap content-center items-center">
          <img className="w-20 mr-2 mb-2" src="/payment/paypal.bmp" />
          <img className="w-20 mr-2 mb-2" src="/payment/visa.bmp" />
          <img className="w-20 mr-2 mb-2" src="/payment/mastercard.bmp" />
          <img className="w-20 mr-2 mb-2" src="/payment/palawan.bmp" />
          <img className="w-20 mr-2 mb-2" src="/payment/lbc.bmp" />
          <img className="w-20 mr-2 mb-2" src="/payment/cebuana.bmp" />
        </div>
      </div>
      <div className="w-1/4">
        <div className="flex">
          <CustomButton
            classNames={"pt-1 w-8 h-8"}
            size={5}
            view={24}
            icon={phone}
          />
          <p>+63 97777 245 17 (Globe)</p>
        </div>
        <div className="flex">
          <CustomButton
            classNames={"pt-1 w-8 h-8"}
            size={5}
            view={24}
            icon={pin}
          />
          <p>85 Diego Cera Ave. Las Pinas City</p>
        </div>
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d482.88017412593075!2d120.98273742494648!3d14.4823126537737!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3397cdd4139e57f9%3A0xe3cbb6df558a4017!2sRhaul%20Villanueva!5e0!3m2!1sen!2sph!4v1597296641506!5m2!1sen!2sph"
          frameBorder="0"
          style={{ border: 0 }}
          allowFullScreen=""
          aria-hidden="false"
          tabIndex="0"
        ></iframe>
        <h6 className="font-bold">Find us on:</h6>
        <div className="flex">
          <div>
            <CustomButton
              classNames={
                "mr-2 pt-1 w-8 h-8 border-2 border-white rounded-full"
              }
              size={5}
              view={24}
              icon={facebook}
            />
          </div>
          <CustomButton
            classNames={"mr-2 pt-1 w-8 h-8 border-2 border-white rounded-full"}
            size={5}
            view={24}
            icon={instagram}
          />
          <CustomButton
            classNames={"mr-2 pt-1 w-8 h-8 border-2 border-white rounded-full"}
            size={5}
            view={24}
            icon={viber}
          />
        </div>
      </div>
    </footer>
  );
}
