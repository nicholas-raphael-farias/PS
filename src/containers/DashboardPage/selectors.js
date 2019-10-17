/**
 * DashboardPage selectors
 */

import { createSelector } from 'reselect';
import { initialState } from './reducer';

const dashboard = state => state.dashboard || initialState;

const makeSelectIsSigningOut = () =>
  createSelector(
    dashboard,
    dashboardState => dashboardState.isSigningOut,
  );

export { makeSelectIsSigningOut };