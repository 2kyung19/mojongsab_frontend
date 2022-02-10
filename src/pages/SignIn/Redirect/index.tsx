import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function Redirect(): JSX.Element {
  const navigate = useNavigate();

  const getAccess = async () => {
    const url = window.location.href.split('?code=')[1];

    if (url !== undefined && url.length > 0) {
      try {
        const res = await axios.get(
          `${process.env.REACT_APP_SERVER_URL}/api/oauth/kakao/token?code=${url}`,
        );
        console.log(res.data);
      } catch (error) {
        console.log(error);
      }
    }
    navigate('/');
  };

  useEffect(() => {
    // getAccess();
  });

  return <div>login success!</div>;
}

export default Redirect;
