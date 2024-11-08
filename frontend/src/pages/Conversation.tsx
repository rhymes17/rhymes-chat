import axios from "axios";
import { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import { LuChevronLeft } from "react-icons/lu";
import { useNavigate, useParams } from "react-router-dom";
import { Message, User } from "../types/users";
import { ThreeDots } from "react-loader-spinner";
import { useAuth } from "../context/useAuth";
import Input from "../components/Input";
import { FiSend } from "react-icons/fi";
import { useSocket } from "../context/useSocket";

const Conversation = () => {
  const [otherUser, setOtherUser] = useState<User | undefined>();
  const [isLoading, setIsLoading] = useState(false);
  const [conversation, setConversation] = useState<Message[]>([]);
  const [message, setMessage] = useState("");

  const { id: otherUserId } = useParams();
  const { user } = useAuth();
  const navigate = useNavigate();
  const { socket } = useSocket();

  if (!user) {
    navigate("/login");
    return;
  }

  useEffect(() => {
    if (socket) {
      socket.on("newMessage", (newMessage: Message) => {
        setConversation((prev) => [...prev, newMessage]);
      });
    }

    return () => socket?.off("newMessage");
  }, [socket]);

  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [conversation.length]);

  useEffect(() => {
    const fetchUsers = async () => {
      setIsLoading(true);
      try {
        const res = await axios.get(`/api/users/${otherUserId}`);
        const data = await res.data.data;

        setOtherUser(data);
        const conversationRes = await axios.get(`/api/messages/${otherUserId}`);
        const conversationData = await conversationRes.data.data;

        setConversation(conversationData);
      } catch (error: any) {
        toast.error(error.response.data.error || error.message);
        console.log("Could not fetch the users", error.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const handleSendMessage = async (e: any) => {
    if (!message) {
      return;
    }
    e.preventDefault();
    try {
      await axios.post(`/api/messages/send/${otherUserId}`, {
        message,
      });
      setMessage("");
    } catch (error: any) {
      console.log("Error sending message", error.message);
      toast.error(error.response.data.error || error.message);
    }
  };

  return (
    <div className="relative min-h-[100%] flex flex-col scrollbar-hide">
      <div className="py-5 w-[100%] px-3 flex justify-between sticky top-0 bg-[rgb(255,255,255)] border-b-[1px] border-black/10">
        <div className="flex w-full gap-3 items-center">
          <LuChevronLeft
            className="text-xl cursor-pointer"
            onClick={() => navigate("/")}
          />
          <h1 className="text-xl font-medium tracking-wide ">
            {otherUser ? otherUser.username : "User"}
          </h1>
        </div>
      </div>

      {isLoading ? (
        <div className="flex flex-1 justify-center items-center px-5 ">
          <ThreeDots
            visible={true}
            height="50"
            width="30"
            color="black"
            radius="10"
            ariaLabel="three-dots-loading"
            wrapperStyle={{}}
            wrapperClass=""
          />
        </div>
      ) : conversation.length > 0 ? (
        <div className="flex flex-col gap-2 px-3 flex-1 justify-end mt-3">
          {conversation.map((message: Message) => (
            <div
              key={message._id}
              className={`flex gap-3 items-end ${
                user.id === message.senderId ? "justify-end " : "justify-start"
              }`}
            >
              {user.id !== message.senderId && (
                <div className="pb-1">
                  <img
                    className="h-[30px] w-[30px]"
                    src={otherUser?.profilePic}
                  />
                </div>
              )}
              <div
                className={` ${
                  user.id !== message.senderId
                    ? "bg-[#F7F7F7] "
                    : "bg-secondary"
                } max-w-[80%] px-3 py-2 rounded-lg`}
              >
                <h1 className="text-[0.9rem] font-normal text-black">
                  {message.message}
                </h1>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="flex flex-1 justify-center items-end px-5 ">
          <h1 className="bg-secondary/65 px-3 py-2 rounded-2xl">
            Send a message to start the conversation.
          </h1>
        </div>
      )}
      <form
        onSubmit={handleSendMessage}
        className="sticky bottom-0 mt-3 z-10 bg-white border-t-[1px] border-black/10 px-1"
      >
        <Input
          type="text"
          placeholder="Enter your message"
          value={message}
          onInputChange={(e) => setMessage(e.target.value)}
          rightElement={
            <FiSend
              type="submit"
              onClick={handleSendMessage}
              className="text-xl"
            />
          }
          styleProps={{
            border: "none",
            borderTop: "none",
            height: "60px",
          }}
        />
      </form>
      <div ref={bottomRef} />
    </div>
  );
};

export default Conversation;
