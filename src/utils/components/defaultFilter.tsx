import { Row } from "react-table";

interface DefaultColumnFilterProps {
  column: {
    filterValue: any;
    preFilteredRows: Array<Row>;
    setFilter: (filterValue: any) => void;
  };
}

function DefaultColumnFilter(props: DefaultColumnFilterProps) {
  const {
    column: { filterValue, preFilteredRows, setFilter },
  } = props;
  const count = preFilteredRows.length;

  // Crea una función que retorne el string de input sin acentos
  const removeAccents = (str: string) => {
    return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  };

  return (
    <div className="m-2 mx-auto">
      <input
        className="mx-auto w-[80%]"
        value={filterValue || ""}
        onChange={(e) => {
          const value = removeAccents(e.target.value);
          setFilter(value || undefined); // Set undefined to remove the filter entirely
        }}
      />
    </div>
  );
}

export default DefaultColumnFilter;
