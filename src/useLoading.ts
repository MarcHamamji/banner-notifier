import {useCallback, useEffect, useState} from 'react';

interface useLoadingWithDataProps<T> {
  fetcher: () => Promise<T>;
  triggerInitially?: boolean;
  skipIfLoading?: boolean;
}

function useLoadingWithData<T>({
  fetcher,
  triggerInitially = false,
  skipIfLoading = false,
}: useLoadingWithDataProps<T>) {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<T | null>(null);

  const trigger = useCallback(async () => {
    if (skipIfLoading && loading) {
      return;
    }

    setLoading(true);
    const fetchedData = await fetcher();
    setData(fetchedData);
    setLoading(false);
  }, [fetcher, skipIfLoading, loading]);

  useEffect(() => {
    if (triggerInitially) {
      trigger();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return [loading, data, trigger];
}

interface UseLoadingWithoutDataProps {
  fetcher: () => Promise<any>;
  triggerInitially?: boolean;
  skipIfLoading?: boolean;
}

function useLoadingWithoutData({
  fetcher,
  triggerInitially,
  skipIfLoading,
}: UseLoadingWithoutDataProps) {
  const hookResult = useLoadingWithData({
    fetcher,
    triggerInitially,
    skipIfLoading,
  });

  return [hookResult[0], hookResult[2]];
}

export {useLoadingWithData, useLoadingWithoutData};
