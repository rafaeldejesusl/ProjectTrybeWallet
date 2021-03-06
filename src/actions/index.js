// Coloque aqui suas actions
export const SAVE_USER = 'SAVE_USER';
export const GET_CURRENCY = 'GET_CURRENCY';
export const SAVE_EXPENSE = 'SAVE_EXPENSE';
export const DELETE_EXPENSE = 'DELETE_EXPENSE';
export const EDIT_EXPENSE = 'EDIT_EXPENSE';

export const saveUserAction = (payload) => ({
  type: SAVE_USER,
  payload,
});

const getCurrency = (payload) => ({
  type: GET_CURRENCY,
  payload,
});

export const fetchCurrencyAction = () => async (dispatch) => {
  try {
    const response = await fetch('https://economia.awesomeapi.com.br/json/all');
    const data = await response.json();
    delete data.USDT;
    const array = Object.values(data);
    const result = array.map((el) => el.code);
    console.log(result);
    dispatch(getCurrency(result));
  } catch (error) {
    console.error(error);
  }
};

const saveExpense = (payload) => ({
  type: SAVE_EXPENSE,
  payload,
});

export const fetchExpenseAction = (obj) => async (dispatch) => {
  try {
    const response = await fetch('https://economia.awesomeapi.com.br/json/all');
    const data = await response.json();
    delete data.USDT;
    const payload = { ...obj, exchangeRates: data };
    dispatch(saveExpense(payload));
  } catch (error) {
    console.error(error);
  }
};

export const deleteExpenseAction = (payload) => ({
  type: DELETE_EXPENSE,
  payload,
});

export const editExpenseAction = (payload) => ({
  type: EDIT_EXPENSE,
  payload,
});
