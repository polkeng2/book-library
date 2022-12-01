import { book } from "@prisma/client";
import React from "react";
import { trpc } from "../trpc";

/* interface emptyBook {
  titol: string;
  autor: string;
  prestatge: string;
  notes: string;
} */

function Modal({
  setOpenModal,
  changeBookState,
  deleteBookState,
  bookProp,
}: {
  setOpenModal: (value: boolean) => void;
  changeBookState: (book: book) => void;
  deleteBookState: (book: book) => void;
  bookProp: book;
}) {
  const [error, setError] = React.useState<string>("");
  const [input, setInput] = React.useState<book>(bookProp);

  const { mutate: createBook, isLoading } = trpc.book.insertBook.useMutation({
    onSuccess: (data) => {
      if (!isLoading && data) {
        changeBookState(data);
        setOpenModal(false);
      }
    },
    onError: (error) => setError(error.message),
  });

  const { mutate: updateBook, isLoading: isUpdating } =
    trpc.book.updateBook.useMutation({
      onSuccess: (data) => {
        if (!isUpdating && data) {
          changeBookState(data);
          setOpenModal(false);
        }
      },
      onError: (error) => setError(error.message),
    });

  const { mutate: deleteBook, isLoading: isDeleting } =
    trpc.book.deleteBook.useMutation({
      onSuccess: (data) => {
        if (!isDeleting && data) {
          deleteBookState(data);
          setOpenModal(false);
        }
      },
      onError: (error) => setError(error.message),
    });

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  //TODO: Show error on input
  const handleError = () => {
    if (error) {
      if (input.titol === "" || input.autor === "" || input.prestatge === "") {
        return "Falten camps per omplir";
      }
    }
    return "";
  };

  return (
    <div className="absolute inset-0 flex bg-black/75">
      <div className="m-auto flex w-[30%] flex-col gap-3 rounded bg-white  p-5 ">
        <div className="flex justify-between ">
          <p className="flex items-center text-2xl font-bold">
            Afegeix un nou llibre
          </p>
          <img
            className="h-10 w-10 cursor-pointer"
            onMouseOver={(e) =>
              (e.currentTarget.src = "https://i.ibb.co/0B10S9z/close-1.png")
            }
            onMouseOut={(e) =>
              (e.currentTarget.src = "https://i.ibb.co/DW9cDJY/close-2.png")
            }
            src="https://i.ibb.co/DW9cDJY/close-2.png"
            onClick={() => setOpenModal(false)}
          />
        </div>
        <p className="text-red-500">{handleError()}</p>
        <div className="flex flex-col">
          <label className="font-bold">Títol</label>
          <input
            className="rounded border py-1 px-2"
            type="text"
            name="titol"
            value={input.titol}
            onChange={handleInput}
          />
        </div>
        <div className="flex flex-col">
          <label className="font-bold">Autor</label>
          <input
            className="rounded border p-1"
            type="text"
            name="autor"
            value={input.autor}
            onChange={handleInput}
          />
        </div>
        <div className="flex flex-col">
          <label className="font-bold">Prestatge</label>
          <input
            className="rounded border p-1"
            type="text"
            name="prestatge"
            value={input.prestatge}
            onChange={handleInput}
          />
        </div>
        <div className="flex flex-col">
          <label className="font-bold">Notes</label>
          <input
            className="rounded border p-1"
            type="text"
            name="notes"
            value={input.notes}
            onChange={handleInput}
          />
        </div>
        <div className="flex flex-row justify-between">
          <button
            className="rounded bg-purple-500 py-2 px-3 font-bold text-white hover:bg-purple-700"
            onClick={() => setOpenModal(false)}
          >
            Cancel
          </button>
          {bookProp.id !== "" ? (
            <button
              className="rounded bg-red-500 py-2 px-3 font-bold text-white hover:bg-red-700"
              onClick={() => deleteBook(input)}
            >
              Delete
            </button>
          ) : null}
          <button
            className="rounded bg-purple-500 py-2 px-3 font-bold text-white hover:bg-purple-700"
            onClick={() =>
              input.id === "" ? createBook(input) : updateBook(input)
            }
          >
            {input.id === "" ? "Create" : "Update"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default Modal;
