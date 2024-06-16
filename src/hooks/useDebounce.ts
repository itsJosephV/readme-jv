import {useEffect, useState} from "react";

const useDebounce = <T>(value: T, delay = 500) => {
  const [debounceValue, setDebounceValue] = useState(value);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setDebounceValue(value);
    }, delay);

    return () => clearTimeout(timeoutId);
  }, [value, delay]);

  return debounceValue;
};

export default useDebounce;
