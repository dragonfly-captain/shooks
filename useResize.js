import {
  useEffect, useState,
} from 'react';

const throttle = (fn, wait) => {
  let preTime = 0;
  return (...args) => {
    const curTime = new Date();
    if (curTime - preTime > wait) {
      fn(...args);
      preTime = curTime;
    }
  };
};

function useResize() {
  const [size, setSize] = useState({});
  useEffect(() => {
    const handleResize = throttle((e) => {
      const { target: { innerWidth: w, innerHeight: h } } = e;
      setSize({ w, h });
    }, 60);
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);
  return size;
}
export default useResize;
