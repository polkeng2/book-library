import type { NextPage } from "next";
import { trpc } from "../utils/trpc";
import Modal from "../utils/modal";
import React from "react";

const Home: NextPage = () => {
  const [openModal, setOpenModal] = React.useState<Boolean>(true);

  const { data: books } = trpc.book.getAllBooks.useQuery();
  return (
    <div className="h-screen w-full bg-blue-100 p-5">
      <h1 className="my-8 flex justify-center bg-red-100 text-2xl font-bold">
        Llibreria del papa
      </h1>
      {openModal && <Modal setOpenModal={setOpenModal} />}
    </div>
  );
};

export default Home;
