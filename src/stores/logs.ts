import {
  Action,
  Computed,
  action,
  computed,
  createContextStore,
} from 'easy-peasy';
import persist from './persist';

export enum LogStatus {
  Full = 'full',
  NotFull = 'not_full',
  ClassNotFound = 'class_not_found',
  NetworkError = 'net_error',
}

export interface Log {
  status: LogStatus;
  timestamp: number;
  seen: boolean;
  filterID: number;
}

interface LogsModel {
  logs: Log[];
  addLog: Action<LogsModel, Log>;
  clearLogs: Action<LogsModel>;
  markAllAsSeen: Action<LogsModel>;
  badgeNeeded: Computed<LogsModel, boolean>;
}

const logsStore = createContextStore<LogsModel>(
  persist({
    logs: [],
    badgeNeeded: computed(state => {
      if (!state.logs[0]) {
        return false;
      }
      return (
        state.logs[0].status === LogStatus.NotFull &&
        state.logs[0].seen === false
      );
    }),
    addLog: action((state, payload) => {
      state.logs.unshift(payload);
    }),
    clearLogs: action(state => {
      state.logs = [];
    }),
    markAllAsSeen: action(state => {
      state.logs = state.logs.map(log => ({...log, seen: true}));
    }),
  }),
);

export default logsStore;
