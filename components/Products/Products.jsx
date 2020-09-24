import ProductCard from "./ProductCard";

const Product = (props) => {
  const { selected, products } = props;
  return (
    <div className="h-1/2 flex flex-wrap p-5 relative">
      {products &&
        products.map((elm, index) => {
          return (
            <ProductCard
              data={elm}
              image={elm.image}
              name={elm.name}
              price={elm.price}
              index={index}
              key={index}
            />
          );
        })}
    </div>
  );
};

export default React.memo(Product);
