// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas
import { GET_CURRENCY, SAVE_EXPENSE } from '../actions';

const INITIAL_STATE = {
  currencies: [],
  expenses: [],
  total: 0,
};

const wallet = (state = INITIAL_STATE, { payload, type }) => {
  switch (type) {
  case GET_CURRENCY:
    return {
      ...state,
      currencies: Object.values(payload),
    };
  case SAVE_EXPENSE:
    return {
      ...state,
      expenses: [...state.expenses, payload],
      total: state.total + (payload.exchangeRates[payload.currency].ask * payload.value),
    };
  default:
    return state;
  }
};

export default wallet;
