import { useState, useEffect } from 'react';

export const useFetch = (url) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    try{
      setLoading(true);
      const fetchData = async (url) => {
        const response = await fetch(url);
        const data = await response.json();
        setData(data);
        setLoading(false);
      }
      fetchData(url);
    }catch(e){
      console.error(e);
    }
  }, [url]);
  return { data, loading };
}