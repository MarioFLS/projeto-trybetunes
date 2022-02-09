import React, { Component } from 'react';
import Header from '../component/Header';
import { getFavoriteSongs } from '../services/favoriteSongsAPI';
import Carregando from '../component/Carregando';
import MusicCard from '../component/MusicCard';
import '../css/Favoritos.css';

class Favorites extends Component {
  constructor() {
    super();
    this.state = {
      load: false,
      favoriteMusic: [],
    };
  }

  componentDidMount() {
    this.favoriteMusicRender();
  }

  favoriteMusicRender = async () => {
    this.setState({ load: true });
    const favoriteMusic = await getFavoriteSongs();
    this.setState({
      load: false,
      favoriteMusic,
    });
  }

  musicRender = (favoriteMusic) => (
    <MusicCard music={ favoriteMusic } favoriteMusicRender={ this.favoriteMusicRender } />
  )

  render() {
    const { load, favoriteMusic } = this.state;
    return (
      <>
        <Header />
        <div data-testid="page-favorites" className="container-fav">
          <div className="title-favorite">
            <h2>Suas Musicas Favoritas!</h2>
          </div>
          {load ? <Carregando /> : this.musicRender(favoriteMusic)}
        </div>
      </>
    );
  }
}

export default Favorites;
