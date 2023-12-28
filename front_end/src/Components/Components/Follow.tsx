import axios from "axios";
import { useState, useEffect } from "react";
import { StoryInt } from "../../Interfaces/StoryInt";
import { Button } from "antd";
import PlusCircleFilled from "@ant-design/icons/lib/icons/PlusCircleFilled";
import MinusCircleFilled from "@ant-design/icons/lib/icons/MinusCircleFilled";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import PersonRemoveAlt1Icon from "@mui/icons-material/PersonRemoveAlt1";

interface User {
  id: number;
  name: string;
}
type Props = {
  id: number;
  followers?: User[];
};

function FollowButton({ followers, id }: Props) {
  const [followed, setFollowed] = useState(false);
  const [user, setUser] = useState<User>();
  const icon = followed ? <MinusCircleFilled /> : <PlusCircleFilled />;

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get<User>(
          `${import.meta.env.VITE_BACKEND_URL}/users/profile`,
          { withCredentials: true }
        );
        const user = response.data;
        setUser(user);
        if (followers?.some((follower) => follower.id === user.id)) {
          setFollowed(true);
        } else {
          setFollowed(false);
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchUser();
  }, [followers]);

  const handleClick = () => {
    axios
      .post(`${import.meta.env.VITE_BACKEND_URL}/users/follow/${id}`, null, {
        withCredentials: true,
      })
      .then((response) => {
        if (response.status === 200) {
          setFollowed(true);
          window.location.reload(); // Reload the page
        }
      })
      .catch((error) => {
        console.error("Error liking:", error);
      });
  };

  return (
    <>
      {" "}
      <button
        onClick={handleClick}
        className="text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
      >
        <span className="relative px-5 py-2.5 transition-all ease-in duration-75  rounded-md group-hover:bg-opacity-0">
          {followed ? (
            <>
              <PersonRemoveAlt1Icon />{"  "}
              Unfollow
            </>
          ) : (
            <>
              <PersonAddIcon />{"  "}
              Follow
            </>
          )}
        </span>
      </button>
    </>
  );
}

export default FollowButton;
