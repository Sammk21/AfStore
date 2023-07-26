import { useEffect, useState } from 'react';
import { fetchDataFromAPI } from '../Utils/api';
import axios from 'axios';

const useFetch = (endpoint) => {
  const [products, setProducts] = useState();

  useEffect(() => {
    let isMounted = true;
    let source = axios.CancelToken.source();

    const makeApiCall = async () => {
      try {
        const res = await fetchDataFromAPI(endpoint, { cancelToken: source.token });
        if (isMounted) {
          setProducts(res);
        }
      } catch (error) {
        // Handle error
      }
    };

    makeApiCall();

    return () => {
      isMounted = false;
      source.cancel('Request canceled');
    };
  }, [endpoint]);

  return { products };
};

export default useFetch;
