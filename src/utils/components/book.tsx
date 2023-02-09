import { book } from "@prisma/client";
import React from "react";
import Modal from "./modal";

function BookInfo({
  book,
  editBookState,
  deleteBookState,
}: {
  book: book;
  editBookState: (book: book) => void;
  deleteBookState: (book: book) => void;
}) {
  const {
    titol,
    autor,
    prestatge,
    posicio,
    habitacio,
    tipus,
    editorial,
    idioma,
    notes,
  } = book;
  const [openModal, setOpenModal] = React.useState<Boolean>(false);

  return (
    <div className="grid grid-flow-col rounded border border-solid border-slate-500">
      <p className="p-1">{titol}</p>
      <p className="p-1">{autor}</p>
      <p className="p-1">{prestatge}</p>
      <p className="p-1">{posicio}</p>
      <p className="p-1">{habitacio}</p>
      <p className="p-1">{tipus}</p>
      <p className="p-1">{editorial}</p>
      <p className="p-1">{idioma}</p>
      <p className="p-1">{notes}</p>
      <button
        className="rounded bg-green-400"
        onClick={() => setOpenModal(true)}
      >
        Edit
      </button>
      {openModal && (
        <Modal
          setOpenModal={setOpenModal}
          changeBookState={editBookState}
          deleteBookState={deleteBookState}
          bookProp={book}
        />
      )}
    </div>
  );
}

export default BookInfo;
