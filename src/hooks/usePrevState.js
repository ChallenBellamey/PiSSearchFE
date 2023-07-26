import { useEffect, useRef } from "react";

const usePrevState = (value) => {
    const ref = useRef();

    useEffect(() => {
      ref.current = value;
    },[value]);

    return ref.current;
};

export default usePrevState;