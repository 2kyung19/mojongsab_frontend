import React from 'react';

function SignIn(): JSX.Element {
  return (
    <a
      href={`https://kauth.kakao.com/oauth/authorize?client_id=${process.env.REACT_APP_KAKAO_CLIENT}&redirect_uri=${process.env.REACT_APP_HOME_URL}&response_type=code`}>
      카카오 로그인
    </a>
  );
}

export default SignIn;
