import React from "react";
import { book } from "@prisma/client";

function BookInfo({ book }: { book: book }) {
  const { titol, autor, prestatge } = book;
  return (
    <div className="grid grid-cols-4 rounded border border-solid border-slate-500">
      <p>{titol}</p>
      <p>{autor}</p>
      <p>{prestatge}</p>
      <div>buttons</div>
    </div>
  );
}

export default BookInfo;
