import {
  Action,
  Computed,
  action,
  computed,
  createContextStore,
} from 'easy-peasy';

import persist from './persist';
import {Filter} from './filter';

export enum LogStatus {
  Full = 'full',
  NotFull = 'not_full',
  ClassNotFound = 'class_not_found',
  NetworkError = 'net_error',
}

export type Log =
  | {
      status: LogStatus;
      timestamp: number;
      seen: boolean;
      filterID: number;
      oldFilterName: null;
    }
  | {
      status: LogStatus;
      timestamp: number;
      seen: boolean;
      filterID: null;
      oldFilterName: string;
    };

interface LogsModel {
  logs: Log[];
  addLog: Action<LogsModel, Log>;
  clearLogs: Action<LogsModel>;
  markAllAsSeen: Action<LogsModel>;
  badgeNeeded: Computed<LogsModel, boolean>;
  onFilterDeleted: Action<LogsModel, Filter>;
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
    onFilterDeleted: action((state, filter) => {
      state.logs = state.logs.map(log => {
        if (log.filterID === filter.id) {
          return {
            ...log,
            oldFilterName: filter.name,
            filterID: null,
          };
        } else {
          return log;
        }
      });
    }),
  }),
);

export default logsStore;
