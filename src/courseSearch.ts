import BannerAPI from './BannerAPI';
import CourseSearchParameters from './BannerAPI/types/CourseSearchParameters';
import {Log, LogStatus} from './stores/logs';

export async function searchCourse(
  bannerServerURL: string,
  termCode: string,
  filter: CourseSearchParameters,
) {
  while (bannerServerURL.endsWith('/')) {
    bannerServerURL = bannerServerURL.substring(0, bannerServerURL.length - 1);
  }

  const bannerAPI = new BannerAPI(bannerServerURL);
  const result = await bannerAPI.searchCourse(termCode, filter);
  return result;
}

export async function searchCourseAndCreateLog(
  bannerServerURL: string,
  termCode: string,
  courseSearchParameters: CourseSearchParameters,
  filterID: number,
) {
  const requestTime = Date.now();

  let log: Log = {
    filterID,
    timestamp: requestTime,
    status: LogStatus.Full,
    seen: false,
  };

  try {
    const result = await searchCourse(
      bannerServerURL,
      termCode,
      courseSearchParameters,
    );

    if (result.data.length === 0) {
      log.status = LogStatus.ClassNotFound;
    } else if (result.data.some(course => course.seatsAvailable !== 0)) {
      log.status = LogStatus.NotFull;
    } else {
      log.status = LogStatus.Full;
    }
  } catch (error) {
    log.status = LogStatus.NetworkError;
    console.error(JSON.stringify(error, null, 2));
  }

  return log;
}
