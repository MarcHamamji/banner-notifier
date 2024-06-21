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
    // eslint-disable-next-line eqeqeq
    badgeNeeded: computed(state => state.logs[0]?.seen == false),
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
