import UserOutlined from "@ant-design/icons/lib/icons/UserOutlined";
import { Card } from "antd";
import { Col, Row } from "react-bootstrap";
import LikeButton from "./LikeButton";

import { Avatar } from "@mui/material";

interface Comment {
  id: number;

  text: string;
  user: {
    id: number;
    name: string;
    photo?: string;
  };
  likes: number[];
}

interface CommentProps {
  comment: Comment;
  storyId: number;
}

const CommentComponent: React.FC<CommentProps> = ({ comment, storyId }) => {
  return (
    <div className="bg-white rounded-2xl shadow-2xl my-1 border-customGreenD border-2 border-solid max-w-3xl p-3 flex items-start">
    {comment.user?.name && (
      <div className="mr-3 text-center">
        <Avatar
          sx={{ width: 70, height: 70 }}
          alt={comment.user?.name}
          src={comment.user?.photo}
          className="mb-2"
        />
        <p className="font-semibold">{comment.user.name}</p>
      </div>
    )}
    <div className="flex-grow">
      <p className="text-lg">{comment.text}</p>
    </div>
    <div className="flex items-center">
      <p className="mr-3 font-semibold">Likes: {comment.likes.length}</p>
      <LikeButton type="comment" id={storyId} commentId={comment.id} />
    </div>
  </div>
  
  );
};

export default CommentComponent;
