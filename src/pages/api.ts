import { useQuery } from 'react-query';

// Fetch world wide data of cases
export const useGetAllCases = () => {
  return useQuery('allCases', async () => {
    const response = await fetch('https://disease.sh/v3/covid-19/all');
    if (!response.ok) {
      throw new Error('Failed to fetch world wide cases data');
    }
    return response.json();
  });
};

// Fetch country specific data of cases
export const useGetCountryCases = () => {
  return useQuery('countryCases', async () => {
    const response = await fetch('https://disease.sh/v3/covid-19/countries');
    if (!response.ok) {
      throw new Error('Failed to fetch country cases data');
    }
    return response.json();
  });
};
