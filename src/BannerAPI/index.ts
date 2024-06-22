import axios, {AxiosInstance} from 'axios';
import {wrapper} from 'axios-cookiejar-support';
import {CookieJar} from 'tough-cookie';

import * as utils from './utils';
import {ListSearchParameters} from './types';
import {BannerFieldSearchResult} from './types/banner/FieldSearchResult';
import CourseSearchParameters from './types/CourseSearchParameters';
import {SearchableField} from './types/fields';
import {BannerCourseSearchResult} from './types/banner/CourseSearchResult';

export default class BannerAPI {
  readonly baseUrl: string;
  private jar: CookieJar;
  private client: AxiosInstance;

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
    this.jar = new CookieJar();
    this.client = wrapper(
      axios.create({
        jar: this.jar,
        headers: {
          'User-Agent':
            'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36',
        },
      }),
    );
  }

  private buildBannerUrl(path: string, query: Record<string, unknown>) {
    return utils.build_url(this.baseUrl, path, query);
  }

  private async initSearchSession(termCode: string) {
    const url = this.buildBannerUrl('/StudentRegistrationSsb/ssb/term/search', {
      mode: 'search',
      dataType: 'json',
      term: termCode,
      startDatepicker: '',
      endDatepicker: '',
    });

    await this.client.get(url, {timeout: 10000});
  }

  private async requestBannerURL<T>(url: string) {
    const response = await this.client.get(url, {timeout: 10000});
    const searchResults = response.data as T;

    //@ts-ignore
    delete searchResults.ztcEncodedImage;

    return searchResults;
  }

  private async searchFieldOptionsByFieldPath(
    term: string,
    fieldPath: string,
    searchParameters?: ListSearchParameters,
    includeTerm = true,
  ) {
    const parameters = {
      searchTerm: searchParameters?.query ?? '',
      term: includeTerm ? term : null,
      offset: (searchParameters?.pagination?.offset ?? 0) + 1,
      max: searchParameters?.pagination?.max ?? 10,
    };

    const url = this.buildBannerUrl(
      '/StudentRegistrationSsb/ssb/classSearch/' + fieldPath,
      utils.removeNullValues(parameters),
    );

    const searchResults = await this.requestBannerURL<BannerFieldSearchResult>(
      url,
    );

    return searchResults;
  }

  async searchTerms(searchParameters?: ListSearchParameters) {
    return this.searchFieldOptionsByFieldPath(
      '',
      'getTerms',
      searchParameters,
      false,
    );
  }

  async searchFieldOptions(
    term: string,
    field: SearchableField,
    searchParameters?: ListSearchParameters,
  ) {
    return this.searchFieldOptionsByFieldPath(term, field, searchParameters);
  }

  async searchCourse(
    termCode: string,
    {
      subjects,
      courseNumber,
      sortColumn = 'courseNumber',
      sortDirection = 'asc',
      pagination,
      keywords,
      instructorsCodes,
      subjectCourseCombo,
      attributes,
      campusesCodes,
      levelsCodes,
      buildingsCodes,
      collegeCodes,
      departmentCodes,
      instructionalMethodsCodes,
      scheduleTypesCodes,
      duration,
      partsOfTermCodes,
      courseTitle,
      sessionsCodes,
      courseNumberRange,
      creditHourRange,
      weekDays,
      timeRange,
      openOnly,
    }: CourseSearchParameters,
  ) {
    const parameters = {
      startDatepicker: '',
      endDatepicker: '',
      txt_term: termCode,
      txt_subject: subjects?.join(',') ?? null,
      txt_courseNumber: courseNumber ?? null,
      sortColumn: sortColumn,
      sortDirection: sortDirection,
      pageOffset: pagination?.offset ?? null,
      pageMaxSize: pagination?.max ?? null,
      txt_keywordlike: keywords?.entireOrPartialWordsAll ?? null,
      txt_keywordall: keywords?.entireWordsAll ?? null,
      txt_keywordany: keywords?.entireWordsAny ?? null,
      txt_keywordexact: keywords?.exact ?? null,
      txt_keywordwithout: keywords?.negative ?? null,
      txt_instructor: instructorsCodes?.join(',') ?? null,
      txt_subjectcoursecombo: subjectCourseCombo?.join(',') ?? null,
      txt_attribute: attributes?.join(',') ?? null,
      txt_campus: campusesCodes?.join(',') ?? null,
      txt_level: levelsCodes?.join(',') ?? null,
      txt_building: buildingsCodes?.join(',') ?? null, // DANGER: NOT SURE ABOUT THE FIELD AND IF IT'S A LIST
      txt_college: collegeCodes?.join(',') ?? null, // DANGER: NOT SURE ABOUT THE FIELD AND IF IT'S A LIST
      txt_department: departmentCodes?.join(',') ?? null, // DANGER: NOT SURE ABOUT THE FIELD AND IF IT'S A LIST
      txt_instructionalMethod: instructionalMethodsCodes?.join(',') ?? null,
      txt_scheduleType: scheduleTypesCodes?.join(',') ?? null,
      txt_durationunit_value: duration?.value ?? null,
      txt_durationunit: duration?.unit ?? null,
      txt_partOfTerm: partsOfTermCodes?.join(',') ?? null,
      txt_courseTitle: courseTitle ?? null,
      txt_session: sessionsCodes?.join(',') ?? null, // DANGER: NOT SURE ABOUT THE FIELD AND IF IT'S A LIST
      txt_course_number_range: courseNumberRange?.min ?? null,
      txt_course_number_range_to: courseNumberRange?.max ?? null,
      txt_credithourlow: creditHourRange?.min ?? null,
      txt_credithourhigh: creditHourRange?.max ?? null,
      chk_include_0: weekDays?.sunday || null,
      chk_include_1: weekDays?.monday || null,
      chk_include_2: weekDays?.tuesday || null,
      chk_include_3: weekDays?.wednesday || null,
      chk_include_4: weekDays?.thursday || null,
      chk_include_5: weekDays?.friday || null,
      chk_include_6: weekDays?.saturday || null,
      select_start_hour: timeRange?.min.hour ?? null,
      select_start_min: timeRange?.min.min ?? null,
      select_start_ampm: timeRange?.min.ampm ?? null,
      select_end_hour: timeRange?.max.hour ?? null,
      select_end_min: timeRange?.max.min ?? null,
      select_end_ampm: timeRange?.max.ampm ?? null,
      chk_open_only: openOnly || null,
    };

    const searchUrl = this.buildBannerUrl(
      '/StudentRegistrationSsb/ssb/searchResults/searchResults',
      utils.removeNullValues(parameters),
    );

    await this.initSearchSession(termCode);

    const searchResults =
      this.requestBannerURL<BannerCourseSearchResult>(searchUrl);

    return searchResults;
  }
}
