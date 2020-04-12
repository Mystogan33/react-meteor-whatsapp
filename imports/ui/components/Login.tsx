import React from 'react';
import RightImg from './RightImg';
import FormLogin from './FormLogin';
import { IHandleLogin } from '../../api/interfaces/functions.interface';
import { Meteor } from 'meteor/meteor';
import { RouteComponentProps } from 'react-router-dom';

const messageText: string = "Connectez vous afin de lancer une conversation";

const Login = ({ history }: RouteComponentProps) => {
  const handleLogin: IHandleLogin = (userCreds) => {
    Meteor.call('user.login', userCreds, (err: Error, _: any) => {
      if(err) throw new Meteor.Error('Login error', err.toString());
      else {
        const { username, password } = userCreds;
        Meteor.loginWithPassword(username, password, (err) => {
          if(err) throw new Meteor.Error('Login error', err.toString());
          else history.push('/chats');
        });
      }
    });
  };

  return (
    <RightImg messageText={messageText}>
      <FormLogin onLogin={handleLogin} />
    </RightImg>
  )
};

export default Login;