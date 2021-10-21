import React from 'react';
import Header from '../componentes/Header';

class Search extends React.Component {
  render() {
    return (
      <div data-testid="page-search">
        <Header />
        Procura
      </div>
    );
  }
}

export default Search;
