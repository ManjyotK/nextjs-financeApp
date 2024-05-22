'use client'
// import { fetchFact } from './lib/data';

import React from "react";
import { boredapi } from "./lib/definitions";
import { ApiResponse } from "./lib/definitions";


// export default async function Page() {
//   const fact = await fetchFact();
//   return (
//     <div className="flex items-center justify-center p-4">
//       <p className="text-xl">{fact.activity}</p>
//     </div>
//   );

// };

export default function Page() {
  const { data, error, isLoading } = useSafeApiCall<boredapi>('/api');

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;
  if (!data) return null;

  return (
    <div className="flex items-center justify-center p-4">
      <p className="text-xl">{data.activity}</p>
    </div>
  );
}

function useSafeApiCall<T>(url: string): ApiResponse<T> {
  const [data, setData] = React.useState<T | null>(null);
  const [error, setError] = React.useState<Error | null>(null);
  const [isLoading, setLoading] = React.useState(false);

  React.useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const res = await fetch(url);
        const data = await res.json();
        setData(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [url]);

  return { data, error, isLoading };
}

