import MainLayout from "../layouts/MainLayout";
import { useCarouselHook } from "../hooks/carouselHook";
import { useEffect, useCallback, useState } from "react";
import CustomButton from "../components/CustomButton";
import { useIconHook } from "../hooks/iconHook";

export default () => {
  const slides = useCarouselHook();
  const setIcon = useIconHook("set");
  const memoryIcon = useIconHook("memory");
  const gpuIcon = useIconHook("gpu");
  const motherboardIcon = useIconHook("motherboard");
  const cpuIcon = useIconHook("cpu");
  const storageIcon = useIconHook("storage");
  const psuIcon = useIconHook("psu");
  const coolerIcon = useIconHook("cooler");
  const regulatorIcon = useIconHook("avr");
  const caseIcon = useIconHook("case");
  const keyboardIcon = useIconHook("keyboard");
  const mouseIcon = useIconHook("mouse");
  const monitorIcon = useIconHook("monitor");
  const accessoriesIcon = useIconHook("accessories");
  const printerIcon = useIconHook("printer");

  const [carouselStatus, setCarouselStatus] = useState(null);

  useEffect(() => {
    if (slides) {
      setCarouselStatus({ current: 0, next: 1, prev: slides.length - 1 });
    }
  }, [slides]);

  useEffect(() => {
    if (carouselStatus) console.log(slides[carouselStatus.current]);
  }, [carouselStatus]);

  const nextSlide = useCallback(async (status, length) => {
    let _current = await getNext(status.current, length);
    let _next = await getNext(status.next, length);
    let _prev = await getNext(status.prev, length);

    setCarouselStatus({ current: _current, next: _next, prev: _prev });
  }, []);

  const prevSlide = useCallback(async (status, length) => {
    let _current = await getPrevious(status.current, length);
    let _next = await getPrevious(status.next, length);
    let _prev = await getPrevious(status.prev, length);

    setCarouselStatus({ current: _current, next: _next, prev: _prev });
  });

  const toSlide = useCallback(async (slide, length) => {
    console.log(`slide: ${slide} lenght: ${length}`);
    let _next = await getNext(slide, length);
    let _prev = await getNext(slide, length);

    setCarouselStatus({ current: slide, next: _next, prev: _prev });
    console.log({ current: slide, next: _next, prev: _prev });
  });

  const getNext = (value, length) => {
    return new Promise((resolve, reject) => {
      if (value < length) resolve(value + 1);
      else resolve(0);
    });
  };

  const getPrevious = (value, length) => {
    return new Promise((resolve, reject) => {
      if (value - 1 == -1) resolve(length);
      else resolve(value - 1);
    });
  };

  return (
    <MainLayout>
      <div className="relative bg-white">
        <div className="relative overflow-hidden w-full">
          <div className="bg-teal-200" style={{ height: "50vh" }}>
            {carouselStatus != null && slides[carouselStatus.current].header}
          </div>
        </div>
        <ol className="absolute flex bottom-0 justify-center text-white w-full">
          {slides &&
            slides.map((elm, index) => {
              return (
                <li
                  key={index}
                  className={
                    carouselStatus && carouselStatus.current == index
                      ? "cursor-default mr-3 text-3xl text-red-400 "
                      : "cursor-pointer mr-3 text-3xl"
                  }
                  onClick={() => {
                    carouselStatus.current != index &&
                      toSlide(index, slides.length - 1);
                  }}
                >
                  •
                </li>
              );
            })}
        </ol>
        <a
          className="absolute top-0 bottom-0 left-0 justify-center items-center flex"
          onClick={() => prevSlide(carouselStatus, slides.length - 1)}
        >
          <span className="w-10 h-10 ml-2 md:ml-10 cursor-pointer text-3xl font-bold text-black hover:text-white rounded-full bg-white hover:bg-blue-700 leading-tight text-center">
            ‹
          </span>
        </a>
        <a
          className="absolute top-0 bottom-0 right-0 justify-center items-center flex"
          onClick={() => nextSlide(carouselStatus, slides.length - 1)}
        >
          <span className="w-10 h-10 mr-2 md:mr-10 cursor-pointer text-3xl font-bold text-black hover:text-white rounded-full bg-white hover:bg-blue-700 leading-tight text-center">
            ›
          </span>
        </a>
      </div>
      <div className="h-32 bg-gray-200 shadow-xl flex flex-wrap items-center content-center justify-center">
        <div className="m-auto">
          <div className="px-3 py-2">
            <CustomButton
              classNames="rounded-full border border-black p-2"
              icon={setIcon}
              size={10}
              view={24}
            />
          </div>
          <p class="w-full text-center">Set</p>
        </div>
        <div className="m-auto">
          <div className="px-3 py-2">
            <CustomButton
              classNames="rounded-full border border-black p-2"
              icon={memoryIcon}
              size={10}
              view={24}
            />
          </div>
          <p class="w-full text-center">RAM</p>
        </div>
        <div className="m-auto">
          <div className="px-3 py-2">
            <CustomButton
              classNames="rounded-full border border-black p-2"
              icon={gpuIcon}
              size={10}
              view={24}
            />
          </div>
          <p class="w-full text-center">GPU</p>
        </div>
        <div className="m-auto">
          <div className="px-5 py-2">
            <CustomButton
              classNames="rounded-full border border-black p-2"
              icon={motherboardIcon}
              size={10}
              view={24}
            />
          </div>
          <p class="w-full text-center">M. Board</p>
        </div>
        <div className="m-auto">
          <div className="px-3 py-2">
            <CustomButton
              classNames="rounded-full border border-black p-2"
              icon={cpuIcon}
              size={10}
              view={24}
            />
          </div>
          <p class="w-full text-center">CPU</p>
        </div>
        <div className="m-auto">
          <div className="px-3 py-2">
            <CustomButton
              classNames="rounded-full border border-black p-2"
              icon={storageIcon}
              size={10}
              view={24}
            />
          </div>
          <p class="w-full text-center">Storage</p>
        </div>
        <div className="m-auto">
          <div className="px-3 py-2">
            <CustomButton
              classNames="rounded-full border border-black p-2"
              icon={psuIcon}
              size={10}
              view={24}
            />
          </div>
          <p class="w-full text-center">PSU</p>
        </div>
        <div className="m-auto">
          <div className="px-3 py-2">
            <CustomButton
              classNames="rounded-full border border-black p-2"
              icon={coolerIcon}
              size={10}
              view={24}
            />
          </div>
          <p class="w-full text-center">Cooler</p>
        </div>
        <div className="m-auto">
          <div className="px-3 py-2">
            <CustomButton
              classNames="rounded-full border border-black p-2"
              icon={regulatorIcon}
              size={10}
              view={24}
            />
          </div>
          <p class="w-full text-center">Regulator</p>
        </div>
        <div className="m-auto">
          <div className="px-3 py-2">
            <CustomButton
              classNames="rounded-full border border-black p-2"
              icon={caseIcon}
              size={10}
              view={24}
            />
          </div>
          <p class="w-full text-center">Case</p>
        </div>
        <div className="m-auto">
          <div className="px-3 py-2">
            <CustomButton
              classNames="rounded-full border border-black p-2"
              icon={keyboardIcon}
              size={10}
              view={24}
            />
          </div>
          <p class="w-full text-center">Keyboard</p>
        </div>
        <div className="m-auto">
          <div className="px-3 py-2">
            <CustomButton
              classNames="rounded-full border border-black p-2"
              icon={mouseIcon}
              size={10}
              view={24}
            />
          </div>
          <p class="w-full text-center">Mouse</p>
        </div>
        <div className="m-auto">
          <div className="px-3 py-2">
            <CustomButton
              classNames="rounded-full border border-black p-2"
              icon={monitorIcon}
              size={10}
              view={24}
            />
          </div>
          <p class="w-full text-center">Monitor</p>
        </div>
        <div className="m-auto">
          <div className="px-3 py-2">
            <CustomButton
              classNames="rounded-full border border-black p-2"
              icon={accessoriesIcon}
              size={10}
              view={24}
            />
          </div>
          <p class="w-full text-center">Accrs.</p>
        </div>
        <div className="m-auto">
          <div className="px-3 py-2">
            <CustomButton
              classNames="rounded-full border border-black p-2"
              icon={printerIcon}
              size={10}
              view={24}
            />
          </div>
          <p class="w-full text-center">Printer</p>
        </div>
      </div>
    </MainLayout>
  );
};
