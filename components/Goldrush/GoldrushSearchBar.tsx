import { fetchSearchBar } from "@/app/lib/data";
import {
  Autocomplete,
  AutocompleteItem
} from "@heroui/react";
import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { FaSearch } from "react-icons/fa";
import { useDebouncedCallback } from "use-debounce";

export default function GoldrushSearchBar({ event, handleAnswer, isSearchDisabled }: { event: string, handleAnswer: Function, isSearchDisabled: boolean }) {
  const [results, setResults] = useState<any[]>([]);
  const [term, setTerm] = useState("");
  const [searching, setSearching] = useState(false);
  const {t} = useTranslation();

  function sendAnswer(answer: any) {
    if (!answer) return;
    handleAnswer(answer, event);
  }

  const debouncedSearch = useDebouncedCallback(async (value: string) => {
    if (!value) {
      setResults([]);
      return;
    }

    setSearching(true);
    const data = await fetchSearchBar(value, "world");
    setResults(data);
    setSearching(false);
  }, 500);

  useEffect(() => {
    debouncedSearch(term);
  }, [term]);

  return (
    <Autocomplete
      placeholder={t("searchbar_placeholder")}
      startContent={<FaSearch className="text-default-400 flex-shrink-0" />}
      className="w-full lg:max-w-2xl max-w-xs]"
      aria-label={t("searchbar_label")}
      inputValue={term}
      onInputChange={setTerm}
      isLoading={searching}
      items={results}
      isDisabled={isSearchDisabled}
      onSelectionChange={(key) => {
        sendAnswer(key);
        setTerm("");
        setResults([]);
      }}
    >
      {(person) => (
        <AutocompleteItem key={person.id} textValue={person.name}>
          <div className="flex items-center gap-3">
            <img
              src={person.avatar?.thumb_url}
              alt={person.name}
              className="w-6 h-6 rounded-full object-cover"
            />
            <div>
              <p className="font-medium">{person.name}</p>
              <p className="text-xs text-default-500">
                {person.country?.name ?? "N/D"}
              </p>
            </div>
          </div>
        </AutocompleteItem>
      )}
    </Autocomplete>
  );
}

