import { useRef, useEffect } from "react";

export default (value: any) => {
  const prev = useRef(value);

  useEffect(() => {
    prev.current = value;
  })

  return prev.current;
};