import React from 'react';
import PropTypes from 'prop-types';
import { addSong } from '../services/favoriteSongsAPI';

class MusicCard extends React.Component {
  constructor() {
    super();

    this.state = {
      isLoading: false,
    };
    this.handleCheckbox = this.handleCheckbox.bind(this);
  }

  async handleCheckbox() {
    const { song, checkedIfIsFavorite } = this.props;
    this.setState({
      isLoading: true,
    });
    await addSong(song);
    await checkedIfIsFavorite();
    this.setState({
      isLoading: false,
    });
  }

  render() {
    const { trackName, previewUrl, trackId, checked } = this.props;
    const { isLoading } = this.state;
    return (
      <div>
        <span>{ trackName }</span>

        <audio data-testid="audio-component" src={ previewUrl } controls>
          <track kind="captions" />
          O seu navegador não suporta o elemento
          {' '}
          <code>audio</code>
          .
        </audio>

        <label htmlFor="Favorita">
          Favorita
          <input
            type="checkbox"
            data-testid={ `checkbox-music-${trackId}` }
            onChange={ this.handleCheckbox }
            checked={ checked(trackId) }
          />
        </label>
        { isLoading && <span>Carregando...</span>}
      </div>

    );
  }
}

MusicCard.propTypes = {
  trackName: PropTypes.string.isRequired,
  previewUrl: PropTypes.string.isRequired,
  trackId: PropTypes.number.isRequired,
  song: PropTypes.shape().isRequired,
  checked: PropTypes.bool.isRequired,
  checkedIfIsFavorite: PropTypes.func.isRequired,
};

export default MusicCard;
