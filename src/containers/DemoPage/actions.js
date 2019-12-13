import { ADD_TO_NUMBER } from './constants'

/**
 * Adds n to number
 * @param  {int} n Valor para agregar a number
 * @return {object} An action object with a type of ADD_TO_NUMBER
 */
export function addToNumber(n) {
  return {
    type: ADD_TO_NUMBER,
    value_to_add: n,
  };
}