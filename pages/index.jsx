import MainLayout from "../layouts/MainLayout"
import { useCarouselHook } from '../hooks/carouselHook'
import { useEffect, useCallback, useState } from "react";
import next from "next";

export default () => {
  const slides = useCarouselHook();
  const [carouselStatus, setCarouselStatus] = useState(null)

  useEffect(() => {
    if (slides) {
      setCarouselStatus({ current: 0, next: 1, prev: slides.length - 1 });
    }
  }, [slides]);

  useEffect(() => {
    if (carouselStatus)
      console.log(slides[carouselStatus.current]);
  }, [carouselStatus]);

  const nextSlide = useCallback(
    async (status, length) => {
      let _current = await getNext(status.current, length);
      let _next = await getNext(status.next, length);
      let _prev = await getNext(status.prev, length);

      setCarouselStatus({ current: _current, next: _next, prev: _prev });
    }, []
  );

  const prevSlide = useCallback(
    async (status, length) => {
      let _current = await getPrevious(status.current, length);
      let _next = await getPrevious(status.next, length);
      let _prev = await getPrevious(status.prev, length);

      setCarouselStatus({ current: _current, next: _next, prev: _prev });
    }
  )

  const toSlide = useCallback(
    async (slide, length) => {
      console.log(`slide: ${slide} lenght: ${length}`);
      let _next = await getNext(slide, length);
      let _prev = await getNext(slide, length);

      setCarouselStatus({ current: slide, next: _next, prev: _prev });
      console.log({ current: slide, next: _next, prev: _prev });
    }
  );

  const getNext = (value, length) => {
    return new Promise((resolve, reject) => {
      if (value < length)
        resolve(value + 1)
      else
        resolve(0);
    })
  }

  const getPrevious = (value, length) => {
    return new Promise((resolve, reject) => {
      if (value - 1 == -1)
        resolve(length)
      else
        resolve(value - 1)
    })
  }

  return (
    <MainLayout>
      <div className="relativebg-white">
        <div className="relative overflow-hidden w-full">
          <div className="bg-teal-200" style={{ height: '50vh' }}>
            {carouselStatus != null && slides[carouselStatus.current].header}
          </div>
        </div>
        <ol className="absolute flex bottom-0 justify-center text-white w-full">
          {
            slides && slides.map((elm, index) => {
              return <li key={index} className={carouselStatus && carouselStatus.current == index ? 'cursor-default mr-3 text-3xl text-red-400 ' : 'cursor-pointer mr-3 text-3xl'} onClick={() => { carouselStatus.current != index && toSlide(index, slides.length - 1) }}>
                •
              </li>
            })
          }
        </ol>
        <a className="absolute top-0 bottom-0 left-0 justify-center items-center flex" onClick={() => prevSlide(carouselStatus, slides.length - 1)} >
          <span className="w-10 h-10 ml-2 md:ml-10 cursor-pointer text-3xl font-bold text-black hover:text-white rounded-full bg-white hover:bg-blue-700 leading-tight text-center">‹</span>
        </a>
        <a className="absolute top-0 bottom-0 right-0 justify-center items-center flex" onClick={() => nextSlide(carouselStatus, slides.length - 1)} >
          <span className="w-10 h-10 mr-2 md:mr-10 cursor-pointer text-3xl font-bold text-black hover:text-white rounded-full bg-white hover:bg-blue-700 leading-tight text-center">›</span>
        </a>
      </div>
      <div className="w-full h-32 bg-gray-200 shadow-xl flex">
        <svg
          className="fill-current h-10 w-10 m-auto"
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
        >
          <path d="M 20.1 16.1 c -0.6 0 -1.1 0.6 -1.1 1.3 s 0.5 1.3 1.1 1.3 c 0.6 0 1.1 -0.6 1.1 -1.3 S 20.7 16.1 20.1 16.1 Z M 20.1 17.9 c -0.2 0 -0.4 -0.2 -0.4 -0.4 c 0 -0.2 0.2 -0.4 0.4 -0.4 c 0.2 0 0.4 0.2 0.4 0.4 C 20.5 17.7 20.3 17.9 20.1 17.9 Z M 23.3 3.9 h -6.5 c -0.2 0 -0.4 0.2 -0.4 0.4 v 15.8 c 0 0.2 0.2 0.4 0.4 0.4 h 6.5 c 0.2 0 0.4 -0.2 0.4 -0.4 V 4.3 C 23.7 4.1 23.5 3.9 23.3 3.9 Z M 22.9 19.6 h -5.7 V 4.8 h 5.7 V 19.6 Z M 18.1 7.1 h 3.7 c 0.2 0 0.4 -0.2 0.4 -0.4 c 0 -0.2 -0.2 -0.4 -0.4 -0.4 h -3.7 c -0.2 0 -0.4 0.2 -0.4 0.4 C 17.7 6.9 17.9 7.1 18.1 7.1 Z M 18.1 9.4 h 3.7 c 0.2 0 0.4 -0.2 0.4 -0.4 S 22 8.6 21.8 8.6 h -3.7 c -0.2 0 -0.4 0.2 -0.4 0.4 S 17.9 9.4 18.1 9.4 Z M 13.9 3.9 H 2.2 c -1 0 -1.9 1 -1.9 2.2 v 9.6 c 0 1.2 0.8 2.2 1.9 2.2 h 4 v 1.8 H 4.3 c -0.2 0 -0.4 0.2 -0.4 0.4 c 0 0.2 0.2 0.4 0.4 0.4 h 7.4 c 0.2 0 0.4 -0.2 0.4 -0.4 c 0 -0.2 -0.2 -0.4 -0.4 -0.4 H 9.9 v -1.8 h 4 c 1 0 1.9 -1 1.9 -2.2 V 6.1 C 15.7 4.9 14.9 3.9 13.9 3.9 Z M 9.2 19.6 H 6.9 v -1.8 h 2.2 V 19.6 Z M 15 14.7 h -1.6 c -0.2 0 -0.4 0.2 -0.4 0.4 c 0 0.2 0.2 0.4 0.4 0.4 H 15 v 0.1 c 0 0.7 -0.5 1.3 -1.1 1.3 H 2.2 c -0.6 0 -1.1 -0.6 -1.1 -1.3 v -0.1 h 10.8 c 0.2 0 0.4 -0.2 0.4 -0.4 c 0 -0.2 -0.2 -0.4 -0.4 -0.4 H 1.1 V 6.1 c 0 -0.7 0.5 -1.3 1.1 -1.3 h 11.7 c 0.6 0 1.1 0.6 1.1 1.3 V 14.7 Z" />

        </svg>
        <svg
          className="fill-current h-10 w-10 m-auto"
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
        >
          <path d="M5.7,6.2H2.6c-0.3,0-0.5,0.3-0.5,0.6v6.5c0,0.4,0.2,0.6,0.5,0.6h3.1c0.3,0,0.5-0.3,0.5-0.6V6.8C6.3,6.5,6,6.2,5.7,6.2z   M5.2,12.7H3.1V7.5h2.1V12.7z M7.8,19.1c-0.3,0-0.5-0.3-0.5-0.6v-1.3c0-0.4,0.2-0.6,0.5-0.6c0.3,0,0.5,0.3,0.5,0.6v1.3  C8.4,18.8,8.1,19.1,7.8,19.1z M12,19.1c-0.3,0-0.5-0.3-0.5-0.6v-1.3c0-0.4,0.2-0.6,0.5-0.6c0.3,0,0.5,0.3,0.5,0.6v1.3  C12.5,18.8,12.3,19.1,12,19.1z M14.1,19.1c-0.3,0-0.5-0.3-0.5-0.6v-1.3c0-0.4,0.2-0.6,0.5-0.6c0.3,0,0.5,0.3,0.5,0.6v1.3  C14.6,18.8,14.4,19.1,14.1,19.1z M5.7,19.1c-0.3,0-0.5-0.3-0.5-0.6v-1.3c0-0.4,0.2-0.6,0.5-0.6c0.3,0,0.5,0.3,0.5,0.6v1.3  C6.3,18.8,6,19.1,5.7,19.1z M16.2,19.1c-0.3,0-0.5-0.3-0.5-0.6v-1.3c0-0.4,0.2-0.6,0.5-0.6c0.3,0,0.5,0.3,0.5,0.6v1.3  C16.7,18.8,16.5,19.1,16.2,19.1z M3.7,19.1c-0.3,0-0.5-0.3-0.5-0.6v-1.3c0-0.4,0.2-0.6,0.5-0.6c0.3,0,0.5,0.3,0.5,0.6v1.3  C4.2,18.8,3.9,19.1,3.7,19.1z M9.9,19.1c-0.3,0-0.5-0.3-0.5-0.6v-1.3c0-0.4,0.2-0.6,0.5-0.6c0.3,0,0.5,0.3,0.5,0.6v1.3  C10.4,18.8,10.2,19.1,9.9,19.1z M18.3,19.1c-0.3,0-0.5-0.3-0.5-0.6v-1.3c0-0.4,0.2-0.6,0.5-0.6c0.3,0,0.5,0.3,0.5,0.6v1.3  C18.8,18.8,18.6,19.1,18.3,19.1z M23.5,3.6h-23C0.2,3.6,0,3.9,0,4.2v11.7c0,0.4,0.2,0.6,0.5,0.6H1v3.2c0,0.4,0.2,0.6,0.5,0.6h20.9  c0.3,0,0.5-0.3,0.5-0.6v-3.2h0.5c0.3,0,0.5-0.3,0.5-0.6V4.2C24,3.9,23.8,3.6,23.5,3.6z M21.9,19.1L21.9,19.1h-1.6h-2.1h-2.1h-2.1H12  H9.9H7.8H5.7H3.7H2.1v-2.6h1.6h2.1h2.1h2.1H12h2.1h2.1h2.1h2.1h1.6V19.1z M22.5,15.2H1.6H1V4.9H23v10.4H22.5z M20.4,19.1  c-0.3,0-0.5-0.3-0.5-0.6v-1.3c0-0.4,0.2-0.6,0.5-0.6c0.3,0,0.5,0.3,0.5,0.6v1.3C20.9,18.8,20.6,19.1,20.4,19.1z M21.4,6.2h-3.1  c-0.3,0-0.5,0.3-0.5,0.6v6.5c0,0.4,0.2,0.6,0.5,0.6h3.1c0.3,0,0.5-0.3,0.5-0.6V6.8C21.9,6.5,21.7,6.2,21.4,6.2z M20.9,12.7h-2.1V7.5  h2.1V12.7z M11,6.2H7.8c-0.3,0-0.5,0.3-0.5,0.6v6.5c0,0.4,0.2,0.6,0.5,0.6H11c0.3,0,0.5-0.3,0.5-0.6V6.8C11.5,6.5,11.3,6.2,11,6.2z   M10.4,12.7H8.4V7.5h2.1V12.7z M16.2,6.2h-3.1c-0.3,0-0.5,0.3-0.5,0.6v6.5c0,0.4,0.2,0.6,0.5,0.6h3.1c0.3,0,0.5-0.3,0.5-0.6V6.8  C16.7,6.5,16.5,6.2,16.2,6.2z M15.7,12.7h-2.1V7.5h2.1V12.7z" />

        </svg>

      </div>
    </MainLayout >
  );
}

