const { default: MainLayout } = require("../layouts/MainLayout");
import { useIconHook } from "../hooks/iconHook";
import CustomButton from "../components/CustomButton";

const About = (props) => {
  const clock = useIconHook("clock");
  const phone = useIconHook("phone");
  const mail = useIconHook("mail");
  const map = useIconHook("mapPin");

  const facebook = useIconHook("facebook");
  const instagram = useIconHook("instagram");
  const viber = useIconHook("viber");

  return (
    <MainLayout>
      <br />
      <div className="mx-12 pb-6 text-center border border-teal-200">
        {" "}
        <h1 className="py-2 bg-teal-400 border-b border-teal-500 text-white text-2xl font-bold">
          Who we are?
        </h1>
        <br />
        <p className="px-32 text-justify indent-4">
          Adrian Manuel Cleofe was once a computer technician in a small town in
          Albay when he was in highschool. He do troubleshoot computer even
          mobile phone in the people of Tiwi. He got into the business in
          troubleshooting when his friend who own a computer rental shop
          approach him to maintain its rental pc and then customer come in ask
          to troubleshoot their pc, since then customer come and go and happy
          for its affordable labor price. In 2010, Adrian move here in Las Piñas
          to take college degree, where he gain a Bachelor's of Science in
          Computer Science at STI College Las Piñas, then he was able to same
          money to start a shop. He build AppyGo Computer Store to make its
          service affordable on customer budget. We also ensure that every
          product is brand-new and warranty is direct from manufacturers.
        </p>
      </div>
      <br />
      <div className="mx-12 pb-6 text-center border border-teal-200">
        {" "}
        <h1 className="py-2 bg-teal-400 border-b border-teal-500 text-white text-2xl font-bold">
          What we do?
        </h1>
        <br />
        <p class="px-32 text-justify indent-4">
          Computer services is our specialty from selling computer component and
          peripheral, aside from selling we cater repair and troubleshooting and
          software development or as long as customer request is in personnel
          extent of its knowledge. <br /> <br />
        </p>
        <span className="text-center">
          We also offer remittance, bill payment and mobile load.
        </span>
      </div>
      <br />
      <div className="mx-12 pb-6 text-center border border-teal-200">
        <h1 className="py-2 bg-teal-400 border-b border-teal-500 text-white text-2xl font-bold">
          How can we be contact?
        </h1>
        <div className="flex p-8 w-full m-auto justify-between">
          <div>
            <svg
              class="fill-current h-20 w-20 m-auto p-3 bg-teal-500 rounded-full text-white"
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
            >
              <path d={clock}></path>
            </svg>
            <h3 className="text-gray-700 text-xl font-bold">Store Hours</h3>
            <p>Mon-Sun</p>
            <p> 7:00 AM - 11:30 PM</p>
          </div>
          <div>
            <svg
              class="fill-current h-20 w-20 m-auto p-3 bg-teal-500 rounded-full text-white"
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
            >
              <path d={phone}></path>
            </svg>
            <h3 className="text-gray-700 text-xl font-bold">Contact Numbers</h3>
            <p>09777724517 (Globe)</p>
          </div>
          <div>
            <svg
              class="fill-current h-20 w-20 m-auto p-3 bg-teal-500 rounded-full text-white"
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
            >
              <path d={mail}></path>
            </svg>
            <h3 className="text-gray-700 text-xl font-bold">Email Address</h3>
            <p>appygostore@gmail.com</p>
          </div>
          <div>
            <svg
              class="fill-current h-20 w-20 m-auto p-3 bg-teal-500 rounded-full text-white overflow-visible"
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
            >
              <path d={map}></path>
            </svg>
            <h3 className="text-gray-700 text-xl font-bold">Address</h3>
            <p>
              88B Real Street, Diego Ciera Avenue, <br />
              Manuyo Uno, Las Piñas City
            </p>
          </div>
        </div>
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d482.88017412593075!2d120.98273742494648!3d14.4823126537737!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3397cdd4139e57f9%3A0xe3cbb6df558a4017!2sRhaul%20Villanueva!5e0!3m2!1sen!2sph!4v1597296641506!5m2!1sen!2sph"
          frameBorder="0"
          className="border-none w-full h-auto px-8"
          allowFullScreen=""
          aria-hidden="false"
          tabIndex="0"
        ></iframe>
        <br />
        <h3 className="text-left text-gray-700 text-2xl font-bold px-8">
          Follow us on:
        </h3>
        <div className="text-left px-8">
          <svg
            class="inline-block fill-current h-12 w-12 mr-2 p-3 bg-teal-500 rounded-full text-white overflow-visible"
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
          >
            <path d={facebook}></path>
          </svg>
          <svg
            class="inline-block fill-current h-12 w-12 mr-2 p-3 bg-teal-500 rounded-full text-white overflow-visible"
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
          >
            <path d={instagram}></path>
          </svg>
          <svg
            class="inline-block fill-current h-12 w-12 mr-2 p-3 bg-teal-500 rounded-full text-white overflow-visible"
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
          >
            <path d={viber}></path>
          </svg>
        </div>
      </div>
      <br />
    </MainLayout>
  );
};

export default About;
