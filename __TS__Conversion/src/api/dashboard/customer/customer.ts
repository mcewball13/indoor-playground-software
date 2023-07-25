import useSWR from 'swr';
import { useMemo } from 'react';
// utils
import { gqlFetcher } from 'src/utils/graphql';
// types
import { IPostItem } from 'src/types/blog';

const TEST_QUERY = `
query AllCustomers {
  allCustomers {
    id
  }
}
`;
    
// ----------------------------------------------------------------------

export function useTestPost() {
console.log('useTestPost')
  const { data, isLoading, error, isValidating } = useSWR(TEST_QUERY, gqlFetcher);

  const memoizedValue = useMemo(
    () => ({
      posts: data,
    }),
    [data]
  );
  console.log(error)
console.log(memoizedValue)
  return memoizedValue;
}

// ----------------------------------------------------------------------
