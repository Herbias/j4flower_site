import { useEffect, useState } from "react";

export default function OrderInformation(props) {
  const { detail, history } = props;
  const [progress, setProgress] = useState(
    history[history.length - 1].description
  );
  const [status, setStatus] = useState(history[history.length - 1].status);

  return (
    <div className="w-full flex divide-x divide-gray-400">
      <div className="p-2">
        <p className="text-sm">Order:</p>
        <span className="text-md font-bold">{detail.code}</span>
      </div>
      <div className="p-2">
        <p className="text-sm">Date:</p>
        <span className="text-md font-bold">
          {new Date(detail.date).toLocaleDateString()}
        </span>
      </div>
      <div className="p-2">
        <p className="text-sm">Time:</p>
        <span className="text-md font-bold">{detail.time}</span>
      </div>
      <div className="p-2">
        <p className="text-sm">Progress:</p>
        <span className="text-md font-bold">{progress}</span>
      </div>
      <div className="p-2">
        <p className="text-sm">Status:</p>
        <span className="text-md font-bold">{status}</span>
      </div>
    </div>
  );
}
