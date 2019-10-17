/*
 * FlowConstants
 * Each action has a corresponding type, which the reducer knows and picks up on.
 * To avoid weird typos between the reducer and the actions, we save them as
 * constants here. We prefix them with 'yourproject/YourComponent' so we avoid
 * reducers accidentally picking up actions they shouldn't.
 *
 * Follow this format:
 * export const YOUR_ACTION_CONSTANT = 'yourproject/YourContainer/YOUR_ACTION_CONSTANT';
 */

export const LOAD_PRODUCTS = 'ps/FlowPage/LOAD_PRODUCTS';
export const CHOOSE_PRODUCT = 'ps/FlowPage/CHOOSE_PRODUCT';
export const DRAG_AND_DROP = 'ps/FlowPage/DRAG_AND_DROP';
export const ADD_AND_DROP = 'ps/FlowPage/ADD_AND_DROP';
export const UNASSIGN_MODIFIER = 'ps/FlowPage/UNASSIGN_MODIFIER';
export const ADD_FIRST_ITEM = 'ps/FlowPage/ADD_FIRST_ITEM';
export const SAVE_MODIFIERS = 'ps/FlowPage/SAVE_MODIFIERS';
export const UPDATE_PRODUCT = 'ps/FlowPage/UPDATE_PRODUCT';