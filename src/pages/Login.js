import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { saveUserAction } from '../actions';

class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      email: '',
      password: '',
      isDisabled: true,
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  handleChange({ target }) {
    const { name } = target;
    const emailRegex = /^[a-zA-Z0-9_.-]+@[a-zA-Z0-9-]+.com$/;
    const minLength = 6;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    this.setState({
      [name]: value,
    }, () => {
      const { email, password } = this.state;
      if (emailRegex.test(email) && password.length >= minLength) {
        this.setState({ isDisabled: false });
      } else {
        this.setState({ isDisabled: true });
      }
    });
  }

  handleClick() {
    const { history, saveUser } = this.props;
    const { email } = this.state;
    saveUser(email);
    history.push('/carteira');
  }

  render() {
    const { email, password, isDisabled } = this.state;
    return (
      <div>
        <input
          type="email"
          name="email"
          value={ email }
          data-testid="email-input"
          onChange={ this.handleChange }
        />
        <input
          type="password"
          name="password"
          value={ password }
          data-testid="password-input"
          onChange={ this.handleChange }
        />
        <button
          type="submit"
          disabled={ isDisabled }
          onClick={ this.handleClick }
        >
          Entrar
        </button>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  saveUser: (email) => dispatch(saveUserAction(email)),
});

Login.propTypes = {
  history: PropTypes.objectOf(PropTypes.any.isRequired).isRequired,
  saveUser: PropTypes.func.isRequired,
};

export default connect(null, mapDispatchToProps)(Login);
