import React from 'react';
import PropTypes from 'prop-types';
import Header from '../componentes/Header';
import MusicCard from '../componentes/MusicCard';
import getMusics from '../services/musicsAPI';
import { getFavoriteSongs } from '../services/favoriteSongsAPI';

class Album extends React.Component {
  constructor() {
    super();
    this.state = {
      musics: [],
      requestComplete: false,
      isLoading: true,
      favorites: [],
    };
    this.checkFavorites = this.checkFavorites.bind(this);
    this.requestFavorites = this.requestFavorites.bind(this);
  }

  componentDidMount() {
    this.returnApi();
    this.requestFavorites();
  }

  async returnApi() {
    const { match: { params: { id } } } = this.props;
    const getMusicAnswer = await getMusics(id); // retorno da API
    this.setState({
      musics: getMusicAnswer,
      requestComplete: true,
    });
  }

  async requestFavorites() {
    const favorites = await getFavoriteSongs();
    this.setState({
      isLoading: false,
      favorites,
    });
  }

  checkFavorites(trackId) {
    const { favorites } = this.state;
    const musicFavorite = favorites.find((music) => music.trackId === trackId);
    if (musicFavorite) {
      return true;
    }
    return false;
  }

  render() {
    const { musics, requestComplete, isLoading } = this.state;
    return (
      <div data-testid="page-album">
        <Header />
        {requestComplete && <span data-testid="artist-name">{musics[0].artistName}</span>}
        {requestComplete
        && <span data-testid="album-name">{musics[0].collectionName}</span>}
        {
          musics
            .filter((element) => element.kind)
            .map((music) => (<MusicCard
              key={ music.trackId }
              trackName={ music.trackName }
              previewUrl={ music.previewUrl }
              trackId={ music.trackId }
              song={ music }
              checked={ this.checkFavorites(music.trackId) }
              checkedIfIsFavorite={ this.requestFavorites }

            />))
        }
        { isLoading && <span>Carregando...</span>}

      </div>
    );
  }
}

Album.propTypes = {
  match: PropTypes.shape().isRequired,
};

export default Album;
