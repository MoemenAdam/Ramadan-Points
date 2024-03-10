import { useState, useEffect } from 'react';

export const useAuth = (url, token, method, body) => {
  const headers = {
    'Content-Type': 'application/json',
  }
  if(token!=='noToken')headers.Authorization = `Bearer ${token}`;
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    try{
      setLoading(true);
      const fetchData = async (url) => {
        const response = await fetch(url,{
          method,
          body,
          headers
        });
        const data = await response.json();
        setData(data);
        setLoading(false);
      }
      if(token)fetchData(url);
    }catch(e){
      console.log(e);
    }
  }, [url]);
  return { data, loading };
}