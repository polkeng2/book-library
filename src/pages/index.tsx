import type { NextPage } from "next";
import { trpc } from "../utils/trpc";
import Modal from "../utils/components/modal";
import { book } from "@prisma/client";
import React from "react";
import BookInfo from "../utils/components/book";

const Home: NextPage = () => {
  const [openModal, setOpenModal] = React.useState<Boolean>(false);
  const [bookList, setBookList] = React.useState<book[]>([]);
  const { isLoading } = trpc.book.getAllBooks.useQuery(undefined, {
    onSuccess: (data) => {
      if (data) {
        setBookList(data);
      }
    },
  });

  const addBookState = (book: book) => {
    setBookList([...bookList, book]);
  };

  if (isLoading) return <p>Loading...</p>;

  return (
    <div className="flex h-screen w-full flex-col items-center bg-blue-100 p-5">
      <h1 className="my-8 bg-red-100 text-2xl font-bold">Llibreria del papa</h1>
      <button
        className="rounded bg-green-500 p-2"
        onClick={() => setOpenModal(true)}
      >
        Afegeix un nou llibre
      </button>
      {openModal && (
        <Modal setOpenModal={setOpenModal} addBookState={addBookState} />
      )}
      <div>
        {bookList?.map((book) => (
          <BookInfo key={book.id} book={book} />
        ))}
      </div>
    </div>
  );
};

export default Home;
