import { book } from "@prisma/client";
import React from "react";
import { Column, useTable } from "react-table";

const BookList = ({ bookData }: { bookData: book[] }) => {
  const data = React.useMemo(() => bookData, [bookData]);
  const columns = React.useMemo<Column<book>[]>(
    () => [
      {
        Header: "Titol",
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
        Header: "Posicio",
        accessor: "posicio",
      },
      {
        Header: "Habitacio",
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
  const table = useTable({ columns, data });

  return (
    <div>
      <table
        className="table-auto border-collapse border border-slate-500"
        {...table.getTableProps()}
      >
        <thead>
          {table.headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <th
                  className="border border-slate-500 px-2"
                  {...column.getHeaderProps()}
                >
                  {column.render("Header")}
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
                  return (
                    <td
                      className="overflow-hidden overflow-ellipsis border border-slate-500 px-2"
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
