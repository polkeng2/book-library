import type { NextPage } from "next";
import { trpc } from "../utils/trpc";
import Modal from "../utils/modal";
import React from "react";

const Home: NextPage = () => {
  const [openModal, setOpenModal] = React.useState<Boolean>(false);

  const { data: books, isLoading } = trpc.book.getAllBooks.useQuery();

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
      {openModal && <Modal setOpenModal={setOpenModal} />}
    </div>
  );
};

export default Home;
