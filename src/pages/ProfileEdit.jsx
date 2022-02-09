import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import Header from '../component/Header';
import Carregando from '../component/Carregando';
import { getUser, updateUser } from '../services/userAPI';
import '../css/Profile-edit.css';

class ProfileEdit extends Component {
  constructor() {
    super();
    this.state = {
      load: false,
      description: '',
      image: '',
      email: '',
      name: '',
      redirect: false,
    };
  }

  componentDidMount() {
    this.profileRender();
  }

  handleChange = ({ target: { name, value } }) => {
    this.setState({
      [name]: value,
    });
  }

  profileRender = async () => {
    this.setState({ load: true });
    const profile = await getUser();
    const { description, email, image, name } = profile;
    this.setState({
      load: false,
      name,
      description,
      email,
      image,

    });
  }

  btnDisable =() => {
    const { description, email, name } = this.state;
    if (!(description && email && name)) {
      return true;
    } return false;
  }

  subProfile = async (event) => {
    event.preventDefault();
    this.setState({ load: true });
    const { description, email, image, name } = this.state;
    const newData = {
      name,
      email,
      image,
      description,
    };
    await updateUser(newData);
    this.setState({
      load: false,
      redirect: true });
  }

  customProfile = () => {
    const { description, image, email, name, redirect } = this.state;
    return (
      <section className="user-sec">
        <form className="container-form">
          <p>Edite as suas informações</p>
          <label htmlFor="name-input">
            Nome:
            <input
              name="name"
              type="text"
              data-testid="edit-input-name"
              required
              id="name-input"
              value={ name }
              onChange={ this.handleChange }
              autoComplete="off"

            />
          </label>
          <label htmlFor="email-input">
            Email:
            <input
              name="email"
              type="email"
              data-testid="edit-input-email"
              required
              id="email-input"
              onChange={ this.handleChange }
              value={ email }
              autoComplete="off"
            />
          </label>
          <label htmlFor="description">
            Descrição:
            <textarea
              name="description"
              data-testid="edit-input-description"
              id="description"
              onChange={ this.handleChange }
              value={ description }
              autoComplete="off"
            />
          </label>
          <label htmlFor="image-input">
            Imagem:
            <input
              name="image"
              type="text"
              data-testid="edit-input-image"
              required
              id='"image-input"'
              onChange={ this.handleChange }
              value={ image }
              autoComplete="off"
            />
          </label>
          <button
            type="button"
            data-testid="edit-button-save"
            disabled={ this.btnDisable() }
            onClick={ this.subProfile }
          >
            Salvar

          </button>
        </form>
        {redirect ? <Redirect to="/profile" /> : null}
      </section>
    );
  }

  render() {
    const { load } = this.state;
    return (
      <>
        <Header />
        <div data-testid="page-profile-edit">
          {load ? <Carregando /> : this.customProfile()}
        </div>
      </>
    );
  }
}

export default ProfileEdit;
