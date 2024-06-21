import {CourseSearchDataColumn, Pagination, WeekFilter} from './index';

interface Range<T> {
  min: T;
  max: T;
}

export default interface CourseSearchParameters {
  subjects?: string[];
  courseNumber?: number;
  sortColumn?: CourseSearchDataColumn;
  sortDirection?: 'asc' | 'desc';
  pagination?: Pagination;
  keywords?: {
    entireOrPartialWordsAll?: string;
    entireWordsAll?: string;
    entireWordsAny?: string;
    exact?: string;
    negative?: string;
  };
  instructorsCodes?: string[];
  subjectCourseCombo?: string[];
  attributes?: string[];
  campusesCodes?: string[];
  levelsCodes?: string[];
  buildingsCodes?: string[];
  collegeCodes?: string[];
  departmentCodes?: string[];
  instructionalMethodsCodes?: string[];
  scheduleTypesCodes?: string[];
  duration?: {
    unit: string;
    value: number;
  };
  partsOfTermCodes?: string[];
  courseTitle?: string;
  sessionsCodes?: string[];
  courseNumberRange?: Range<number>;
  creditHourRange?: Range<number>;
  weekDays?: WeekFilter;
  timeRange?: Range<{
    hour: string;
    min: string;
    ampm: string;
  }>;
  openOnly?: boolean;
  // eslint-disable-next-line semi
}
