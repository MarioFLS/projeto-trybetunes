import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Header from '../component/Header';
import getMusics from '../services/musicsAPI';
import Carregando from '../component/Carregando';
import MusicCard from '../component/MusicCard';
import '../css/Album.css';

class Album extends Component {
  constructor() {
    super();
    this.state = {
      album: undefined,
      musics: '',
    };
  }

  componentDidMount() {
    this.albumMusic();
  }

  albumMusic = async () => {
    const { match: { params: { id } } } = this.props;
    const albuns = await getMusics(id);
    this.setState({
      musics: albuns,
      album: albuns[0],
    });
    return albuns;
  }

  renderMusic = () => {
    const { album, musics } = this.state;
    return (
      <>
        <div className="title-album">
          <img
            src={ album.artworkUrl100 }
            alt={ `Imagem Album ${album.collectionName} ` }
          />
          <h3 data-testid="album-name">{album.collectionName}</h3>
          <h4 data-testid="artist-name">{album.artistName}</h4>
        </div>
        <MusicCard
          music={ musics }
          idMusic={ musics.trackId }
        />
      </>
    );
  }

  render() {
    const { album } = this.state;
    return (
      <>
        <Header />
        <div data-testid="page-album" className="container-album">
          {album ? this.renderMusic() : <Carregando />}
        </div>
      </>
    );
  }
}

Album.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }).isRequired,
};

export default Album;
