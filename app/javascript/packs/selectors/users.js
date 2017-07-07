import { createSelector } from 'reselect';

const _getAllIds = state => state.users.allIds;
const _getById = state => state.users.byId;

export const byId = state => state.users.byId;

export const getAll = createSelector(
  _getAllIds,
  _getById,
  (allIds, byId) => allIds.map(id => ({ ...byId[id], id }))
);
