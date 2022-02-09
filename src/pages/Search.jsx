import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Header from '../component/Header';
import searchAlbumsAPI from '../services/searchAlbumsAPI';
import Carregando from '../component/Carregando';
import '../css/Search.css';

const numberLogin = 2;

class Search extends Component {
  constructor() {
    super();
    this.state = {
      login: '',
      btnDisable: true,
      musics: [],
      nameArtist: '',
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
      nameArtist: login,

    });
    const user = await searchAlbumsAPI(login);
    this.setState({
      musics: user,
      login: '',
      loading: false,
      btnDisable: true,

    });
  }

  listMusic = () => {
    const { musics, nameArtist, loading } = this.state;
    return (
      <>
        <section className="title-search">
          {musics.length > 0
        && <h2>{`Resultado de álbuns de: ${nameArtist}`}</h2> }

          {(musics.length === 0 && !loading && nameArtist.length > 0)
        && <h2>Nenhum álbum foi encontrado</h2>}
        </section>
        <main className="container-musics-search">
          {musics
            .map(
              ({ collectionId, artistName, artworkUrl100, collectionName,
              }) => (
                <Link
                  className="link-music"
                  key={ collectionId }
                  data-testid={ `link-to-album-${collectionId}` }
                  to={ `/album/${collectionId}` }
                >
                  <section className="container-musics">
                    <img
                      src={ artworkUrl100 }
                      alt={ `Imagem do Album ${collectionName}` }
                    />
                    <div className="musics-title">
                      <h3>{collectionName}</h3>
                      <h4>{artistName}</h4>
                    </div>
                  </section>
                </Link>
              ),
            )}
        </main>
      </>
    );
  }

  render() {
    const { login, btnDisable, loading } = this.state;
    return (
      <>
        <Header />
        <div data-testid="page-search" className="container-search">
          <input
            onChange={ this.handleLogin }
            data-testid="search-artist-input"
            type="text"
            placeholder="Nome do Artista"
            value={ login }
            name="login"
            autoComplete="off"
          />
          <button
            data-testid="search-artist-button"
            type="button"
            disabled={ btnDisable }
            onClick={ () => this.btnClick(login) }
          >
            Pesquisar
          </button>
        </div>
        {!loading ? this.listMusic() : <Carregando /> }
      </>
    );
  }
}

export default Search;
