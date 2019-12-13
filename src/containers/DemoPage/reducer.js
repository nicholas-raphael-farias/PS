import produce from 'immer';
import { ADD_TO_NUMBER } from './constants'
export const initialState = {
  number: 0,
};

/* eslint-disable default-case, no-param-reassign */
const DemoReducer = (state = initialState, action) => 
  produce(state, draft => {
    console.log(action)
    switch (action.type) {
      case ADD_TO_NUMBER:
        draft.number = draft.number + parseInt(action.value_to_add)
        break
      default:
        break
    }
  });

export default DemoReducer;