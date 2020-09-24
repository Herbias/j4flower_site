import { useCarouselHook } from "../../hooks/carouselHook";
import { useEffect, useCallback, useState } from "react";

import CarouselContent from "./CarouselContent";
import CarouseControl from "./CarouselControl";
import CarouselIndicator from "./CarouselIndicator";

export default function CarouselLayout(props) {
  const slides = useCarouselHook();
  const [carouselStatus, setCarouselStatus] = useState(null);

  useEffect(() => {
    if (slides) {
      setCarouselStatus({ current: 0, next: 1, prev: slides.length - 1 });
    }
  }, [slides]);

  useEffect(() => {
    // if (carouselStatus) console.log(carouselStatus);
  }, [carouselStatus]);

  const nextSlide = useCallback(
    async (status, length) => {
      let _current = await getNext(status.current, length);
      let _next = await getNext(status.next, length);
      let _prev = await getNext(status.prev, length);
      setCarouselStatus({ current: _current, next: _next, prev: _prev });
    },
    [carouselStatus]
  );

  const prevSlide = useCallback(async (status, length) => {
    let _current = await getPrevious(status.current, length);
    let _next = await getPrevious(status.next, length);
    let _prev = await getPrevious(status.prev, length);

    setCarouselStatus({ current: _current, next: _next, prev: _prev });
  });

  const toSlide = useCallback(async (slide, length) => {
    let _next = await getNext(slide, length);
    let _prev = await getNext(slide, length);

    setCarouselStatus({ current: slide, next: _next, prev: _prev });
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
    <div className="relative bg-white">
      {slides && slides.length > 0 && (
        <CarouselContent
          slide={slides && carouselStatus && slides[carouselStatus.current]}
        />
      )}

      <CarouseControl
        status={carouselStatus && carouselStatus}
        length={slides && slides.length}
        next={nextSlide}
        prev={prevSlide}
      />
      <CarouselIndicator
        slides={slides}
        status={carouselStatus}
        goTo={toSlide}
      />
    </div>
  );
}
