import React from 'react';
import { Redirect } from 'react-router-dom';
import { createUser } from '../services/userAPI';
import Loading from './Loading';

class Login extends React.Component {
  constructor() {
    super();

    this.state = {
      input: '',
      isButtonDisabled: true,
      isLoading: false,
      redirect: false,
    };
    this.handleInput = this.handleInput.bind(this);
    this.saveName = this.saveName.bind(this);
    this.validateForm = this.validateForm.bind(this);
    this.renderForms = this.renderForms.bind(this);
  }

  /* componentDidMount() {
    this.saveName();
  }
 */
  handleInput({ target }) {
    const { name } = target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    this.setState({ [name]: value }, () => this.validateForm());
  }

  validateForm() {
    const { input } = this.state;
    const number = 3;
    if (input.length >= number) {
      this.setState({ isButtonDisabled: false });
    } else {
      this.setState({ isButtonDisabled: true });
    }
  }

  async saveName(input) {
    this.setState({
      isLoading: true,

    });

    await createUser({ name: input });
    this.setState({
      isLoading: false,
      input: '',
     // isButtonDisabled: true,
      redirect: true,
    });
  }

  renderForms() {
    const { isButtonDisabled, input } = this.state;
    return (
      <form>
        <input
          name="input"
          data-testid="login-name-input"
          value={ input }
          onChange={ this.handleInput }
        />
        <button
          type="button"
          data-testid="login-submit-button"
          disabled={ isButtonDisabled }
          onClick={ () => this.saveName(input) }
        >
          Entrar

        </button>

      </form>
    );
  }

  render() {
    const { isLoading, redirect } = this.state;
    /* if (isLoading) {
      return <Loading />;
    } */

    return (
      <div data-testid="page-login">

        { isLoading
          ? <Loading />
          : this.renderForms()}
        { redirect && <Redirect to="/search" /> }

      </div>
    );
  }
}

export default Login;
