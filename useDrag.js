import { useRef, useEffect, useState } from 'react';
import { bind } from '@utils';

export default function useDrag() {
  const [pos, setPos] = useState(0);
  const dragRef = useRef();
  useEffect(() => {
    let lastX;
    let lastY;
    let curX;
    let curY;
    if (dragRef.current) {
      const element = dragRef.current;

      const mouseDownhandle = bind(element, 'mousedown', (e) => {
        const { pageX, pageY } = e; // 当前光标坐标
        curX = pageX;
        curY = pageY;
        const mouseMoveHandle = bind(document, 'mousemove', ({ pageX, pageY }) => {
          lastX = curX || pageX;
          lastY = curY || pageY;
          curX = pageX;
          curY = pageY;

          setPos({
            x: curX, y: curY, dX: curX - lastX, dY: curY - lastY,
          });
        });
        const mouseUpHandle = bind(document, 'mouseup', () => {
          mouseMoveHandle.remove();
          mouseUpHandle.remove();
        });
      });

      return () => {
        mouseDownhandle.remove();
      };
    }
  }, []);

  return [dragRef, pos];
}
