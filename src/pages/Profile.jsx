import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Header from '../component/Header';
import Carregando from '../component/Carregando';
import { getUser } from '../services/userAPI';
import '../css/Profile.css';

class Profile extends Component {
  constructor() {
    super();

    this.state = {
      load: false,
      profile: {},
    };
  }

  componentDidMount() {
    this.profileRender();
  }

  profileRender = async () => {
    this.setState({ load: true });
    const profile = await getUser();
    this.setState({
      profile,
      load: false,
    });
  }

  profile = () => {
    const { profile } = this.state;
    console.log('Profile>>', profile.email);
    return (
      <section className="section-profile">
        <div className="name-perfil">
          <h2>
            Nome do Usuário:
            <span className="name">{profile.name}</span>
          </h2>
          <Link className="link-edit" to="/profile/edit">Editar perfil</Link>
        </div>
        <div className="image-profile">
          <img
            data-testid="profile-image"
            src={ profile.image }
            alt="foto de perfil do usuário"
          />
        </div>
        <h3>Email do Usuário: </h3>
        <p>{ profile.email }</p>
        <h3>Descrição: </h3>
        <p>{ profile.description }</p>
      </section>
    );
  }

  render() {
    const { load } = this.state;
    return (
      <>
        <Header />
        <div data-testid="page-profile">
          {load ? <Carregando /> : this.profile()}
        </div>
      </>
    );
  }
}

export default Profile;
