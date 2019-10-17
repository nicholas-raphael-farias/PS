/**
 * ProductPage selectors
 */

import { createSelector } from 'reselect';
import { initialState } from './reducer';

const selectUltimate = state => state.ultimate || initialState;

const makeSelectProduct = () =>
  createSelector(
    selectUltimate,
    ultimateState => ultimateState.product,
  );

const makeSelectModifier = () =>
  createSelector(
    selectUltimate,
    ultimateState => {
      return({
        name: ultimateState.mod_name,
        type: ultimateState.mod_type,
        is_assigned: false,
        order: -1,
        options: [],
      });
    },
  );

const makeSelectOption = () =>
  createSelector(
    selectUltimate,
    ultimateState => {
      return({
        name: ultimateState.opt_name,
        price: ultimateState.opt_price,
      });
    },
  );

const makeSelectFormStatus = () =>
  createSelector(
    selectUltimate,
    ultimateState => {
      return({
        is_vsbl_crt_mod: ultimateState.is_vsbl_crt_mod,
        is_vsbl_crt_opt: ultimateState.is_vsbl_crt_opt,
      });
    },
  );

const makeSelectChosenModifier = () =>
  createSelector(
    selectUltimate,
    ultimateState => ultimateState.mod_to_add_opt,
  );

export { makeSelectProduct, makeSelectFormStatus, makeSelectModifier, makeSelectChosenModifier, makeSelectOption };