import { BsThreeDots } from "react-icons/bs";

const Chats = () => {
  return (
    <div className="relative">
      <div className="sticky top-0 flex justify-between items-center">
        <h1 className="font-[450] text-[1.1rem]">Chats</h1>
        <BsThreeDots className="text-xl" />
      </div>
    </div>
  );
};

export default Chats;
