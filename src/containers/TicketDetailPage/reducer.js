import produce from 'immer';
import { 
  LOAD_TICKET,
} from './constants';

// The initial state of the App
export const initialState = {
  ticket: {
    productos: [],
    id_participante:'',
    tipo_de_pago:'',
    hora_creacion:'',
    subtotal:'',
    iva:'',
    total:'',
    _id:'',
  },
};

/* eslint-disable default-case, no-param-reassign */
const TicketsReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case LOAD_TICKET:
        draft.ticket = action.ticket;
        break;
    }
  });

export default TicketsReducer;