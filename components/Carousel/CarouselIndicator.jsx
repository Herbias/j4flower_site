const CarouselIndicator = (props) => {
  const { slides, status, goTo } = props;
  return (
    <>
      <ol className="absolute z-0 flex bottom-0 justify-center text-white w-full">
        {slides &&
          slides.map((elm, index) => {
            return (
              <li
                key={index}
                className={
                  status && status.current == index
                    ? "cursor-default mr-3 text-3xl text-red-400 "
                    : "cursor-pointer mr-3 text-3xl"
                }
                onClick={() => {
                  status.current != index && goTo(index, slides.length - 1);
                }}
              >
                •
              </li>
            );
          })}
      </ol>
    </>
  );
};
export default CarouselIndicator;
