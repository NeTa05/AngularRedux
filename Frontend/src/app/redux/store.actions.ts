import {
  Action,
  ActionCreator
} from 'redux';

export const GET: string = 'GET';
export const get: ActionCreator<Action> = () => ({
  type: GET
});
