import { 
  LOAD_TICKET,
} from './constants';


export function loadTicket(ticket) {
    return {
      type: LOAD_TICKET,
      ticket,
    };
}
