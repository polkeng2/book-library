import { book } from "@prisma/client";
import React from "react";
import {
  Column,
  HeaderGroup,
  useGlobalFilter,
  useSortBy,
  useTable,
} from "react-table";
import { trpc } from "../trpc";

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
      {
        Header: "Delete",
        accessor: "id",
        Cell: ({ cell }) => (
          <button
            value={cell.row.values.name}
            onClick={() => deleteBook(cell.row.values.id)}
          >
            Delete button with id
          </button>
        ),
      },
    ],
    []
  );

  const {
    getTableProps,
    headerGroups,
    getTableBodyProps,
    rows,
    prepareRow,
    state,
  } = useTable({ columns, data }, useGlobalFilter, useSortBy);

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
                  {column.canFilter ? column.render("Filter") : null}
                  <div className="whitespace-nowrap">
                    {column.render("Header")}
                    {column.isSorted ? (column.isSortedDesc ? " ▾" : " ▴") : ""}
                  </div>
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
