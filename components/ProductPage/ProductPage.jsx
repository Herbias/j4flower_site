import ProductPage from "../../pages/shop/[category]/[name]/[id]";
import ProductDetails from "./ProductDetails";

const ImageSection = (props) => {
  const { image } = props;
  return (
    <div className="w-1/2 p-10">
      <img src={`/product/${image}`} />
    </div>
  );
};

export default function ProductPage(props) {
  const { product, filters } = props;
  return (
    <div className="flex m-10">
      {/* <ImageSection image={product[image]} /> */}
      {/* <ProductDetails product={product} filters={filters} /> */}
    </div>
  );
}
