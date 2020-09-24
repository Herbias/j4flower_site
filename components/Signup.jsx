import { useState, useEffect } from "react";
import { useVerifyHook } from "../hooks/verifyHook";
import { useCreateAccountHook } from "../hooks/createAccountHook";
import { useDispatch, useSelector } from "react-redux";

import { DoLogin } from "../redux/actions/UserAction";

const FieldAlert = (props) => {
  return <p className="text-xs text-gray-500">{props.alert}</p>;
};

export default function Signup(props) {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.UserReducer);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [middleName, setMiddleName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [telno, setTelno] = useState("");
  const [phoneno, setPhoneno] = useState("");
  const [address1, setAddress1] = useState("");
  const [address2, setAddress2] = useState("");
  const [city, setCity] = useState("");
  const [province, setProvince] = useState("");
  const [zipcode, setZipCode] = useState("");
  const [disableCreateAccount, setDisableCreateAccount] = useState(true);
  const [createAccount, setCreateAccount] = useState(false);

  const [checkingUsername, validUsername] = useVerifyHook(
    "username",
    username && username != "" ? username : null
  );
  const [checkingEmail, validEmail] = useVerifyHook(
    "email",
    email && email != "" ? email : null
  );

  const [creating, userInfo] = useCreateAccountHook(
    createAccount
      ? {
          username,
          password,
          firstName,
          middleName,
          lastName,
          email,
          telno,
          phoneno,
          address1,
          address2,
          city,
          province,
          zipcode,
        }
      : null
  );

  useEffect(() => {
    if (userInfo && !creating) {
      setCreateAccount(false);
    }

    if (userInfo) dispatch(DoLogin(true, userInfo));
  }, [userInfo]);

  // useEffect(() => {
  //   console.log("mounting");
  // }, []);

  useEffect(() => {
    if (
      username.length >= 5 &&
      validUsername &&
      password == confirmPassword &&
      firstName &&
      middleName &&
      lastName &&
      /^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/.test(email) &&
      validEmail &&
      phoneno.length >= 11 &&
      phoneno.length <= 14 &&
      address1 &&
      address2 &&
      city &&
      province &&
      zipcode
    )
      setDisableCreateAccount(false);
    else setDisableCreateAccount(true);
  }, [
    username,
    password,
    confirmPassword,
    firstName,
    middleName,
    lastName,
    email,
    telno,
    phoneno,
    address1,
    address2,
    city,
    province,
    zipcode,
  ]);

  // useEffect(() => {
  //   if (userInfo) setCreateAccount(false);
  // }, [userInfo]);

  return (
    <>
      <div className="p-2">
        <form>
          <h1 className="text-xl">Account Information</h1>
          <div className="flex">
            <div className="mr-4">
              <label>
                Username <span className="text-red-600">*</span>
              </label>
              <br />
              <input
                defaultValue={username}
                onChange={(e) => {
                  setUsername(e.target.value);
                }}
                className={`pl-2 border ${
                  username.length >= 5 && validUsername
                    ? "border-green-500"
                    : ""
                }${
                  username.length < 5 || !validUsername ? "border-red-500" : ""
                }`}
                type="text"
                name="username"
              />
              {(username.length < 5 || !validUsername) && (
                <FieldAlert
                  alert={`${
                    username.length < 5
                      ? "Username must contain minimum of five character and does not contain space"
                      : ""
                  }${
                    !validUsername && username != ""
                      ? "Username is already taken!"
                      : ""
                  }`}
                />
              )}
            </div>
            <div className="mr-4">
              <label>
                Password <span className="text-red-600">*</span>
              </label>
              <br />
              <input
                defaultValue={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
                className={`pl-2 border ${
                  password.length >= 8 ? "border-green-500" : "border-red-500"
                }`}
                type="password"
                name="password"
              />
              {password.length < 8 && (
                <FieldAlert alert="Password must contain minimum of eight character" />
              )}
            </div>
            <div>
              <label>
                Confirm password <span className="text-red-600">*</span>
              </label>
              <br />
              <input
                defaultValue={confirmPassword}
                onChange={(e) => {
                  setConfirmPassword(e.target.value);
                }}
                className={`pl-2 border ${
                  confirmPassword == password && confirmPassword != ""
                    ? "border-green-500"
                    : "border-red-500"
                }`}
                type="password"
                name="confirmpassword"
              />
              {confirmPassword != password && confirmPassword != "" && (
                <FieldAlert alert="Password must contain minimum of eight character" />
              )}
            </div>
          </div>
          <br />
          <div className="flex">
            <div className="mr-4">
              <label>
                First name <span className="text-red-600">*</span>
              </label>
              <br />
              <input
                defaultValue={firstName}
                onChange={(e) => {
                  setFirstName(e.target.value);
                }}
                className={`pl-2 border ${
                  firstName ? "border-green-500" : "border-red-500"
                }`}
                type="text"
                name="firstname"
              />
              {!firstName && <FieldAlert alert="Required field" />}
            </div>

            <div className="mr-4">
              <label>
                Middle name <span className="text-red-600">*</span>
              </label>
              <br />
              <input
                defaultValue={middleName}
                onChange={(e) => {
                  setMiddleName(e.target.value);
                }}
                className={`pl-2 border ${
                  middleName ? "border-green-500" : "border-red-500"
                }`}
                type="text"
                name="middlename"
              />
              {!middleName && <FieldAlert alert="Required field" />}
            </div>
            <div className="mr-4">
              <label>
                Last name <span className="text-red-600">*</span>
              </label>
              <br />
              <input
                defaultValue={lastName}
                onChange={(e) => {
                  setLastName(e.target.value);
                }}
                className={`pl-2 border ${
                  lastName ? "border-green-500" : "border-red-500"
                }`}
                type="text"
                name="lastname"
              />
              {!lastName && <FieldAlert alert="Required field" />}
            </div>
          </div>
          <br />
          <div className="flex">
            <div className="mr-4">
              <label>
                Email address <span className="text-red-600">*</span>
              </label>
              <br />
              <input
                defaultValue={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
                className={`pl-2 border ${
                  /^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/.test(email) &&
                  validEmail
                    ? "border-green-500"
                    : ""
                }${
                  !/^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/.test(email) ||
                  !validEmail
                    ? "border-red-500"
                    : ""
                }`}
                type="text"
                name="email"
              />
              {(!/^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/.test(email) ||
                !validEmail) && <FieldAlert alert="Invalid email" />}
            </div>
            <div className="mr-4">
              <label>Tel no.</label>
              <br />
              <input
                defaultValue={telno}
                onChange={(e) => {
                  setTelno(e.target.value);
                }}
                className="pl-2 border"
                type="text"
                name="telno"
              />
            </div>
            <div className="mr-4">
              <label>
                Phone no. <span className="text-red-600">*</span>
              </label>
              <br />
              <input
                defaultValue={phoneno}
                onChange={(e) => {
                  setPhoneno(e.target.value);
                }}
                className={`pl-2 border ${
                  phoneno.length >= 11 && phoneno.length <= 14
                    ? "border-green-500"
                    : "border-red-500"
                }`}
                type="text"
                name="phoneno"
              />
              {phoneno.length < 11 && (
                <FieldAlert alert="Invalid phone number" />
              )}
            </div>
          </div>
          <br />
          <h1 className="text-xl">Shipping Information</h1>
          <div className="flex">
            <div className="w-1/2 mr-4">
              <label>
                House No./ Unit and Building Name{" "}
                <span className="text-red-600">*</span>
              </label>
              <br />
              <input
                defaultValue={address1}
                onChange={(e) => {
                  setAddress1(e.target.value);
                }}
                className={`w-full pl-2 border ${
                  address1 ? "border-green-500" : "border-red-500"
                }`}
                type="text"
                name="address1"
              />
              {!address1 && <FieldAlert alert="Required field" />}
            </div>
            <div className="mr-4">
              <label>
                Street
                <span className="text-red-600">*</span>
              </label>
              <br />
              <input
                defaultValue={address2}
                onChange={(e) => {
                  setAddress2(e.target.value);
                }}
                className={`pl-2 border ${
                  address2 ? "border-green-500" : "border-red-500"
                }`}
                type="text"
                name="address2"
              />
              {!address2 && <FieldAlert alert="Required field" />}
            </div>
          </div>
          <br />
          <div className="flex">
            <div className="mr-4">
              <label>
                City/Municipality <span className="text-red-600">*</span>
              </label>
              <br />
              <input
                defaultValue={city}
                onChange={(e) => {
                  setCity(e.target.value);
                }}
                className={`pl-2 border ${
                  city ? "border-green-500" : "border-red-500"
                }`}
                type="text"
                name="city"
              />
              {!city && <FieldAlert alert="Required field" />}
            </div>
            <div className="mr-4">
              <label>
                Provice <span className="text-red-600">*</span>
              </label>
              <br />
              <input
                defaultValue={province}
                onChange={(e) => {
                  setProvince(e.target.value);
                }}
                className={`pl-2 border ${
                  province ? "border-green-500" : "border-red-500"
                }`}
                type="text"
                name="province"
              />
              {!province && <FieldAlert alert="Required field" />}
            </div>
            <div className="mr-4">
              <label>
                Postal/Zip Code <span className="text-red-600">*</span>
              </label>
              <br />
              <input
                defaultValue={zipcode}
                onChange={(e) => {
                  setZipCode(e.target.value);
                }}
                className={`pl-2 border ${
                  zipcode ? "border-green-500" : "border-red-500"
                }`}
                type="text"
                name="zipcode"
              />
              {!zipcode && <FieldAlert alert="Required field" />}
            </div>
          </div>
        </form>
      </div>
      <br />
      <button
        onClick={() => {
          setCreateAccount(true);
        }}
        className={`mx-6 p-2 float-right text-white font-bold bg-teal-400 ${
          disableCreateAccount ? "opacity-50 cursor-not-allowed" : ""
        }`}
        disabled={disableCreateAccount}
      >
        Create Account
      </button>
    </>
  );
}
