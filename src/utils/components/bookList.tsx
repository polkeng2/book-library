import { book } from "@prisma/client";
import React from "react";
import { Column, Row, useSortBy, useTable } from "react-table";

const BookList = ({ bookData }: { bookData: book[] }) => {
  const data = React.useMemo(() => bookData, [bookData]);
  const columns = React.useMemo<Column<book>[]>(
    () => [
      {
        Header: "Títol",
        accessor: "titol",
      },
      {
        Header: "Autor",
        accessor: "autor",
      },
      {
        Header: "Prestatge",
        accessor: "prestatge",
      },
      {
        Header: "Posició",
        accessor: "posicio",
      },
      {
        Header: "Habitació",
        accessor: "habitacio",
      },
      {
        Header: "Tipus",
        accessor: "tipus",
      },
      {
        Header: "Editorial",
        accessor: "editorial",
      },
      {
        Header: "Idioma",
        accessor: "idioma",
      },
      {
        Header: "Notes",
        accessor: "notes",
      },
    ],
    []
  );
  const tableHooks = (hooks: any) => {
    hooks.visibleColumns.push((columns: Column[]) => {
      return [
        ...columns,
        {
          id: "Delete",
          Header: "Delete",
          Cell: (row: Row) => (
            <button onClick={() => alert("xd")}>Delete</button>
          ),
        },
      ];
    });
  };

  const table = useTable({ columns, data }, useSortBy, tableHooks);

  return (
    <div>
      <table
        className="table-auto border-collapse border border-slate-500"
        {...table.getTableProps()}
      >
        <thead>
          {table.headerGroups.map((headerGroup: any) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column: any) => (
                <th
                  className="border border-slate-500 bg-neutral-300 px-2"
                  {...column.getHeaderProps(column.getSortByToggleProps())}
                >
                  <div className="whitespace-nowrap">
                    {column.render("Header")}
                    {column.isSorted ? (column.isSortedDesc ? " ▾" : " ▴") : ""}
                  </div>
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...table.getTableBodyProps()}>
          {table.rows.map((row) => {
            table.prepareRow(row);
            return (
              <tr className="px-2 py-1" {...row.getRowProps()}>
                {row.cells.map((cell) => {
                  table.prepareRow(row);
                  return (
                    <td
                      className="overflow-hidden overflow-ellipsis border border-slate-500 bg-neutral-100 px-2"
                      {...cell.getCellProps()}
                    >
                      {cell.render("Cell")}
                    </td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default BookList;
