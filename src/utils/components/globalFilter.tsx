import React from "react";
import { useAsyncDebounce } from "react-table";

export const GlobalFilter = ({
  globalFilter,
  setGlobalFilter,
}: {
  globalFilter: string;
  setGlobalFilter: any;
}) => {
  const [value, setValue] = React.useState(globalFilter);
  const asyncChange = useAsyncDebounce((value) => {
    setGlobalFilter(value || undefined);
  }, 200);
  return (
    <span>
      Search:{" "}
      <input
        value={value || ""}
        onChange={(e) => {
          setValue(e.target.value);
          asyncChange(e.target.value);
        }}
      />
    </span>
  );
};
