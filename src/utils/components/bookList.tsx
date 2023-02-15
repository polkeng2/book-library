import { book } from "@prisma/client";
import React from "react";
import {
  Column,
  HeaderGroup,
  useFilters,
  useSortBy,
  useTable,
} from "react-table";
import { trpc } from "../trpc";
import DefaultColumnFilter from "./defaultFilter";
const BookList = ({
  bookData,
  refetch,
}: {
  bookData: book[];
  refetch: () => void;
}) => {
  const { mutate: deleteBook, isLoading } = trpc.book.deleteBook.useMutation({
    onSuccess: (data) => {
      if (!isLoading && data) {
        refetch();
      }
    },
  });
  const data = React.useMemo(() => bookData, [bookData]);
  const columns = React.useMemo<Column<any>[]>(
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
        width: "0.5rem",
        Header: "Prestatge",
        accessor: "prestatge",
      },
      {
        width: "0.5rem",
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
      {
        Header: "Editar",
        accessor: "id",
        Cell: ({ cell }) => (
          <button
            className="rounded bg-green-500 p-2"
            value={cell.row.values.name}
            onClick={() => deleteBook(cell.row.values.id)}
          >
            Editar entrada
          </button>
        ),
      },
    ],
    []
  );

  const defaultColumn: any = React.useMemo(
    // TODO: fix any
    () => ({
      // Let's set up our default Filter UI
      Filter: DefaultColumnFilter,
    }),
    []
  );

  const { getTableProps, headerGroups, getTableBodyProps, rows, prepareRow } =
    useTable({ columns, data, defaultColumn }, useFilters, useSortBy);

  return (
    <div>
      <table
        className="table-auto border-collapse border border-slate-500"
        {...getTableProps()}
      >
        <thead>
          {headerGroups.map((headerGroup: HeaderGroup) => (
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
                  {column.canFilter ? column.render("Filter") : null}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {rows.map((row) => {
            prepareRow(row);
            return (
              <tr className="px-2 py-1" {...row.getRowProps()}>
                {row.cells.map((cell) => {
                  return (
                    <td
                      className="overflow-hidden overflow-ellipsis border border-slate-500 bg-neutral-100 px-2"
                      {...cell.getCellProps({
                        style: {
                          width: cell.column.width,
                          textAlign: "center",
                        },
                      })}
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
