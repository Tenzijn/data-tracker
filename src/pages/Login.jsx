import {
  handleCreateUser,
  handleGoogleLogin,
} from '../handles/firebaseHandler';

import '../style/Login.scss';

function Login() {
  return (
    // login page
    <div className='login'>
      <div className='login__container'>
        <h1 className='login__title'>Login</h1>
        <button
          className='login__button'
          onClick={() => {
            handleGoogleLogin();
          }}
        >
          Google
        </button>
        <button
          className='login__button'
          onClick={() => {
            handleCreateUser();
          }}
        >
          Create User
        </button>
      </div>
    </div>
  );
}

export default Login;
