import { useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';
export const useAuth = (url, token, method, body) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const headers = {
    'Content-Type': 'application/json',
  }
  if(token!=='noToken')headers.Authorization = `Bearer ${token}`;
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
        if(url==='https://ramadan-points-backend.onrender.com/api/v1/users/me'){
          if(data.status!=='success'){
            Cookies.remove('name');
            Cookies.remove('token');
          }else{
            Cookies.set('name',data.data.user.name.split(' ')[0],{
              expires: 1,
              secure: true
            });
          }
        }
      }
      fetchData(url);
    }catch(e){
      console.error(e);
    }
  }, [url]);
  return { data, loading };
}