import {
  useState, useRef, useEffect,
} from 'react';
import debounce from '@utils/debounce';

export default function useComputeHeight() {
  const [warpHeight, setWarpHeight] = useState(-1);
  const [isObserver, setIsObserver] = useState(false);

  const warpRef = useRef();
  useEffect(() => {
    if (warpRef.current !== null) {
      setTimeout(() => {
        setWarpHeight(warpRef.current.getBoundingClientRect().height);
      }, 500);
    }
  }, [warpRef, isObserver]);

  const ResizeObserverHandle = debounce(() => {
    setWarpHeight(-1);
    setIsObserver((e) => !e);
  }, 100);

  useEffect(() => {
    const resizeObserver = new ResizeObserver(ResizeObserverHandle);
    resizeObserver.observe(warpRef.current);
    return () => {
      resizeObserver.disconnect();
    };
  }, []);

  return [warpRef, warpHeight];
}
