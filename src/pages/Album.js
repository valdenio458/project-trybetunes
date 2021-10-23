import React from 'react';
import PropTypes from 'prop-types';
import Header from '../componentes/Header';
import MusicCard from '../componentes/MusicCard';
import getMusics from '../services/musicsAPI';

class Album extends React.Component {
  constructor() {
    super();
    this.state = {
      musics: [],
      requestComplete: false,
    };
  }

  componentDidMount() {
    this.returnApi();
  }

  async returnApi() {
    const { match: { params: { id } } } = this.props;
    const getMusicAnswer = await getMusics(id); // retorno da API
    this.setState({
      musics: getMusicAnswer,
      requestComplete: true,
    });
  }

  render() {
    const { musics, requestComplete } = this.state;
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

            />))
        }

      </div>
    );
  }
}

Album.propTypes = {
  match: PropTypes.shape().isRequired,
};

export default Album;
