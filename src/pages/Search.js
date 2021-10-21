import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../componentes/Header';
import Loading from './Loading';
import searchAlbumsAPI from '../services/searchAlbumsAPI';

class Search extends React.Component {
  constructor() {
    super();

    this.state = {
      artist: '',
      isButtonDisabled: true,
      isLoading: false,
      result:  '', 
      albums: [],

    };
    this.handleInput = this.handleInput.bind(this);
    this.validateForm = this.validateForm.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    const { artist } = this.state;
    this.setState({
      isLoading: true,
      artist,
    }, async () => {
      const albumsFound = await searchAlbumsAPI(artist);
      this.setState({
        isLoading: false,
        albums: albumsFound ? [...albumsFound] : [],
        artist: '',
      });
    });
  }

  handleInput({ target }) {
    const { name } = target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    this.setState({ [name]: value, result: value }, () => this.validateForm());
  }

  getAlbums() {
    const { albums } = this.state;
    return (albums.map((album) => (
      <div key={ album.collectionId }>
        <Link
          to={ `/album/${album.collectionId}` }
          data-testid={ `link-to-album-${album.collectionId}` }
        >
          <p>{ album.artistName }</p>
          <p>{ album.collectionName }</p>
          <p>{ album.trackCount }</p>
          <img src={ album.artworkUrl100 } alt={ album.collectionName } />
        </Link>
      </div>
    )));
  }

  validateForm() {
    const { artist } = this.state;
    const number = 2;
    if (artist.length >= number) {
      this.setState({ isButtonDisabled: false });
    } else {
      this.setState({ isButtonDisabled: true });
    }
  }

  render() {
    const { artist, isButtonDisabled, isLoading, albums, result} = this.state;
    return (
      isLoading ? <Loading />
        : (
          <div data-testid="page-search">
            <Header />
            <form>
              <input
                name="artist"
                data-testid="search-artist-input"
                value={ artist }
                onChange={ this.handleInput }
              />
              <button
                type="button"
                data-testid="search-artist-button"
                disabled={ isButtonDisabled }
                onClick={ this.handleClick }

              >
                Pesquisar

              </button>
            </form>

            <section>
              <p>
                Resultado de álbuns de:
                { ' ' }
                { result }
              </p>
              { albums.length > 0 ? this.getAlbums() : <p>Nenhum álbum foi encontrado</p>}
            </section>

          </div>)

    );
  }
}

export default Search;
