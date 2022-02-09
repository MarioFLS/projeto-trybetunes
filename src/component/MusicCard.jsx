import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { addSong, getFavoriteSongs, removeSong } from '../services/favoriteSongsAPI';
import Carregando from './Carregando';
import '../css/MusicCard.css';

class MusicCard extends Component {
  constructor() {
    super();
    this.state = {
      load: false,
      favoriteMusic: [],
    };
  }

  componentDidMount() {
    this.checkMusic();
  }

  checkMusic = async () => {
    const favorite = await getFavoriteSongs();
    return this.setState({
      favoriteMusic: favorite,
    });
  }

  addSongFavorite = async ({ target: { name, checked } }, obj) => {
    this.setState({ load: true });
    const nameNumber = Number(name);
    if (checked) {
      const music = obj.find(({ trackId }) => trackId === nameNumber);
      await addSong(music);
      const favorite = await getFavoriteSongs();
      this.setState({
        load: false,
        favoriteMusic: favorite,
      });
    } else {
      const { favoriteMusicRender } = this.props;
      const musicRemove = obj.find(({ trackId }) => trackId === nameNumber);
      await removeSong(musicRemove);
      const favorite = await getFavoriteSongs();
      this.setState({
        load: false,
        favoriteMusic: favorite,
      }, () => favoriteMusicRender && favoriteMusicRender());
    }
  }

  render() {
    const { music } = this.props;
    const { load, favoriteMusic } = this.state;
    if (load) return <Carregando />;
    return (
      <div className="music-card">
        {music.filter((item) => item.trackId).map((
          { previewUrl, trackName, trackId },
        ) => (
          <div key={ trackId } className="cardMusic">
            <div className="Card-title">
              <p>{trackName}</p>
            </div>
            <audio data-testid="audio-component" src={ previewUrl } controls>
              <track kind="captions" />
              O seu navegador não suporta o elemento
              <code>audio</code>
              .
            </audio>
            <label
              htmlFor={ `favorite-music-${trackId}` }
              className="label-cardMusic"
            >
              <div className="heart"> </div>
              <input
                data-testid={ `checkbox-music-${trackId}` }
                id={ `favorite-music-${trackId}` }
                type="checkbox"
                className="checkbox-musicCard"
                name={ trackId }
                checked={ favoriteMusic.some((musics) => musics.trackId === trackId) }
                onChange={ ({ target }) => this.addSongFavorite({ target }, music) }
              />
            </label>
          </div>
        ))}
      </div>
    );
  }
}

MusicCard.propTypes = {
  music: PropTypes.arrayOf(PropTypes.object).isRequired,
  favoriteMusicRender: PropTypes.func.isRequired,
};
export default MusicCard;
