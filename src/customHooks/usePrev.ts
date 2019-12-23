import { useRef, useEffect, MutableRefObject } from "react";

export default <T>(value: T): T => {
  const prev: MutableRefObject<T> = useRef(value);

  useEffect(() => {
    prev.current = value;
  })

  return prev.current;
};