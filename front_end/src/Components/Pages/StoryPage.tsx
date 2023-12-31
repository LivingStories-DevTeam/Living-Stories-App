import { FC, useEffect, useMemo, useState } from "react";
import { useParams, Params, Link } from "react-router-dom";
import { StoryInt } from "../../Interfaces/StoryInt";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import "react-quill/dist/quill.snow.css";
import { Col, Container, Row } from "react-bootstrap";
import NavBar from "../Components/NavBar";
import {
  Circle,
  GoogleMap,
  Marker,
  Polygon,
  Rectangle,
} from "@react-google-maps/api";
import { Avatar, Chip, Card } from "@mui/material";
import { useNavigate } from "react-router-dom";
import LikeButton from "../Components/LikeButton";
import FollowButtonIcon from "../Components/FollowButton";
import MessageFilled from "@ant-design/icons/lib/icons/MessageFilled";
import CommentComponent from "../Components/CommentCard";
import icon from "../../assets/images/icon-resized.png";
import HistoryEduIcon from "@mui/icons-material/HistoryEdu";
import PeopleIcon from "@mui/icons-material/People";
import summer from "../icons/summer.png";
import winter from "../icons/snowflake.png";
import fall from "../icons/fall.png";
import spring from "../icons/spring.png";
import start from "../icons/sunrise.png";
import end from "../icons/sunset.png";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
interface StoryPageProps {
  story: StoryInt;
}

interface RouteParams extends Params {
  id: string;
}
interface Location {
  lat: number;
  lng: number;
  name: string;
}

interface LocationProps {
  slocations: Location[];
}

interface CommentRequestInt {
  text: string;
  storyId: number;
}
interface User {
  id: number;
  name: string;
  photo?: ArrayBuffer | null;
}

interface UserInfo {
  id: number;
  name: string;
  photo?: ArrayBuffer | null;
  biography?: string | null;
  stories?: StoryInt[];
  comments?: Comment[];
  followers?: User[];
  following?: User[];
}
const StoryPage: React.FC<StoryPageProps> = ({ story }) => {
  const [mapKey, setMapKey] = useState(0);
  const [isAuthor, setIsAuthor] = useState<boolean>(false);
  const [user, setUser] = useState<UserInfo | null>(null);
  const [likedUsers, setLikedUsers] = useState<UserInfo[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchData() {
      const response_user = await axios.get<User>(
        `${import.meta.env.VITE_BACKEND_URL}/users/profile`,
        { withCredentials: true }
      );

      if (response_user.data.name === story.user.name) {
        setIsAuthor(true);
      }
      setMapKey((prev) => prev + 1);
    }

    const fetchUser = async () => {
      try {
        const response = await axios.get<User>(
          `${import.meta.env.VITE_BACKEND_URL}/users/${story.user.name}`,
          { withCredentials: true }
        );

        setUser(response.data);
        console.log(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchUser();
    fetchData();
  }, [story]);

  useEffect(() => {
    const fetchLikes = async () => {
      const url = `${import.meta.env.VITE_BACKEND_URL}/users/Likelist/${
        story.id
      }`;

      try {
        const response = await axios.get<UserInfo[]>(url);

        if (response.data) {
          setLikedUsers(response.data);
          console.log(response.data);
        }
      } catch (error) {
        console.error(error);
      }
    };
    console.log(storyId);

    fetchLikes();
  }, [story]);

  useEffect(() => {
    const cookieValue = document.cookie
      .split("; ")
      .find((row) => row.startsWith("jwt_Token"))
      ?.split("=")[1];

    if (!cookieValue) {
      navigate("/login");
    }
  }, []);

  const slocations = (story as any).locationsAdvanced;
  const slocationsold = (story as any).locations;
  const StoryMarkers: React.FC<any> = useMemo(
    () =>
      ({ slocations, slocationsold }) => {
        let overlays = slocations.map((location: any, index: any) => {
          switch (location.type) {
            case "Point":
              return (
                <Marker
                  key={`marker-${index}`}
                  icon={icon}
                  position={{
                    lat: location.coordinates[0][1],
                    lng: location.coordinates[0][0],
                  }}
                />
              );
            case "Circle":
              return (
                <>
                  <Marker
                    key={`marker-${index}`}
                    icon={icon}
                    position={{
                      lat: location.coordinates[0][1],
                      lng: location.coordinates[0][0],
                    }}
                  />
                  <Circle
                    options={{ fillOpacity: 0.1 }}
                    key={`circle-${index}`}
                    center={{
                      lat: location.coordinates[0][1],
                      lng: location.coordinates[0][0],
                    }}
                    radius={location.radius}
                  />
                </>
              );
            case "Polygon":
              const polygonCoordinates = location.coordinates.map(
                (coordinate: any[]) => ({
                  lat: coordinate[1],
                  lng: coordinate[0],
                })
              );
              let centroidLat = 0;
              let centroidLng = 0;
              polygonCoordinates.forEach((coordinate: any) => {
                centroidLat += coordinate.lat;
                centroidLng += coordinate.lng;
              });
              centroidLat /= polygonCoordinates.length;
              centroidLng /= polygonCoordinates.length;
              return (
                <>
                  <Marker
                    key={`marker-${index}`}
                    icon={icon}
                    position={{
                      lat: centroidLat,
                      lng: centroidLng,
                    }}
                  />
                  <Polygon
                    options={{ fillOpacity: 0.1 }}
                    key={`polygon-${index}`}
                    paths={polygonCoordinates}
                  />
                </>
              );
            default:
              return null;
          }
        });
        if (overlays.some((item: any) => !item)) {
          overlays = slocationsold.map((item: any, index: any) => {
            return (
              <Marker
                key={`marker-${index}`}
                icon={icon}
                position={{
                  lat: item.lat,
                  lng: item.lng,
                }}
              />
            );
          });
        }
        return <>{overlays}</>;
      },
    [slocations, slocationsold]
  );

  const [comment, setComment] = useState<string>(" ");

  const storyId = story.id;
  console.log(story);

  let latSum = 0;
  let latSumOld = 0;
  let lngSum = 0;
  let lngSumOld = 0;
  let count = 0;

  (story as any).locationsAdvanced.forEach((loc: any) => {
    switch (loc.type) {
      case "Point":
        latSum += loc.coordinates[0][1];
        lngSum += loc.coordinates[0][0];
        count++;
        break;
      case "Circle":
        latSum += loc.coordinates[0][1];
        lngSum += loc.coordinates[0][0];
        count++;
        break;
      case "Rectangle":
        const sw = { lat: loc.coordinates[0][1], lng: loc.coordinates[0][0] };
        const ne = { lat: loc.coordinates[2][1], lng: loc.coordinates[2][0] };
        latSum += (sw.lat + ne.lat) / 2;
        lngSum += (sw.lng + ne.lng) / 2;
        count++;
        break;
      case "Polygon":
        loc.coordinates.forEach((coordinate: any) => {
          latSum += coordinate[1];
          lngSum += coordinate[0];
          count++;
        });
        break;
    }
  });

  const latAvg = latSum / count;
  const lngAvg = lngSum / count;

  latSumOld = story.locations[0].lat;
  lngSumOld = story.locations[0].lng;

  const mapCenter = {
    lat: !latAvg ? latSumOld : latAvg,
    lng: !lngAvg ? lngSumOld : lngAvg,
  };
  const handleCommentChange: React.ChangeEventHandler<HTMLTextAreaElement> = (
    event
  ) => {
    setComment(event.target.value);
  };
  const RequestData: CommentRequestInt = {
    text: comment,
    storyId: storyId,
  };

  const sendComment = async () => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/stories/comments`,
        RequestData,
        {
          withCredentials: true,
        }
      );

      console.log(response);
    } catch (error) {
      console.error("Error:", error);
    }
    window.location.reload();
  };

  const getSeasonImage = (season: String) => {
    switch (season) {
      case "summer":
        return summer; // Replace with the actual path to your summer image
      case "winter":
        return winter; // Replace with the actual path to your winter image
      case "fall":
        return fall; // Replace with the actual path to your fall image
      case "spring":
        return spring; // Replace with the actual path to your spring image
      default:
        return spring; // Replace with the default image path
    }
  };

  ///////////// MODAL

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <>
      <div className="bg-green-50">
        <NavBar />

        <Container>
          <div className="bg-white rounded-2xl mt-2 p-3 text-center border-customGreenD border-solid border-2">
            <h1
              style={{
                fontFamily: "HandWriting",
              }}
              className="text-7xl mt-2 mb-4"
            >
              {story.header}
            </h1>

            {story.labels && (
              <div>
                {story.labels.map((label, index) => (
                  <div
                    key={index}
                    style={{ display: "inline-block", marginLeft: "10px" }}
                  >
                    <Chip
                      className="w-fit feed-chip bg-customGreen mr-1"
                      label={label}
                      color="success"
                      size="small"
                    />
                  </div>
                ))}
              </div>
            )}
            <div className="content-between">
              {story.decade === undefined ||
                (story.decade === null && (
                  <div className="flex items-center mx-24 justify-between">
                    <div className="my-1">
                      <p className="flex items-center">
                        <img className="w-8 h-8" src={start} alt="End Image" />{" "}
                        {story.startDate} &nbsp;&nbsp;
                        {story.startSeason && (
                          <span className="flex items-center">
                            <img
                              className="w-8 h-8"
                              src={getSeasonImage(story.startSeason)}
                              alt={`Season Image for ${story.startSeason}`}
                            />
                            <span className="ml-1">{story.startSeason}</span>
                          </span>
                        )}
                      </p>
                    </div>
                    {story.endDate !== null && (
                      <div className="my-1">
                        <p className="flex items-center">
                          <img className="w-8 h-8" src={end} alt="End Image" />
                          {story.endDate}&nbsp;&nbsp;
                          {story.endSeason && (
                            <span className="flex items-center">
                              <img
                                className="w-8 h-8"
                                src={getSeasonImage(story.endSeason)}
                                alt={`Season Image for ${story.endSeason}`}
                              />
                              <span className="ml-1">{story.endSeason}</span>
                            </span>
                          )}
                        </p>
                      </div>
                    )}
                  </div>
                ))}
              {story.decade !== null && (
                <Col>
                  <p> Decade: {story.decade}</p>
                </Col>
              )}
            </div>
          </div>
          <div className="bg-white rounded-2xl p-1 border-customGreenD border-solid border-2">
            {(story as any).locationsAdvanced.length > 0 && (
              <GoogleMap
                zoom={11}
                mapContainerStyle={{ width: "100%", height: "235px" }}
                //center={{ lat: 41.0856396, lng: 29.0424937 }}
                center={mapCenter}
              >
                {" "}
                <StoryMarkers
                  slocations={(story as any).locationsAdvanced}
                  slocationsold={(story as any).locations}
                />
              </GoogleMap>
            )}
          </div>

          <Row>
            <Col xs={10}>
              <div
                className="bg-white mt-3 border-customGreenD border-solid border-3 rounded-2xl p-4"
                dangerouslySetInnerHTML={{ __html: story.richText }}
              />
            </Col>

            <Col xs={2}>
              <div className="bg-white rounded-2xl p-2 mt-5 text-center border-customGreenD border-solid border-2">
                {story.user?.name && (
                  <div className="flex flex-col items-center">
                    {" "}
                    {/* Added flex and items-center */}
                    <Avatar
                      sx={{ width: 140, height: 140 }}
                      alt={story.user?.name}
                      src={story.user?.photo}
                      className="mb-2"
                    />
                    <Link to={`/user/${story.user.name}`}>
                      <p className="font-semibold text-2xl my-1">
                        {story.user.name}
                      </p>
                    </Link>
                    <div className="flex my-1">
                      {user?.followers && (
                        <p>
                          <PeopleIcon /> {user?.followers.length}
                        </p>
                      )}
                      {user?.stories && (
                        <p>
                          <HistoryEduIcon /> {user?.stories.length}
                        </p>
                      )}
                    </div>
                  </div>
                )}

                {isAuthor ? (
                  <button
                    onClick={() => {
                      navigate(`/stories/edit/${story.id}`);
                    }}
                    className="text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
                  >
                    Edit Story
                  </button>
                ) : (
                  <>
                    {user && (
                      <div>
                        <FollowButtonIcon
                          followers={user.followers}
                          id={user.id}
                        />
                      </div>
                    )}
                  </>
                )}
              </div>
            </Col>
          </Row>
          <div className="flex items-center">
            <LikeButton type="story" id={story.id} />

            <p className="text-black font-semibold ml-2 text-xl flex text-center justify-center items-center">
              Likes:{" "}
              <div
                onClick={handleOpen}
                className="ml-2 text-white bg-gradient-to-r cursor-pointer rounded-full from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 shadow-lg shadow-cyan-500/50 dark:shadow-lg dark:shadow-cyan-800/80 font-medium  px-3 py-1 text-center "
              >
                {story.likes.length}
              </div>
              <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
              >
                <Box className="w-fit border-customGreen border-solid border-3 absolute top-1/2 left-1/2 bg-green-50 transform -translate-x-1/2 -translate-y-1/2 w-400 bg-background-paper border-2 shadow-lg p-4">
                  <h1 className="mb-4 text-2xl font-extrabold text-gray-900 dark:text-black md:text-3xl lg:text-4xl">
                    <span className="text-transparent bg-clip-text bg-gradient-to-r to-emerald-600 from-sky-400">
                      {story.header}'s
                    </span>{" "}
                    Likes
                  </h1>
                  {likedUsers &&
                    likedUsers.reverse().map((user, index) => (
                      <Card
                        sx={{
                          maxWidth: 350,
                          minWidth: 300,
                          width: "100%",
                          height: "100%",
                        }}
                        className="shadow-md mx-auto m-4 h-fit transition duration-300 ease-in-out transform hover:scale-105 hover:shadow-2xl"
                      >
                        <div className="p-4">
                          <Link to={`/user/${user?.name}`}>
                            <div className="flex items-center justify-between mb-2">
                              <div className="flex items-center">
                                <Avatar
                                  sx={{ width: 75, height: 75 }}
                                  alt={user?.name}
                                  className="mr-2"
                                />
                                <span className="text-black text-base font-semibold">
                                  {user?.name}
                                </span>
                              </div>
                              <p className="text-black text-sm mb-2">
                                <HistoryEduIcon
                                  fontSize="large"
                                  className="mx-1"
                                />
                                {user?.stories?.length}
                                <PeopleIcon fontSize="large" className="mx-1" />
                                {user?.followers?.length}
                              </p>
                            </div>
                          </Link>
                        </div>
                      </Card>
                    ))}
                </Box>
              </Modal>
            </p>
          </div>
        </Container>
        <Container>
          <div className="mt-2 mb-2 flex text-center">
            <textarea
              className="w-3/4 mr-5 px-4 py-2 mt-2 text-customGreenD bg-white border rounded-md focus:border-customGreenD focus:ring-customGreenD focus:outline-none focus:ring focus:ring-opacity-40"
              onChange={handleCommentChange}
              placeholder="Write a comment!"
            ></textarea>

            <button
              onClick={sendComment}
              type="button"
              className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              <MessageFilled />
              Add Comment
              <path
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M1 5h12m0 0L9 1m4 4L9 9"
              />
            </button>
          </div>
        </Container>
        <Container>
          <Row style={{ marginBottom: "10px" }}>
            {story.comments &&
              story.comments.reverse().map((comment, index) => (
                <div key={index}>
                  <CommentComponent comment={comment} storyId={story.id} />
                </div>
              ))}
          </Row>
        </Container>
      </div>
    </>
  );
};

const StoryPageContainer: React.FC = () => {
  const [story, setStory] = useState<StoryInt>();
  const { id } = useParams<RouteParams>();

  useEffect(() => {
    const fetchStory = async () => {
      const response = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/stories/${id}`,
        {
          withCredentials: true,
        }
      );
      setStory(response.data);
    };

    fetchStory();
  }, [id]);

  if (!story) {
    return <div>Loading...</div>;
  }

  return <StoryPage story={story} />;
};

export default StoryPageContainer;
