import useSWR from 'swr';

// Mock fetcher function - replace with your actual API calls
const fetcher = (url: string) =>
  new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        id: Math.random().toString(36),
        title: `Data from ${url}`,
        content: `This is cached content from ${url}`,
        timestamp: new Date().toISOString(),
      });
    }, 100); // Simulate network delay
  });

export function usePageData(page: string) {
  const { data, error, isLoading, mutate } = useSWR(
    `/api/page/${page}`,
    fetcher,
    {
      revalidateOnFocus: false,
      revalidateOnReconnect: true,
      refreshInterval: 30000, // Refresh every 30 seconds
      dedupingInterval: 2000,
      errorRetryCount: 3,
      errorRetryInterval: 5000,
      keepPreviousData: true, // Keep previous data while loading new data
    }
  );

  return {
    data,
    error,
    isLoading,
    mutate,
  };
}

export function useUserData() {
  const { data, error, isLoading } = useSWR('/api/user', fetcher, {
    revalidateOnFocus: false,
    refreshInterval: 60000, // Refresh every minute
    keepPreviousData: true,
  });

  return {
    user: data,
    error,
    isLoading,
  };
}
