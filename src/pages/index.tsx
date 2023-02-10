import { book } from "@prisma/client";
import type { NextPage } from "next";
import React from "react";
import BookList from "../utils/components/bookList";
import Modal from "../utils/components/modal";
import { trpc } from "../utils/trpc";

const Home: NextPage = () => {
  const [openModal, setOpenModal] = React.useState<Boolean>(false);
  const [bookList, setBookList] = React.useState<book[]>([]);
  const { data, isLoading } = trpc.book.getAllBooks.useQuery(undefined, {
    onSuccess: (data) => {
      if (data) {
        setBookList(data);
      }
    },
  });

  const addBookState = (book: book) => {
    setBookList([...bookList, book]);
  };

  const editBookState = (book: book) => {
    console.log(book);
    const index = bookList.findIndex((b) => b.id === book.id);
    const newBookList = [...bookList];
    newBookList[index] = book;
    setBookList(newBookList);
  };

  const deleteBookState = (book: book) => {
    const books = bookList.filter((b) => b.id !== book.id);
    setBookList(books);
  };

  if (isLoading) return <p>Loading...</p>;

  const emptyBook: book = {
    id: -1,
    titol: "",
    autor: "",
    prestatge: "",
    posicio: "",
    habitacio: "",
    tipus: "",
    editorial: "",
    idioma: "",
    notes: "",
  };

  return (
    <div className="flex h-screen w-full flex-col items-center bg-blue-100 p-20">
      <h1 className="bg-red-100 text-2xl font-bold">Biblioteca del papa</h1>
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
      {data ? <BookList bookData={data} /> : null}
    </div>
  );
};

export default Home;
