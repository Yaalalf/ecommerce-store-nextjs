import { useCallback, useMemo, useRef, useState } from "react";
import Input from "../input";
import Popover from "../../popups/components/popover";
import { List, StyledBox } from "../../structure";
import { IPopoverProps } from "../../popups/components/popover/types";
import { IAutocompleteMultipleProps, IAutocompleteSingleProps } from "./types";
import Button from "../../button";
import { Column, Row } from "../../layout";
import { IoCloseCircle } from "react-icons/io5";
import { T } from "../../text";

export default function Autocomplete<T>({
  className,
  value,
  suggestions,
  field,
  multiple = false,
  onSuggest,
  onDeleteSuggest,
  suggestedItemsSlots,
}: IAutocompleteMultipleProps<T> | IAutocompleteSingleProps<T>) {
  const initSearchTextValue = useMemo(() => {
    if (multiple) {
      return "";
    } else {
      if (field) {
        return String((value as T)[field]);
      } else {
        return String(value);
      }
    }
  }, [field, multiple, value]);

  const initSelectedSuggestionsValue = useMemo(() => {
    if (multiple) {
      return value as T[];
    } else {
      return [];
    }
  }, [multiple, value]);

  const popoverRef = useRef<{ close: () => void } | null>(null);
  const inputRef = useRef(null);
  const [searchText, setSearchText] = useState<string>(initSearchTextValue);
  const [selectedSuggestions, setSelectedSuggestions] = useState<T[]>(
    initSelectedSuggestionsValue
  );

  const suggestionsWithoutSelectedSuggestionsFilter = useCallback(
    function (suggestion: T) {
      return !selectedSuggestions.find((selectedSuggestion) => {
        if (field) {
          return selectedSuggestion[field] === suggestion[field];
        } else {
          return selectedSuggestion === suggestion;
        }
      });
    },
    [field, selectedSuggestions]
  );
  const suggestionsMatchSearchTextFilter = useCallback(
    function (suggestion: T) {
      if (field) {
        return String(suggestion[field]).match(searchText);
      } else {
        return String(suggestion).match(searchText);
      }
    },
    [field, searchText]
  );

  const suggestionFiltered = useMemo(
    () =>
      suggestions
        .filter(suggestionsWithoutSelectedSuggestionsFilter)
        .filter(suggestionsMatchSearchTextFilter),
    [
      suggestions,
      suggestionsMatchSearchTextFilter,
      suggestionsWithoutSelectedSuggestionsFilter,
    ]
  );

  const selectSuggestion = useCallback(
    function (suggestion: T, index: number) {
      if (field) {
        if (multiple) {
          setSelectedSuggestions([...selectedSuggestions, suggestion]);
          setSearchText("");
        } else {
          setSearchText(suggestion[field] as string);
        }
      } else {
        if (multiple) {
          setSelectedSuggestions([...selectedSuggestions, suggestion]);
          setSearchText("");
        } else {
          setSearchText(suggestion as string);
        }
      }
      if (onSuggest) {
        onSuggest(suggestion, index);
      }
    },
    [field, multiple, onSuggest, selectedSuggestions]
  );

  const popoverProps: IPopoverProps = useMemo(
    () => ({
      offset: [0, 4],
      fill: true,
      triggerElement: inputRef,
      canTriggerParent: true,
      anchor: "bottom",
      pivot: "top",
    }),
    []
  );
  return (
    <Column className="gap-1">
      {multiple && (
        <List className="gap-2" data={selectedSuggestions} propKey={field}>
          {(selectedSuggestion, index) => (
            <StyledBox dense variant="outlined" severity="primary">
              <Row className="gap-1">
                <T className="text-xs">
                  {selectedSuggestion[field as keyof T] as string}
                </T>
                <Button
                  type="button"
                  className="p-[2px]"
                  dense
                  variant="flatted"
                  severity="primary"
                  icon={<IoCloseCircle />}
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedSuggestions([
                      ...selectedSuggestions.filter(
                        (item) => item !== selectedSuggestion
                      ),
                    ]);
                    if (onDeleteSuggest) {
                      onDeleteSuggest(selectedSuggestion, index);
                    }
                  }}
                ></Button>
              </Row>
            </StyledBox>
          )}
        </List>
      )}
      <Input
        className={className}
        ref={inputRef}
        value={searchText}
        onChange={(e) => setSearchText(e)}
        variant="outlined"
        severity="primary"
      ></Input>

      <Popover {...popoverProps} ref={popoverRef}>
        <StyledBox
          className="h-[200px] overflow-auto border-1 border-black-base/25 "
          elevation="level-4"
          severity="base"
          dense
        >
          <List data={suggestionFiltered} direction="column">
            {(suggestion, index) => (
              <Button
                className="w-full"
                onClick={() => {
                  selectSuggestion(suggestion, index);
                  popoverRef.current?.close();
                }}
              >
                {suggestedItemsSlots
                  ? suggestedItemsSlots(suggestion)
                  : ((suggestion) => {
                      if (
                        typeof suggestion === "string" ||
                        typeof suggestion === "number" ||
                        typeof suggestion === "boolean"
                      ) {
                        return suggestion;
                      }
                    })()}
              </Button>
            )}
          </List>
        </StyledBox>
      </Popover>
    </Column>
  );
}
