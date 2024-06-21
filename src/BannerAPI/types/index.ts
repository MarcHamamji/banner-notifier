import {
  BannerCourseSearchData,
  BannerCourseSearchResult,
} from './banner/CourseSearchResult';

export type CourseSearchResult = Omit<
  BannerCourseSearchResult,
  'ztcEncodedImage'
>;
export type CourseSearchDataColumn = keyof BannerCourseSearchData;

export interface Pagination {
  max: number;
  offset: number;
}

export interface WeekFilter {
  sunday: boolean;
  monday: boolean;
  tuesday: boolean;
  wednesday: boolean;
  thursday: boolean;
  friday: boolean;
  saturday: boolean;
}

export interface ListSearchParameters {
  query?: string;
  pagination?: Pagination;
}
