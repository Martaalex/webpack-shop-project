import Immutable from 'seamless-immutable';
import { toggleFavoriteById, updateCartCountById } from './utils';
import * as types from './actionTypes';

const DEFAULT_STATE = Immutable({
  products: [],
  error: null,
  loading: false,
});

export default (state = DEFAULT_STATE, { type, payload }) => {
  switch (type) {
    case types.FETCH_PRODUCTS:
      return Immutable.set(state, 'loading', true);

    case types.FETCH_PRODUCTS_SUCCESS:
      return Immutable.merge(state, {
        loading: false,
        products: payload,
      });

    case types.FETCH_PRODUCTS_FAILURE:
      return Immutable.merge(state, {
        loading: false,
        error: payload,
      });

    case types.TOGGLE_FAVORITE_PRODUCT: {
      return Immutable.merge(state, {
        products: toggleFavoriteById(state.products, payload),
      });
    }
    case types.UPDATE_PRODUCT_CART_COUNT: {
      const { id, count } = payload;
      return Immutable.merge(state, {
        products: updateCartCountById(state.products, id, count),
      });
    }
    default:
      return state;
  }
};
