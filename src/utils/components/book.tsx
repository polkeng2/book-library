import React from "react";
import { book } from "@prisma/client";
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
  const { titol, autor, prestatge, notes } = book;
  const [openModal, setOpenModal] = React.useState<Boolean>(false);

  return (
    <div className="grid grid-cols-5 rounded border border-solid border-slate-500">
      <p>{titol}</p>
      <p>{autor}</p>
      <p>{prestatge}</p>
      <p>{notes}</p>
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
