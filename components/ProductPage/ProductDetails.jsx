import { AddToCart } from "../../../../redux/actions/CartAction";
import { useDispatch } from "react-redux";

const SpecificationSection = (props) => {
  const { product, filters } = props;

  return (
    <>
      <h4 className="text-xl font-bold">Specification</h4>
      <ul>
        <br />
        {filters.map((elm, index) => {
          return (
            <li className="capitalize ml-2" key={index}>
              <span className="mr-2 font-bold">{`${elm.table}:`}</span>
              {` ${product[elm.table]}`}
            </li>
          );
        })}
      </ul>
    </>
  );
};

const 

export default function ProductDetails(props) {
  const { product, filters } = props;

  const dispatach = useDispatch();
  const cartIcon = useIconHook("cart");

  const [quantity, setQuantity] = useState(1);

  return (
    <div className="w-1/2 border border-teal-400">
      <div className="w-full px-10 border-teal-400 border-b bg-teal-400 text-white">
        <h3 className="font-bold text-3xl">{product["name"]}</h3>
      </div>
      <br />
      <div className="px-10">
        <SpecificationSection product={product} filters={filters} />
        {/* <h4 className="text-xl font-bold">Specification</h4>
        <ul>
          <br />
          {props.filters.map((elm, index) => {
            return (
              <li className="capitalize ml-2" key={index}>
                <span className="mr-2 font-bold">{`${elm.table}:`}</span>
                {` ${props.product[elm.table]}`}
              </li>
            );
          })}
        </ul> */}
        <br />
        <h3 className="text-xl font-bold">
          Price: &#8369;{product["price"].toFixed(2)}
        </h3>
        <br />
        <div className="flex items-center">
          <p className="font-bold mr-2">Quantity: </p>
          <input
            className="w-16 h-8 px-2 mr-2 border border-gray-500"
            type="text"
            value={quantity}
            onChange={(e) => {
              setQuantity(e.target.value);
            }}
          />
          <div
            className="flex items-center border border-teal-300 cursor-pointer"
            onClick={(e) => {
              dispatach(AddToCart(true, quantity, product));
            }}
          >
            {" "}
            <CustomButton
              classNames="flex w-12 h-8 p-full bg-teal-300 text-white cursor-pointer"
              size="5"
              view="20"
              icon={cartIcon}
              data={product}
            />
            <span className="text-teal-400 mx-2">Add To Cart</span>
          </div>
        </div>
      </div>
    </div>
  );
}
