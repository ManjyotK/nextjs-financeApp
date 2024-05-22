import { fetchFact } from './lib/data';

import { boredapi } from "./lib/definitions";

export default async function Page() {
  const fact: boredapi = await fetchFact();

  return (
    <div className="flex items-center justify-center px-4 py-8 bg-gray-100 rounded-xl shadow-lg">
      <p className="text-2xl font-semibold text-emerald-500">{fact.activity}</p>
    </div>
  );

};

