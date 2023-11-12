import axios from "axios";
import { useState, useEffect } from "react";
import { API_URL } from "../contexts/AuthContext";
import { Feather } from "@expo/vector-icons";
import { TouchableOpacity, Button } from "react-native";

interface User {
  id: number;
  name: string;
}
type Props = {
  id: number;
  followers?: User[];
  onFollowedChange: (followed: boolean) => void; // Callback function to notify the parent component
};

function FollowButton({ followers, id }: Props) {
  const [followed, setFollowed] = useState(false);
  const [pressed, setPressed] = useState(true);
  const [user, setUser] = useState<User>();
  const icon = followed ? (
    <Feather name="user-minus" size={30} color="white" />
  ) : (
    <Feather name="user-plus" size={30} color="white" />
  );

  useEffect(() => {
    const fetchUser = async () => {
      try {
        
        const response = await axios.get<User>(`${API_URL}/users/profile`, {
          withCredentials: true,
        });
        const user = response.data;
        setUser(user);
        if (followers?.some((follower) => follower.id === user.id)) {
          setFollowed(true);
        } else {
          setFollowed(false);
        }
        console.log(followed)
      } catch (error) {
        console.error(error);
      }
    };

    fetchUser();
  }, [pressed]);

  const handleClick = () => {
    axios
      .post(`${API_URL}/users/follow/${id}`, null, { withCredentials: true })
      .then((response) => {
        if (response.status === 200) {
            setPressed(!pressed);
        }
        
      })
      .catch((error) => {
        console.error("Error liking:", error);
      });
      setPressed(!pressed);
  };

  return (
    <>
      <TouchableOpacity onPress={handleClick} style={{ marginLeft: 20 }}>
        {icon}
      </TouchableOpacity>
    </>
  );
}

export default FollowButton;
