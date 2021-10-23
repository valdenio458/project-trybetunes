import React from 'react';
import PropTypes from 'prop-types';

class MusicCard extends React.Component {
  constructor() {
    super();

    this.state = {

    };
  }

  render() {
    const { trackName, previewUrl } = this.props;

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
      </div>

    );
  }
}

export default MusicCard;
