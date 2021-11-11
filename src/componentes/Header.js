import React from 'react';
import { Link } from 'react-router-dom';
import { getUser } from '../services/userAPI';
import Loading from '../pages/Loading';

class Header extends React.Component {
  constructor() {
    super();

    this.state = {
      userName: '',
      loading: true,
    };
  }

  componentDidMount() {
    getUser().then((response) => {
      this.setState({
        userName: response.name,
        loading: false,
      });
    });
  }

  render() {
    const { userName, loading } = this.state;
    if (loading) return <Loading />;
    return (
      <header data-testid="header-component">

        {
          !loading && <p data-testid="header-user-name">{ userName }</p>
        }

        <Link to="/search" data-testid="link-to-search">Busca</Link>

        <Link to="/favorites" data-testid="link-to-favorites">Favoritos</Link>

        <Link to="/profile" data-testid="link-to-profile">Perfil</Link>

      </header>

    );
  }
}

export default Header;
