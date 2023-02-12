import { book } from "@prisma/client";
import type { NextPage } from "next";
import React from "react";
import BookList from "../utils/components/bookList";
import Modal from "../utils/components/modal";
import { trpc } from "../utils/trpc";

const Home: NextPage = () => {
  const [openModal, setOpenModal] = React.useState<Boolean>(false);
  const { data, isLoading, refetch } = trpc.book.getAllBooks.useQuery();

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
          refetch={refetch}
          setOpenModal={setOpenModal}
          bookProp={emptyBook}
        />
      )}
      {data ? <BookList bookData={data} refetch={refetch} /> : null}
    </div>
  );
};

export default Home;
