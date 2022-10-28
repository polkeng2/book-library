import React from "react";
import { trpc } from "../utils/trpc";

function Modal({ setOpenModal }: { setOpenModal: (value: boolean) => void }) {
  const [input, setInput] = React.useState<String>("");

  const { mutate: createBook } = trpc.book.insertBook.useMutation();
  return (
    <div className="absolute inset-0 flex bg-black/75">
      <div className="gap- m-auto flex w-[30%] flex-col gap-4 rounded bg-white  p-5 ">
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
        <div className="flex flex-col">
          <label className="font-bold">Títol</label>
          <input className="rounded border py-1 px-2" type="text" />
        </div>
        <div className="flex flex-col">
          <label className="font-bold">Autor</label>
          <input className="rounded border p-1" type="text" />
        </div>
        <div className="flex flex-col">
          <label className="font-bold">Llibreria</label>
          <input className="rounded border p-1" type="text" />
        </div>
        <div className="flex flex-col">
          <label className="font-bold">Posició</label>
          <input className="rounded border p-1" type="text" />
        </div>
        <div className="flex flex-row justify-between">
          <button
            className="rounded bg-purple-500 py-2 px-3 font-bold text-white hover:bg-purple-700"
            onClick={() => setOpenModal(false)}
          >
            Cancel
          </button>
          <button className="rounded bg-purple-500 py-2 px-3 font-bold text-white hover:bg-purple-700">
            Add
          </button>
        </div>
      </div>
    </div>
  );
}

export default Modal;
