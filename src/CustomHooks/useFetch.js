import { useState, useEffect } from 'react';

export const useFetch = (url) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    try{
      const fetchData = async (url) => {
        const response = await fetch(url);
        const data = await response.json();
        setData(data);
        setLoading(false);
      }
      fetchData(url);
    }catch(e){
      console.log(e);
    }
  }, [url]);
  return { data, loading };
}