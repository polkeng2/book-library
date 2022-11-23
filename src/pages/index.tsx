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
        console.log(bookList);
      }
    },
  });

  const addBookState = (book: book) => {
    setBookList([...bookList, book]);
  };

  const editBookState = (book: book) => {
    let idBook = bookList.find((b) => b.id === book.id);
    idBook = book;
    setBookList([...bookList, book]);
  };

  const deleteBookState = (book: book) => {
    const books = bookList.filter((b) => b.id !== book.id);
    setBookList(books);
  };

  if (isLoading) return <p>Loading...</p>;

  const emptyBook: book = {
    id: "",
    titol: "",
    autor: "",
    prestatge: "",
    notes: "",
  };

  return (
    <div className="flex h-screen w-full flex-col items-center bg-blue-100 p-20">
      <h1 className="bg-red-100 text-2xl font-bold">Llibreria del papa</h1>
      <button
        className="my-5 rounded bg-green-500 p-2"
        onClick={() => setOpenModal(true)}
      >
        Afegeix un nou llibre
      </button>
      {openModal && (
        <Modal
          setOpenModal={setOpenModal}
          changeBookState={addBookState}
          deleteBookState={deleteBookState}
          bookProp={emptyBook}
        />
      )}
      <div className="flex flex-col gap-2">
        {bookList?.map((book) => (
          <BookInfo
            key={book.id}
            book={book}
            editBookState={editBookState}
            deleteBookState={deleteBookState}
          />
        ))}
      </div>
    </div>
  );
};

export default Home;
