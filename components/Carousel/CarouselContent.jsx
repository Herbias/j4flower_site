const CarouselContent = (props) => {
  const { slide } = props;
  return (
    <div className="relative overflow-hidden w-full">
      {slide && (
        <div
          className="bg-teal-200"
          style={{
            height: "50vh",
            background: `url(${slide.image}) no-repeat center`,
            backgroundSize: "contain",
          }}
        >
          {slide && slide.header}
        </div>
      )}
    </div>
  );
};
export default React.memo(CarouselContent);
