import { useHistory } from 'react-router-dom';
import { useMemo } from 'react';

// 获取当前url的参数
export default function useGetUrlParams() {
  const { location } = useHistory();
  const search = location.search.substring(1);
  return useMemo(() => {
    const result = {};
    if (!search) return result;
    const tempArr = search.split('&');
    tempArr.forEach((e) => {
      const [key, value] = e.split('=');
      result[key] = value;
    });
    return result;
  }, [search]);
}
