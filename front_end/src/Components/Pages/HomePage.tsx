import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Story from "../Components/StoryCard";
import axios from "axios";
import NavBar from "../Components/NavBar";
import { Radio, RadioChangeEvent, Row } from "antd";
import { ConsoleSqlOutlined } from "@ant-design/icons";

type Option = {
  label: string;
  value: string;
};

const options: Option[] = [
  { label: "All", value: "all" },
  { label: "Followings", value: "followings" },
  { label: "Recommended", value: "recommended" },
];

interface Story {
  id: number;
  text: string;
  header: string;
  user: {
    id: number;
    name: string;
  };
  labels: string[];
  likes: number[];
  comments: {
    text: string;
    user: {
      id: number;
      name: string;
    };
    likes: number[];
  }[];
}
const HomePage: React.FC = () => {
  const [stories, setStories] = useState<Story[]>([]);
  const [storySimilarity, setStorySimilarity] = useState<any[] | null>([]);
  const [selectedOption, setSelectedOption] = useState<string>("all");
  const nav = useNavigate();
  useEffect(() => {
    const cookieValue = document.cookie
      .split("; ")
      .find((row) => row.startsWith("jwt_Token"))
      ?.split("=")[1];

    if (!cookieValue) {
      nav("/login");
    }
  }, []);

  useEffect(() => {
    const fetchStories = async () => {
      const userIdPromise = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/users/getname`,
        {
          withCredentials: true,
        }
      );
      const userId = userIdPromise.data.id;
      if (selectedOption === "recommended") {
        const url = `${import.meta.env.VITE_BACKEND_PYTHON_URL}/recommendations?user_id=${userId}`
        const response = await axios.get<Story[]>(url, {
          withCredentials: true,
        });
        const secondResponse = await axios.post(
          `${import.meta.env.VITE_BACKEND_URL}/activity/recommendedstories`,
          {
            storyIds: response.data.map(item => item.id)
          }
        );
        setStories(secondResponse.data);
        setStorySimilarity(response.data);
      } else {
        let url = selectedOption === "all"
          ? `${import.meta.env.VITE_BACKEND_URL}/stories`
          : `${import.meta.env.VITE_BACKEND_URL}/stories/following`;
        let response = await axios.get<Story[]>(url, {
          withCredentials: true,
        });
        setStories(response.data);
        setStorySimilarity(null);
      }
    };

    fetchStories();
  }, [selectedOption]);

  const onRadioChange = (e: RadioChangeEvent) => {
    setSelectedOption(e.target.value);
  };

  return (
    <div className="bg-customGreen h-full">
      <NavBar />
      <h1
        className="text-6xl text-white"
        style={{
          textAlign: "center",
          fontFamily: "HandWriting",
          marginTop: "40px",
          marginBottom: "30px",
        }}
      >
        Recent Stories
      </h1>
      <div className="bg-yellow-50 rounded-3xl mx-5 mt-5 h-full">
        <Row style={{ justifyContent: "center" }}>
          <Radio.Group
            style={{ margin: "5px" }}
            options={options}
            onChange={onRadioChange}
            value={selectedOption}
            optionType="button"
            buttonStyle="solid"
          />
        </Row>
        <div className="flex flex-col mx-auto items-center">
          {stories
            .slice()
            .reverse()
            .map((story: Story) => (
              <div key={story.id} className="p-2">
                <Story story={story} similarity={storySimilarity?.find(item => item?.id === story.id)?.["Recommendation Reason"]} />
              </div>
            ))}
        </div>
      </div>
      {stories.length === 0 && (
        <h2 className="text-white text-5xl" style={{ textAlignLast: "center" }}>
          Nothing to show!
        </h2>
      )}
    </div>
  );
};

export default HomePage;
