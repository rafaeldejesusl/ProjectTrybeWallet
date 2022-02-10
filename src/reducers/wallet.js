// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas
import { GET_CURRENCY, SAVE_EXPENSE, DELETE_EXPENSE, EDIT_EXPENSE } from '../actions';

const INITIAL_STATE = {
  currencies: [],
  expenses: [],
};

const wallet = (state = INITIAL_STATE, { payload, type }) => {
  // const array = state.expenses;
  // if (type === EDIT_EXPENSE) {
  //   array.splice(payload.id, 1, payload);
  // }
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
    };
  case DELETE_EXPENSE:
    return {
      ...state,
      expenses: state.expenses.filter((el) => Number(el.id) !== Number(payload)),
    };
  case EDIT_EXPENSE:
    return {
      ...state,
      expenses: payload,
    };
  default:
    return state;
  }
};

export default wallet;
