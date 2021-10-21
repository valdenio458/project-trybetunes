import React from 'react';
import Header from '../componentes/Header';

class Search extends React.Component {
  constructor() {
    super();

    this.state = {
      artist: '',
      isButtonDisabled: true,

    };
    this.handleInput = this.handleInput.bind(this);
    this.validateForm = this.validateForm.bind(this);
  }

  handleInput({ target }) {
    const { name } = target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    this.setState({ [name]: value }, () => this.validateForm());
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
    const { artist, isButtonDisabled } = this.state;
    return (
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

          >
            Pesquisar

          </button>
        </form>
      </div>
    );
  }
}

export default Search;
