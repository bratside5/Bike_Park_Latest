import { useState, useEffect } from "react";
import { Listbox } from "@headlessui/react";

export default function SelectDifficulty({ query, setQuery }) {
  useEffect(() => {
    setQuery(levels[0]);
  }, []);
  const levels = [
    { id: 0, name: "Tous" },
    { id: 1, name: "Debutant" },
    { id: 2, name: "Initie" },
    { id: 3, name: "Confirme" },
    { id: 4, name: "Expert" },
    { id: 5, name: "Elite" },
  ];

  return (
    <Listbox value={query} onChange={setQuery}>
      <Listbox.Button>{query.name}</Listbox.Button>
      <Listbox.Options className="border-gray-200 rounded bg-gray-50 px-3 py-1 w-auto h-auto ">
        {levels.map((level) => (
          <Listbox.Option key={level.id} value={level}>
            {level.name}
          </Listbox.Option>
        ))}
      </Listbox.Options>
    </Listbox>
  );
}
