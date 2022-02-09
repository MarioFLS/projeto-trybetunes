import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { createUser } from '../services/userAPI';
import Carregando from '../component/Carregando';
import '../css/Login.css';

const numberLogin = 3;

class Login extends Component {
  constructor() {
    super();
    this.state = {
      login: '',
      btnDisable: true,
      loading: false,
      redirect: false,
    };
  }

  handleLogin = ({ target }) => {
    const { name, value } = target;
    this.setState({
      [name]: value,
    });

    this.setState((prevesState) => {
      if (prevesState.login.length >= numberLogin) {
        prevesState.btnDisable = false;
      } else {
        prevesState.btnDisable = true;
      }
    });
  }

  btnClick = async (login) => {
    this.setState({
      loading: true,
    });
    const user = await createUser({ name: login });
    if (user === 'OK') {
      this.setState({
        loading: false,
        redirect: true,
      });
    }
  };

  render() {
    const { btnDisable, login, loading, redirect } = this.state;
    if (loading) {
      return <Carregando />;
    }
    if (redirect) {
      return <Redirect to="/search" />;
    }

    return (
      <div className="container-login" data-testid="page-login">
        <h1>Login</h1>
        <input
          className="input-login"
          placeholder="Login"
          onChange={ this.handleLogin }
          data-testid="login-name-input"
          type="text"
          name="login"
          value={ login }
          autoComplete="off"
        />
        <button
          data-testid="login-submit-button"
          type="button"
          disabled={ btnDisable }
          onClick={ () => this.btnClick(login) }
        >
          Entrar
        </button>
      </div>
    );
  }
}

export default Login;
