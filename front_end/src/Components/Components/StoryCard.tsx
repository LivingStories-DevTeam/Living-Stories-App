import React, { useState } from "react";
import { UserOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import { Avatar, Chip } from "@mui/material";
import ShareIcon from "@mui/icons-material/Share";
import Card from "@mui/material/Card";
import Tooltip from "@mui/material/Tooltip";
import ThumbUpOffAltIcon from "@mui/icons-material/ThumbUpOffAlt";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import CommentIcon from "@mui/icons-material/Comment";
import { Space } from "antd";
interface Story {
  id: number;

  header: string;
  user?: {
    id: number;
    name: string;
    photo?: string;
  };
  labels: string[];

  locations?: {
    id: number;
    lat: number;
    lng: number;
    name: string;
    country?: string;
    city?: string;
  }[];
  comments: {
    text: string;
    user: {
      id: number;
      name: string;
    };
    likes: number[];
  }[];
  startDate?: string;
  endDate?: string;
  likes: number[];
  decade?: string;
}

interface StoryProps {
  story: Story;
  similarity?: string;
}

const StoryComponent: React.FC<StoryProps> = ({ story, similarity }) => {
  const [showMore, setShowMore] = useState(false);
  const handleShowMore = () => {
    setShowMore(!showMore);
  };

  const handleCopy = (storyid: number) => {
    const url = `${window.location.origin}/stories/${storyid}`;
    navigator.clipboard.writeText(url);
  };

  return (
    <div style={{ textDecoration: "none", cursor: "pointer" }} className="m-4">
      <Card
        sx={{ maxWidth: 750, minWidth: 700, width: "100%", height: "100%" }}
        className="shadow-md h-fit transition duration-300 ease-in-out transform hover:scale-105 hover:shadow-2xl"
      >
        <Tooltip title="Copy">
          <ShareIcon
            onClick={() => handleCopy(story.id)}
            className="shareicon cursor-pointer m-3 transition duration-500 ease-in-out transform hover:scale-125 absolute top-0 right-0 z-50"
          />
        </Tooltip>
        <div className="p-4">
          <Link to={`/stories/${story.id}`}>
            <p className="text-gray-700 float-right flex text-sm mb-2 mt-4">
              {story.decade === undefined ||
                (story.decade === null && (
                  <>
                    {story.startDate} - {story.endDate}
                  </>
                ))}
              {story.decade !== null && <>{story.decade}</>}
            </p>{" "}
            <h2 className="text-xl font-bold text-gray-900 mb-2">
              {story.header}
            </h2>
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center">
                <Avatar
                  sx={{ width: 50, height: 50 }}
                  alt={story.user?.name}
                  src={story.user?.photo}
                  className="mr-2"
                />
                <span className="text-gray-700 text-base font-semibold">
                  {story.user?.name}
                </span>
              </div>
            </div>
            <div className="flex justify-between">
              <p className="text-gray-700 flex text-sm mb-2">
                <LocationOnIcon fontSize="small" className="mr-1" />
                <Space>
                {(story as any).locationsAdvanced?.map((location: any) => (
                  <p
                    key={location.id}
                  >&nbsp;{` ${location.city} / ${location.country}  `}&nbsp;</p>
                ))}
                </Space>
              </p>
              {similarity && (
                <div>
                  <label className="text-sm font-semibold">
                    Similarity: &nbsp;
                  </label>
                  <Chip
                    color="warning"
                    className="bg-orange-60"
                    label={similarity}
                  />
                </div>
              )}
              <p className="text-gray-700 text-sm mb-2">
                <ThumbUpOffAltIcon fontSize="small" className="mx-1" />
                {story.likes.length}
                <CommentIcon fontSize="small" className="mx-1" />
                {story.comments.length}
              </p>
            </div>
          </Link>
          <div>
            {story.labels && (
              <div>
                {story.labels.slice(0, 6).map((label, index) => (
                  <Chip
                    className="w-fit feed-chip bg-customGreen mr-1"
                    key={label}
                    color="success"
                    label={label}
                    size="small"
                  />
                ))}
                {story.labels.length > 6 &&
                  story.labels.slice(6).length > 0 && (
                    <button
                      className="text-blue-500 text-sm float-right font-semibold mt-2 focus:outline-none"
                      onClick={handleShowMore}
                    >
                      {showMore
                        ? "Show Less"
                        : `+${story.labels.slice(6).length} more`}
                    </button>
                  )}
                {showMore &&
                  story.labels
                    .slice(6)
                    .map((label, index) => (
                      <Chip
                        className="w-fit feed-chip bg-customGreen mr-1"
                        key={label}
                        label={label}
                        color="success"
                        size="small"
                      />
                    ))}
              </div>
            )}
          </div>
        </div>
      </Card>
    </div>
  );
};

export default StoryComponent;
