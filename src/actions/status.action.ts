import {
  IStatusSetSearchingTextAction,
  IStatusSetSearchingTextPayload,
  StatusActions,
} from './types';

export const setSearchingText = (
  payload: IStatusSetSearchingTextPayload,
): IStatusSetSearchingTextAction => ({
  payload,
  type: StatusActions.SetSearchingText,
});
