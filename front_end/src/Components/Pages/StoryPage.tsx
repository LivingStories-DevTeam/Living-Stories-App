import { FC, useEffect, useMemo, useState } from "react";
import { useParams, Params, Link } from "react-router-dom";
import { StoryInt } from "../../Interfaces/StoryInt";
import axios from "axios";
import ReactQuill from "react-quill";
import "bootstrap/dist/css/bootstrap.min.css";
import "react-quill/dist/quill.snow.css";
import { Col, Container, Row } from "react-bootstrap";
import NavBar from "../Components/NavBar";
import { Circle, GoogleMap, Marker, Polygon, Rectangle } from "@react-google-maps/api";
import { Avatar, Input, Tag, Button } from "antd";
import TextArea from "antd/es/input/TextArea";
import { useNavigate } from "react-router-dom";
import LikeButton from "../Components/LikeButton";
import FollowButton from "../Components/Follow";
import UserOutlined from "@ant-design/icons/lib/icons/UserOutlined";
import EditFilled from "@ant-design/icons/lib/icons/EditFilled";
import MessageFilled from "@ant-design/icons/lib/icons/MessageFilled";
import CommentComponent from "../Components/CommentCard";
import icon from "../../assets/images/icon-resized.png";

interface StoryPageProps {
  story: StoryInt;
}
const containerStyle = {
  width: "100%",
  height: "400px",
};

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

const StoryPage: React.FC<StoryPageProps> = ({ story }) => {

  const [mapKey, setMapKey] = useState(0);
  const [isAuthor, setIsAuthor] = useState<boolean>(false);
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
    fetchData();
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
              const polygonCoordinates = location.coordinates.map((coordinate: any[]) => ({
                lat: coordinate[1],
                lng: coordinate[0],
              }));
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
  let latSumOld = 0
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

  const latAvg = latSum / count
  const lngAvg = lngSum / count;

  latSumOld = story.locations[0].lat;
  lngSumOld = story.locations[0].lng;

  const mapCenter = { lat: !latAvg ? latSumOld : latAvg, lng: !lngAvg ? lngSumOld : lngAvg };

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

  return (
    <>
      <NavBar />

      <Container>
        <Row>
          <Col>
            <h1
              style={{
                fontFamily: "HandWriting",
                fontSize: "xxx-large",
                marginTop: "10px",
              }}
            >
              {story.header}
            </h1>
          </Col>


          <Col>
            {story.labels && (
              <div>
                {story.labels.map((label, index) => (
                  <div
                    key={index}
                    style={{ display: "inline-block", marginLeft: "10px" }}
                  >
                    <Tag
                      color={"lime"}
                      style={{ margin: "10px", inlineSize: "x-large" }}
                    >
                      {label}
                    </Tag>
                  </div>
                ))}
              </div>
            )}
          </Col>
          {story.decade === undefined || story.decade === null &&
            <Col>
              <Row>
                <p>Start Date: {story.startDate}   {story.startSeason && <p> Season: {story.startSeason}</p>}</p>

              </Row>
              {story.endDate !== null && (
                <Row>
                  <p>End Date:{story.endDate}  {story.endSeason && <p> Season: {story.endSeason}</p>}</p>
                </Row>
              )}
            </Col>}
          {story.decade !== null && <Col><p> Decade: {story.decade}</p></Col>}




        </Row>
        <Row>
        </Row>
        {story.user?.name && (
          <Col xs={3}>
            {story.user?.photo ? (
              <Avatar
                size={60}
                src={<img src={story.user.photo} alt="avatar" />}
              />
            ) : (
              <Avatar
                style={{ backgroundColor: "#87d068" }}
                size={60}
                icon={<UserOutlined />}
              ></Avatar>
            )}{" "}
            <Link to={`/user/${story.user.name}`}>
              <p>By: {story.user.name}</p>
            </Link>
          </Col>
        )}
        <Row>


          <Col>
            {isAuthor && (
              <Button type="primary" icon={<EditFilled />}
                onClick={() => {
                  navigate(`/stories/edit/${story.id}`);
                }}
              >
                Edit Story
              </Button>
            )}
          </Col>
        </Row>
        <Row>
          <Col xs={8}>
            <ReactQuill
              value={story.richText}
              readOnly={true}
              modules={{ toolbar: false }}
            />
          </Col>

          {(story as any).locationsAdvanced.length > 0 && (
            <Col xs={4}>
              <GoogleMap
                zoom={20}
                mapContainerStyle={containerStyle}
                center={mapCenter}
              >
                <StoryMarkers slocations={(story as any).locationsAdvanced} slocationsold={(story as any).locations} />
              </GoogleMap>
            </Col>
          )}
        </Row>
        <Row>
          <Col xs={1}>
            <LikeButton type="story" id={story.id} />
          </Col>
          <Col>
            <p>Likes: {story.likes.length}</p>
          </Col>


        </Row>


      </Container>

      <Container>
        <Row style={{ marginTop: "20px", marginBottom: "20px" }}>
          <Col xs={10} >
            <TextArea

              autoSize={true}
              placeholder="Write a comment!"
              onChange={handleCommentChange}
            ></TextArea>
          </Col>
          <Col xs={2}>
            <Button type="primary" icon={<MessageFilled />} onClick={sendComment}> Add Comment</Button>
          </Col>
        </Row>
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

    </>
  );
};

const StoryPageContainer: React.FC = () => {
  const [story, setStory] = useState<StoryInt>();
  const { id } = useParams<RouteParams>();

  useEffect(() => {
    const fetchStory = async () => {
      const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/stories/${id}`, {
        withCredentials: true,
      });
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
