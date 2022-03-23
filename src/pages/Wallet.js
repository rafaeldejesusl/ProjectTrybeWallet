import React from 'react';
import './Wallet.css'
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { deleteExpenseAction,
  editExpenseAction, fetchCurrencyAction, fetchExpenseAction } from '../actions';

class Wallet extends React.Component {
  constructor() {
    super();
    this.state = {
      id: 0,
      count: 0,
      value: 0,
      description: '',
      currency: 'USD',
      method: 'Dinheiro',
      tag: 'Alimentação',
      isEditing: false,
      exchangeRates: {},
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.getTotal = this.getTotal.bind(this);
    this.handleEdit = this.handleEdit.bind(this);
  }

  componentDidMount() {
    const { fetchCurrency } = this.props;
    fetchCurrency();
  }

  getTotal() {
    const { expenses } = this.props;
    const total = expenses
      .reduce((prev, cur) => prev + (cur.exchangeRates[cur.currency].ask * cur.value), 0);
    return total;
  }

  handleChange({ target }) {
    const { name } = target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    this.setState({
      [name]: value,
    });
  }

  handleClick(e) {
    e.preventDefault();
    const { value, count,
      description, currency, method, tag, isEditing, id, exchangeRates } = this.state;
    const { expenses, fetchExpense, editExpense } = this.props;
    if (isEditing) {
      const array = expenses;
      const obj = { id, value, description, currency, method, tag, exchangeRates };
      const position = array.map((el) => el.id).indexOf(id);
      array.splice(position, 1, obj);
      editExpense(array);
      this.setState({ isEditing: false });
    } else {
      const obj = { id: count, value, description, currency, method, tag };
      fetchExpense(obj);
      this.setState((prev) => ({ count: prev.count + 1 }));
    }
    this.setState({ value: 0 });
  }

  handleDelete({ target }) {
    const { deleteExpense } = this.props;
    deleteExpense(target.id);
  }

  handleEdit({ target }) {
    const { expenses } = this.props;
    this.setState({ isEditing: true });
    const expenseEdited = expenses.find((el) => Number(el.id) === Number(target.id));
    this.setState({
      value: expenseEdited.value,
      description: expenseEdited.description,
      currency: expenseEdited.currency,
      method: expenseEdited.method,
      tag: expenseEdited.tag,
      exchangeRates: expenseEdited.exchangeRates,
      id: expenseEdited.id,
    });
  }

  render() {
    const { email, currencies, expenses } = this.props;
    const { value, description, currency, method, tag, isEditing } = this.state;
    const result = this.getTotal();
    const addBut = (
      <button
        className="waves-effect waves-light btn button"
        type="submit"
        onClick={ this.handleClick }
      >
        Adicionar despesa
      </button>);
    const table = ['Descrição', 'Tag', 'Método de pagamento', 'Valor', 'Moeda',
      'Câmbio utilizado', 'Valor convertido', 'Moeda de conversão', 'Editar/Excluir'];
    return (
      <>
        <header>
          <h6 data-testid="email-field">{`Email: ${email}`}</h6>
          <h6 data-testid="total-field">{`Total: ${result.toFixed(2)}`}</h6>
          <h6 data-testid="header-currency-field">Moeda: BRL</h6>
        </header>
        <form className="form row">
          <div className="col s2">
          <label htmlFor="value-input">
            Valor:
            <input
              type="number"
              data-testid="value-input"
              id="value-input"
              name="value"
              value={ value }
              onChange={ this.handleChange }
            />
          </label>
          </div>
          <div className="col s2">
          <label htmlFor="description-input">
            Descrição:
            <input
              type="text"
              data-testid="description-input"
              id="description-input"
              name="description"
              value={ description }
              onChange={ this.handleChange }
            />
          </label>
          </div>
          <div className="col s2">
          <label htmlFor="currency-input">
            Moeda:
            <select
              name="currency"
              id="currency-input"
              className="browser-default"
              data-testid="currency-input"
              onChange={ this.handleChange }
              value={ currency }
            >
              {currencies && (currencies.map((code) => (
                <option key={ code } data-testid={ code } value={ code }>{ code }</option>
              )))}
              {/* {currencies && (currencies.map(({ code }) => (
                <option key={ code } data-testid={ code } value={ code }>{ code }</option>
              )))} */}
            </select>
          </label>
          </div>
          <div className="col s2">
          <label htmlFor="method-input">
            Método de Pagamento:
            <select
              name="method"
              id="method-input"
              className="browser-default"
              data-testid="method-input"
              onChange={ this.handleChange }
              value={ method }
            >
              <option value="Dinheiro">Dinheiro</option>
              <option value="Cartão de crédito">Cartão de crédito</option>
              <option value="Cartão de débito">Cartão de débito</option>
            </select>
          </label>
          </div>
          <div className="col s2">
          <label htmlFor="tag-input">
            Tag:
            <select
              name="tag"
              id="tag-input"
              className="browser-default"
              data-testid="tag-input"
              onChange={ this.handleChange }
              value={ tag }
            >
              <option value="Alimentação">Alimentação</option>
              <option value="Lazer">Lazer</option>
              <option value="Trabalho">Trabalho</option>
              <option value="Transporte">Transporte</option>
              <option value="Saúde">Saúde</option>
            </select>
          </label>
          </div>
          <div className="col s2">
            {isEditing
              ? <button className="waves-effect waves-light btn button" type="submit" onClick={ this.handleClick }>Editar despesa</button>
              : addBut}
          </div>
        </form>
        <table className="centered teal accent-3 striped">
          <thead>
            <tr>
              {table.map((element) => (<th key={ element }>{element}</th>))}
            </tr>
          </thead>
          <tbody>
            {expenses.map((el) => (
              <tr key={ el.id }>
                <td>{el.description}</td>
                <td>{el.tag}</td>
                <td>{el.method}</td>
                <td>{Number(el.value).toFixed(2)}</td>
                <td>{el.exchangeRates[el.currency].name.split('/Real Brasileiro')}</td>
                <td>{Number(el.exchangeRates[el.currency].ask).toFixed(2)}</td>
                <td>{(el.exchangeRates[el.currency].ask * el.value).toFixed(2)}</td>
                <td>Real</td>
                <td>
                  <button
                    type="button"
                    data-testid="edit-btn"
                    className="waves-effect waves-light btn-small yellow darken-3"
                    id={ el.id }
                    onClick={ this.handleEdit }
                  >
                    E
                  </button>
                  <button
                    type="button"
                    data-testid="delete-btn"
                    className="waves-effect waves-light btn-small red darken-3"
                    id={ el.id }
                    onClick={ this.handleDelete }
                  >
                    X
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  email: state.user.email,
  currencies: state.wallet.currencies,
  expenses: state.wallet.expenses,
});

const mapDispatchToProps = (dispatch) => ({
  fetchCurrency: () => dispatch(fetchCurrencyAction()),
  fetchExpense: (state) => dispatch(fetchExpenseAction(state)),
  deleteExpense: (state) => dispatch(deleteExpenseAction(state)),
  editExpense: (state) => dispatch(editExpenseAction(state)),
});

Wallet.propTypes = {
  email: PropTypes.string.isRequired,
  currencies: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
  expenses: PropTypes.arrayOf(PropTypes.object.isRequired).isRequired,
  fetchCurrency: PropTypes.func.isRequired,
  fetchExpense: PropTypes.func.isRequired,
  deleteExpense: PropTypes.func.isRequired,
  editExpense: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Wallet);
