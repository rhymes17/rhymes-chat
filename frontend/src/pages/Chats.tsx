import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { BsThreeDots } from "react-icons/bs";
import { ThreeDots } from "react-loader-spinner";
import { useNavigate } from "react-router-dom";
import { User } from "../types/users";

const Chats = () => {
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchUsers = async () => {
      setIsLoading(true);
      try {
        const res = await axios.get("/api/users");
        const data = await res.data.data;

        setUsers(data);
      } catch (error: any) {
        toast.error(error.response.data.error || error.message);
        console.log("Could not fetch the users", error.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const navigate = useNavigate();

  return (
    <div className="relative">
      <div className="sticky top-0 flex justify-between items-center pb-3 bg-white">
        <h1 className="font-[450] text-[1.1rem]">Chats</h1>
        <BsThreeDots className="text-xl" />
      </div>

      {isLoading ? (
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
      ) : (
        <div className="flex flex-col gap-2">
          {users.length > 0 &&
            users.map((user: User) => (
              <div
                key={user._id}
                className="flex gap-3 items-center cursor-pointer py-2"
                onClick={() => navigate(`/chats/${user._id}`)}
              >
                <div>
                  <img className="w-[40px] h-[40px]" src={user.profilePic} />
                </div>

                <div>
                  <h1 className="text-md font-medium">{user.username}</h1>
                  <h3 className="text-[0.8rem] text-gray-500 font-normal">
                    {user.fullName}
                  </h3>
                </div>
              </div>
            ))}
        </div>
      )}
    </div>
  );
};

export default Chats;
