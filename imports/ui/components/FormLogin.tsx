import React, { useState, ChangeEvent } from 'react';
import StyledFormLogin from '../elements/StyledFormLogin';
import { UserCredentials } from '../../api/interfaces/user.interface';
import { IHandleLogin } from '../../api/interfaces/functions.interface';

interface FormLoginProps {
  onLogin: IHandleLogin
};

const FormLogin = ({ onLogin }: FormLoginProps) => {
  const [state, setState] = useState<UserCredentials>({
    username: '',
    phone: '',
    password: ''
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setState((prevState: typeof state) => ({
      ...prevState,
      [name]: value
    }));
  };

  const { username, phone, password } = state;
  return (
    <StyledFormLogin>
      <label className="label">
        <input type="text" className="input" name="username" placeholder="Nom d'utilisateur" value={username} onChange={handleChange} />
      </label>
      <label className="label">
        <input type="phone" className="input" name="phone" placeholder="N° de téléphone" value={phone} onChange={handleChange} />
      </label>
      <label className="label">
        <input type="password" className="input" name="password" placeholder="Mot de passe" value={password} onChange={handleChange} />
      </label>
      <button className="loginBtn" onClick={() => onLogin(state)}>CONNEXION</button>
    </StyledFormLogin>
  );
};

export default FormLogin;