import { createSelector } from 'reselect';

const allIds = state => state.allIds;
export const byId = state => state.users.byId;

export const getAll = createSelector(
  allIds,
  byId,
  (allIds, byId) => allIds.map(id => ({ ...byId[id], id }))
);
