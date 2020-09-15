import { useState, useEffect } from "react";
import fetch from "isomorphic-unfetch";

import { useSelector, useDispatch } from "react-redux";

export const useUpdateQuantity = (data) => {
  const cart = useSelector((state) => state.CartReducer);
  const user = useSelector((state) => state.UserReducer);

  const dispatch = useDispatch;

  const [isLoading, setLoading] = useState(false);
  const [isSuccess, setSuccess] = useState(false);

  useEffect(() => {
    if (data) setLoading(true);
  }, [data]);

  useEffect(() => {
    if (isLoading) {
      data["user"] = user.isLogin
        ? { id: user.data.userid, type: "registered" }
        : { id: localStorage.getItem("guestId"), type: "guest" };
      data["quantity"] = cart.quantity;
      fetch(`http://localhost:3001/update/cart`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          data,
        }),
      })
        .then((res) => {
          try {
            if (res.status == 200) {
              return res.json();
            }
          } catch (err) {
            console.warn(err);
          }
        })
        .then((res) => {
          setSuccess(res);
        });
    }
  }, [isLoading]);

  useEffect(() => {
    console.log(isSuccess);
    if (isSuccess) setLoading(false);
  }, [isSuccess]);

  return [isLoading, isSuccess];
};

// import { useState, useEffect } from "react";
// import fetch from "isomorphic-unfetch";

// import { useSelector, useDispatch } from "react-redux";
// import { ToUpdate } from "../redux/actions/CartAction";

// export const useUpdateQuantity = (data) => {
//   const cart = useSelector((state) => state.CartReducer);
//   const dispatch = useDispatch;

//   const [isLoading, setLoading] = useState(false);
//   const [isSuccess, setSuccess] = useState(false);

//   useEffect(() => {
//     setLoading(true);
//     add();
//   }, [cart]);

//   const add = async () => {
//     if (isLoading && cart.product.name == data.name) {
//       sendRequest(cart.product).then((data) => setSuccess(true));
//       setLoading(false);
//     }
//   };

//   const sendRequest = (data) => {
//     data["user"] = { id: localStorage.getItem("guestId"), type: "guest" };
//     data["quantity"] = cart.quantity > 0 ? cart.quantity : 1;

//     return new Promise((resolve, err) => {
//       fetch(`http://localhost:3001/update/cart`, {
//         method: "PUT",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({
//           data,
//         }),
//       })
//         .then((res) => {
//           try {
//             if (res.status == 200) {
//               return res.json();
//             }
//           } catch (err) {
//             console.warn(err);
//           }
//         })
//         .then((res) => {
//           resolve(res);
//         });
//     });
//   };

//   // if (isLoading && isSuccess) dispatch(ToUpdate(false));

//   return [isLoading, isSuccess];
// };
