/*
 * @Author: lizesheng
 * @Date: 2023-04-17 17:57:28
 * @LastEditors: lizesheng
 * @LastEditTime: 2023-05-16 17:24:59
 * @important: 重要提醒
 * @Description: 备注内容
 * @FilePath: /citi_web/src/hooks/useAxios.js
 */
import { useState, useEffect } from 'react';
import axios from 'axios';
import { message } from 'antd';

// 添加响应拦截器
axios.interceptors.response.use(
  (response) =>
  // 处理成功的响应
    response,
  (error) => {
    // 处理失败的响应
    if (axios.isCancel(error)) {
      // 请求被取消，不做处理
      return Promise.reject(error);
    }

    if (error.response || error.code) {
      // 网关超时，返回一个默认值
      return Promise.resolve({ success: false, message: error?.message || error.msg });
    }
    console.log('otherError', error);
    // 其他错误，抛出异常
    return Promise.reject(error);
  },
);

axios.interceptors.request.use((config) => {
  const { token } = sessionStorage;
  const { userId, pwdchangedate, pwdchangeperiod } = JSON.parse(localStorage.getItem('LoginInfo')) || {};

  return {
    ...config,
    headers: {
      ...config.headers,
      'X-Requested-With': 'XMLHttpRequest',
      Authorization: token,
      optname: userId,
      optId: userId,
      pwdchangedate,
      pwdchangeperiod,
    },
  };
}, (error) => Promise.reject(error));

export const usePost = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [data, setData] = useState(null);
  const [cancel, setCancel] = useState(null);

  useEffect(() => () => {
    if (cancel) {
      cancel('请求被取消');
    }
  }, [cancel]);

  const post = (url, body, options = {}) => {
    setIsLoading(true);

    return new Promise((resolve, reject) => {
      const cancelToken = new axios.CancelToken((cancel) => {
        setCancel(() => cancel);
      });
      axios
        .post(url, body, { cancelToken, ...options })
        .then((response) => {
          if (response?.code == 200) {
            setData(response?.result);
            resolve(response?.result);
          } else {
            message.error(response?.message || response?.msg);
            reject(response);
          }
          setIsLoading(false);
        })
        .catch((error) => {
          if (!axios.isCancel(error)) {
            setError(error);
            setIsLoading(false);
            reject(error);
          }
        });
    });
  };
  return {
    post, isLoading, error, data, setData,
  };
};
