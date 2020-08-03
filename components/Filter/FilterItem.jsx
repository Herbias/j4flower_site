import { useState, useEffect, useCallback } from "react";
import CustomSelect from "../CustomSelect";

export default function (props) {
  const { name, selected, option, handleChange } = props;
  return (
    <div className="flex mx-2">
      <label className="font-semibold capitalize">{name && name}</label>
      <CustomSelect
        name={name}
        selected={selected}
        handleChange={handleChange}
        option={option}
      />
    </div>
  );
}
