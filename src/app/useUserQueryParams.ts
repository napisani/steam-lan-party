import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime';
import { useEffect, useState } from 'react';

type QueryParams<T> = {
  [K in keyof T]: string[];
};

function useUserQueryParams<T extends Record<string, string[]>>(
  keys: (keyof T)[],
  initialValues: QueryParams<T>,
  router: AppRouterInstance,
) {
  const [values, setValues] = useState<QueryParams<T>>(() => {
    if (typeof window === 'undefined') return initialValues; // SSR safety

    const searchParams = new URLSearchParams(window.location.search);
    return keys.reduce((acc, key) => {
      const paramValue = searchParams.get(key as string);
      acc[key] = paramValue ? paramValue.split(',') : initialValues[key];
      return acc;
    }, {} as QueryParams<T>);
  });

  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);

    keys.forEach((key) => {
      if (values[key].join(',') !== initialValues[key].join(',')) {
        searchParams.set(key as string, values[key].join(','));
      } else {
        searchParams.delete(key as string);
      }
    });

    const newSearch = searchParams.toString();
    const href = `${window.location.pathname}${newSearch ? `?${newSearch}` : ''}`;
    console.log('href', href);
    const currentHref = `${window.location.pathname}${window.location.search}`;
    if (currentHref !== href) {
      router.replace(href);
    }
  }, [values, keys, initialValues, router]);

  const setQueryValue = (key: keyof T, value: string[]) => {
    setValues((prevValues) => ({ ...prevValues, [key]: value }));
  };

  return [values, setQueryValue] as const;
}

export default useUserQueryParams;
