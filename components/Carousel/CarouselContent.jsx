const CarouselContent = (props) => {
  const { slide } = props;
  return (
    <div className="relative overflow-hidden w-full">
      <div className="bg-teal-200" style={{ height: "50vh" }}>
        {slide && slide.header}
      </div>
    </div>
  );
};
export default React.memo(CarouselContent);
