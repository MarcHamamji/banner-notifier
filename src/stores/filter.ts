import {Action, action, createContextStore} from 'easy-peasy';
import persist from './persist';
import CourseSearchParameters from '../BannerAPI/types/CourseSearchParameters';

export interface Filter {
  id: number;
  name: string;
  termCode: string;
  courseSearchParameters: CourseSearchParameters;
  lastChecked: number | null;
}

interface FiltersModel {
  filters: Filter[];
  setLastChecked: Action<FiltersModel, {index: number; time: number}>;
  deleteFilter: Action<FiltersModel, number>;
}

const filtersStore = createContextStore<FiltersModel>(
  persist<FiltersModel>({
    filters: [
      {
        id: Date.now(),
        name: 'CMPS214',
        termCode: '202420',
        courseSearchParameters: {
          subjectCourseCombo: ['CMPS214'],
        },
        lastChecked: null,
      },
    ],
    setLastChecked: action((state, {index, time}) => {
      state.filters[index].lastChecked = time;
    }),
    deleteFilter: action((state, index) => {
      state.filters.splice(index, 1);
    }),
  }),
);

export default filtersStore;
