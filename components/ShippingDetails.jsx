import { useState, useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  UpdateUserInformation,
  UpdateShippingInformation,
} from "../redux/actions/UserAction";
import { useUpdateUserInformation } from "../hooks/updateUserInformation";

const EditButton = (props) => {
  const { editEnable, Click } = props;

  return (
    <button
      onClick={(e) => {
        Click(e);
      }}
      className="px-2 py-1 float-right text-sm text-white font-bold bg-teal-400 cursor-pointer"
    >
      {editEnable ? "Save" : "Edit"}
    </button>
  );
};

export default function ShippingDetails(props) {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.UserReducer);

  const [firstName, setFirstName] = useState(user.data.firstname);
  const [middleName, setMiddleName] = useState(user.data.middlename);
  const [lastName, setLastName] = useState(user.data.lastname);
  const [email, setEmail] = useState(user.data.email);
  const [telno, setTelno] = useState(
    user.data.telno == "NULL" ? "" : user.data.telno
  );
  const [phoneno, setPhoneno] = useState(user.data.mobileno);
  const [address1, setAddress1] = useState(user.data.address1);
  const [address2, setAddress2] = useState(user.data.address2);
  const [city, setCity] = useState(user.data.city);
  const [province, setProvince] = useState(user.data.province);
  const [zipcode, setZipCode] = useState(user.data.zipcode);
  const [editPersonalInformation, setEditPersonalInformation] = useState(false);
  const [editShippingInformation, setEditShippingInformation] = useState(false);
  const [
    toupdatePersonalInformation,
    setToUpdatePersonalInformation,
  ] = useState(false);
  const [
    toupdateShippinginformation,
    setToUpdateShippingInformation,
  ] = useState(false);

  const [
    updatingPersonalInformation,
    updatedPersonalInformation,
  ] = useUpdateUserInformation(
    "personalinformation",
    !editPersonalInformation && toupdatePersonalInformation
      ? { firstName, middleName, lastName, email, telno, phoneno }
      : null
  );

  const [
    updatingShippingInformation,
    updatedShippingInformation,
  ] = useUpdateUserInformation(
    "shippinginformation",
    !editShippingInformation && toupdateShippinginformation
      ? { address1, address2, city, province, zipcode }
      : null
  );

  useEffect(() => {
    console.log("mounting");
  }, []);

  useEffect(() => {
    if (updatedPersonalInformation)
      localStorage.setItem("user", JSON.stringify(updatedPersonalInformation));

    if (updatedShippingInformation)
      localStorage.setItem("user", JSON.stringify(updatedShippingInformation));
  }, [user.data]);

  useEffect(() => {
    if (updatedPersonalInformation) {
      const {
        firstname,
        middlename,
        lastname,
        email,
        telno,
        mobileno,
      } = updatedPersonalInformation;
      dispatch(
        UpdateUserInformation(
          firstname,
          middlename,
          lastname,
          email,
          telno,
          mobileno
        )
      );
      setToUpdatePersonalInformation(false);
    }
  }, [updatedPersonalInformation]);

  useEffect(() => {
    if (updatedShippingInformation) {
      const {
        address1,
        address2,
        city,
        province,
        zipcode,
      } = updatedPersonalInformation;
      dispatch(
        UpdateUserInformation(address1, address2, city, province, zipcode)
      );
      setToUpdateShippingInformation(false);
    }
  }, [updatedShippingInformation]);

  const editPeronalInfoClick = useCallback((e) => {
    e.preventDefault();
    setEditPersonalInformation(true);
  }, []);
  const savePeronalInfoClick = useCallback((e) => {
    e.preventDefault();
    setEditPersonalInformation(false);
    setToUpdatePersonalInformation(true);
  }, []);

  const editShippingInfoClick = useCallback((e) => {
    e.preventDefault();
    setEditShippingInformation(true);
  }, []);

  const saveShippingInfoClick = useCallback((e) => {
    e.preventDefault();
    setEditShippingInformation(false);
    setToUpdateShippingInformation(true);
  }, []);

  return (
    <>
      <div className="p-2">
        <form>
          <h1 className="text-xl">
            Personal Information{" "}
            {editPersonalInformation ? (
              <EditButton
                editEnable={editPersonalInformation}
                Click={savePeronalInfoClick}
              />
            ) : (
              <EditButton
                editEnable={editPersonalInformation}
                Click={editPeronalInfoClick}
              />
            )}
          </h1>
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
                className="pl-2 border"
                type="text"
                name="firstname"
                disabled={!editPersonalInformation}
              />
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
                className="pl-2 border"
                type="text"
                name="middlename"
                disabled={!editPersonalInformation}
              />
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
                className="pl-2 border"
                type="text"
                name="lastname"
                disabled={!editPersonalInformation}
              />
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
                className="pl-2 border"
                type="text"
                name="email"
                disabled={!editPersonalInformation}
              />
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
                disabled={!editPersonalInformation}
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
                className="pl-2 border"
                type="text"
                name="phoneno"
                disabled={!editPersonalInformation}
              />
            </div>
          </div>
          <br />
          <h1 className="text-xl">
            Shipping Information{" "}
            {editShippingInformation ? (
              <EditButton
                editEnable={editShippingInformation}
                Click={saveShippingInfoClick}
              />
            ) : (
              <EditButton
                editEnable={editShippingInformation}
                Click={editShippingInfoClick}
              />
            )}
          </h1>
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
                className="w-full pl-2 border"
                type="text"
                name="address1"
                disabled={!editShippingInformation}
              />
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
                className="pl-2 border"
                type="text"
                name="address2"
                disabled={!editShippingInformation}
              />
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
                className="pl-2 border"
                type="text"
                name="city"
                disabled={!editShippingInformation}
              />
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
                className="pl-2 border"
                type="text"
                name="province"
                disabled={!editShippingInformation}
              />
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
                className="pl-2 border"
                type="text"
                name="zipcode"
                disabled={!editShippingInformation}
              />
            </div>
          </div>
        </form>
      </div>
    </>
  );
}
