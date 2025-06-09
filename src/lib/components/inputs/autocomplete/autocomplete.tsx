import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import Input from "../input";
import Popover from "../../popups/components/popover";
import { List, StyledBox } from "../../structure";
import { IPopoverProps } from "../../popups/components/popover/types";
import { IAutocompleteProps } from "./types";
import Button from "../../button";

export default function Autocomplete<T>({
  className,
  value,
  suggestions,
  field,
  onChange,
  onSuggest,
  suggestedItemsSlots,
}: IAutocompleteProps<T>) {
  const popoverRef = useRef<{ close: () => void } | null>(null);

  const filterByValue = useCallback(
    function (item: T) {
      return String(item).match(value);
    },
    [value]
  );

  const selectSuggestion = useCallback(
    function (suggestion: T) {
      if (field) {
        onChange(suggestion[field] as string);
      } else {
        onChange(suggestion as string);
      }
    },
    [field, onChange]
  );

  const inputRef = useRef(null);
  const [relatedSuggestions, setRelatedSuggestions] = useState(suggestions);

  useEffect(() => {
    setRelatedSuggestions(
      suggestions.filter(onSuggest ? onSuggest : filterByValue)
    );
  }, [filterByValue, suggestions, onSuggest]);

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
    <>
      <Input
        className={className}
        ref={inputRef}
        value={value}
        onChange={onChange}
        variant="outlined"
        severity="primary"
      ></Input>

      <Popover {...popoverProps} ref={popoverRef}>
        <StyledBox
          className="h-[200px] border-1 border-black-base/25 "
          elevation="level-4"
          severity="base"
          dense
        >
          <List data={relatedSuggestions} direction="column">
            {(suggestion) => (
              <Button
                onClick={() => {
                  selectSuggestion(suggestion);
                  console.log("hice click");
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
    </>
  );
}
