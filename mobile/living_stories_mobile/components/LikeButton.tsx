import { useEffect, useState } from "react";
import axios from "axios";
import React from "react";
import { API_URL } from "../contexts/AuthContext";
import { AntDesign } from "@expo/vector-icons";
import { Button, TouchableOpacity, Text } from "react-native";
import { Alert } from "react-native";
interface User {
  id: number;
  name: string;
}

type Props = {
  type: "comment" | "story";
  id: number;
  commentId?: number;
  likeNumber: number;
};

function LikeButton({ type, id, commentId, likeNumber }: Props) {
  const [liked, setLiked] = useState(false);
  const [likeCouunt, setLikeCount] = useState<number>(likeNumber);

  const icon = liked ? (
    <AntDesign name="like1" size={24} color="black" />
  ) : (
    <AntDesign name="like2" size={24} color="black" />
  );

  useEffect(() => {
    const fetchUser = async () => {
      const url =
        type === "comment"
          ? `${API_URL}/stories/commentliked/${id}`
          : `${API_URL}/stories/storyliked/${id}`;
      try {
        const response = await axios.get<string>(url, {
          withCredentials: true,
        });

        if (response.data === "yes") {
          setLiked(true);
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchUser();
  }, [liked]);

  const handleClick = () => {
    const url =
      type === "comment"
        ? `${API_URL}/stories/comments/like/${commentId}`
        : `${API_URL}/stories/like/${id}`;

    axios
      .post(url, null, { withCredentials: true })
      .then((response) => {
        if (response.status === 200) {
          if (liked) {
            setLikeCount(likeCouunt - 1);
            setLiked(false);
          
          } else {
            setLikeCount(likeCouunt + 1);
            setLiked(true);
            Alert.alert("You liked the story!")
        }
        }
      })
      .catch((error) => {
        console.error("Error liking:", error);
      });
  };

  return (
    <>
      <TouchableOpacity onPress={handleClick} style={{ marginLeft: 20 }}>
        {icon}
      </TouchableOpacity>
      <Text
        style={{ marginLeft: 10, marginTop: 7, fontSize: 15, color: "#1f6c5c" }}
      >
        {likeCouunt}
      </Text>
    </>
  );
}

export default LikeButton;
