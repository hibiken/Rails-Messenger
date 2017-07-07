import { createSelector } from 'reselect';

const recentFirst = (messageThread1, messageThread2) => {
  const one = new Date(messageThread1.updatedAt);
  const two = new Date(messageThread2.updatedAt);
  return one > two ? -1 : 1;
};

const allIds = state => state.messageThreads.allIds;
export const byId = state => state.messageThreads.byId;
export const messagesById = state => state.messageThreads.messagesById;

export const getAll = createSelector(
  allIds,
  byId,
  (allIds, byId) => allIds.map(id => ({ ...byId[id], id })).sort(recentFirst)
);
