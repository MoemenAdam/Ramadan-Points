import { useState, useEffect } from 'react';

export const useAuth = (url, token, method, body) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  if(!token)return { data, loading };
  useEffect(() => {
    try{
      setLoading(true);
      const fetchData = async (url) => {
        const response = await fetch(url,{
          method,
          body,
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          }
        });
        const data = await response.json();
        setData(data);
        setLoading(false);
      }
      fetchData(url);
    }catch(e){
      console.log(1);
      console.log(e);
    }
  }, [url]);
  return { data, loading };
}