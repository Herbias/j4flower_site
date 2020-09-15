import { useState, useEffect } from "react";
import { useLoginHook } from "../hooks/loginHook";
import { useDispatch } from "react-redux";

import { DoLogin } from "../redux/actions/UserAction";

export default function Login(props) {
  const dispatch = useDispatch();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [makeLogin, setMakeLogin] = useState(false);
  const [loading, userInfo] = useLoginHook(
    makeLogin ? { username, password } : null
  );

  useEffect(() => {
    if (userInfo) {
      dispatch(DoLogin(true, userInfo));
    }
  }, [userInfo]);

  return (
    <>
      {" "}
      <div className="p-2">
        <form>
          <label>Username</label>
          <br />
          <input
            className="w-full border"
            type="text"
            defaultValue={username}
            onChange={(e) => {
              setUsername(e.target.value);
            }}
          />
          <label>Password</label>
          <br />
          <input
            className="w-full border"
            type="password"
            defaultValue={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
        </form>
      </div>
      <button
        onClick={() => {
          setMakeLogin(true);
        }}
        className="float-right text-white font-bold p-2 mx-6 bg-teal-400"
      >
        Login
      </button>
    </>
  );
}
