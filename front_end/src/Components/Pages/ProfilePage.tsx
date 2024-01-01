import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import StoryComponent from "../Components/ProfileStoryCard";
import NavBar from "../Components/NavBar";
import PeopleIcon from "@mui/icons-material/People";
import { useNavigate } from "react-router-dom";
import Upload from "antd/es/upload/Upload";
import FollowButton from "../Components/Follow";
import { UploadFile } from "antd";
import HistoryEduIcon from "@mui/icons-material/HistoryEdu";
import EditIcon from "@mui/icons-material/Edit";
import { UploadChangeParam } from "antd/es/upload";
import { Avatar, Card } from "@mui/material";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import SaveAsIcon from "@mui/icons-material/SaveAs";
import CloseIcon from "@mui/icons-material/Close";
import Modal from "@mui/material/Modal";

interface Story {
  id: number;
  header: string;
  likes: number[];
  locations?: {
    id: number;
    lat: number;
    lng: number;
    name: string;
  }[];
  labels: string[];
  startDate: string;
  endDate?: string;
  comments: {
    text: string;
    user: {
      id: number;
      name: string;
    };
    likes: number[];
  }[];
}

interface User {
  id: number;
  name: string;
  photo?: string | null;
  biography?: string | null;
  stories?: Story[];
  comments?: Comment[];
  followers?: User[];
  following?: User[];
}

interface LikesUser {
  id: number;
  userName: string;
  photo?: string | null;
  storyCount?: string;
  followerCount?: string;
}

interface RouteParams {
  name: string;
  [key: string]: string | undefined;
}

interface EditUserData {
  biography?: string;
  photo?: string;
}

const ProfilePage: React.FC = () => {
  const { name } = useParams<RouteParams>();
  const [user, setUser] = useState<User | null>(null);
  const [isAuthor, setIsAuthor] = useState<boolean>(false);
  const [bio, setBio] = useState<string>("");
  const [photo, setPhoto] = useState<string>("");
  const [trigger, setTrigger] = useState(false);
  const [editing, setEditing] = useState(false);
  const [followerList, setFollowerList] = useState<LikesUser[]>([]);

  const navigate = useNavigate();

  const token = localStorage.getItem("jwt_Token");
  useEffect(() => {
    const cookieValue = document.cookie
      .split("; ")
      .find((row) => row.startsWith("jwt_Token"))
      ?.split("=")[1];

    if (!cookieValue) {
      navigate("/login");
    }
  }, []);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get<User>(
          `${import.meta.env.VITE_BACKEND_URL}/users/${name}`,
          { withCredentials: true }
        );
        const response_user = await axios.get<User>(
          `${import.meta.env.VITE_BACKEND_URL}/users/profile`,
          { withCredentials: true }
        );
        setUser(response.data);
        setPhoto(response.data.photo!);
        setBio(response.data.biography!);
        if (response_user.data.name === name) {
          setIsAuthor(true);
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchUser();
  }, [name, trigger]);

  useEffect(() => {
    const fetchFollowers = async () => {
      const url = `${import.meta.env.VITE_BACKEND_URL}/users/followerlist/${
        user?.id
      }`;
      try {
        const response = await axios.get<LikesUser[]>(url, {
          withCredentials: true,
        });
        if (response.data) {
          setFollowerList(response.data);
          console.log(response.data);
        }
      } catch (error) {
        console.error(error);
      }
    };
    fetchFollowers();
  }, [user, trigger, name]);

  /////// EDITING

  const handleSubmit = async () => {
    const editUserData: EditUserData = {
      photo,
      biography: bio,
    };
    console.log(editUserData);

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/users/update`,
        editUserData,
        { withCredentials: true }
      );
      console.log(response.data);
      setTrigger(!trigger);
      setEditing(false);
    } catch (error) {
      console.error(error);
    }
  };

  const handleBioChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setBio(event.target.value);
  };

  const handleImageUpload = (info: UploadChangeParam<UploadFile<any>>) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      const imageDataUrl = reader.result as string;
  
      // Create an image element to draw on canvas
      const image = new Image();
      image.src = imageDataUrl;
  
      image.onload = () => {
        // Create a canvas
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
  
        // Set canvas dimensions to match image dimensions
        canvas.width = image.width;
        canvas.height = image.height;
  
        // Draw the image on the canvas
        ctx?.drawImage(image, 0, 0, image.width, image.height);
  
        // Convert the canvas content to a compressed data URL (80% quality)
        const compressedDataUrl = canvas.toDataURL('image/jpeg', 0.9);
  
        // Set the compressed data URL as the new photo state
        setPhoto(compressedDataUrl);
        console.log(compressedDataUrl);
      };
    };
  
    reader.readAsDataURL(info.file.originFileObj as Blob);
  };
  

  ///////////// MODAL

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <NavBar />{" "}
      <div className="p-8 bg-customGreen h-screen">
        <div className="max-w-3xl mx-auto flex flex-col items-center">
          <div className="bg-white p-6 rounded-md shadow-md mb-4 w-full md:w-3/4 lg:w-1/2">
            {editing ? (
              <>
                {" "}
                <div className="flex items-center">
                  <div className="w-24 h-24 overflow-hidden rounded-full mr-6">
                    {photo ? (
                      <>
                        {" "}
                        <Avatar
                          sx={{ width: "100%", height: "100%" }}
                          src={photo}
                          className="mr-2"
                        />
                      </>
                    ) : (
                      <>
                        {user.photo ? (
                          <Avatar
                            sx={{ width: "100%", height: "100%" }}
                            alt={user?.name}
                            src={user?.photo}
                            className="mr-2"
                          />
                        ) : (
                          <Avatar
                            sx={{
                              width: "100%",
                              height: "100%",
                              backgroundColor: "orange",
                            }}
                            className="mr-2"
                          >
                            {user?.name[0]}
                          </Avatar>
                        )}
                      </>
                    )}
                  </div>
                  <div>
                    <h2 className="text-2xl font-semibold">{user.name}</h2>
                    <div className="flex">
                      {user.followers && (
                        <p>
                          <PeopleIcon /> {user.followers.length}
                        </p>
                      )}
                      {user.stories && (
                        <p>
                          <HistoryEduIcon /> {user.stories.length}
                        </p>
                      )}
                    </div>
                    {isAuthor && (
                      <div className="flex my-2">
                        <CloseIcon
                          className=" cursor-pointer text-gray-600"
                          onClick={() => setEditing(false)}
                        />
                        <p className="text-xs text-gray-700">Cancel</p>
                      </div>
                    )}
                  </div>
                </div>
                <Upload
                  name="avatar"
                  accept="image/*"
                  showUploadList={false}
                  onChange={handleImageUpload}
                >
                  <button
                    type="button"
                    className="mt-3 text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
                  >
                    <AddPhotoAlternateIcon />
                    &nbsp; Upload Photo
                  </button>
                </Upload>
                <div className="border border-gray-50 p-2 rounded mt-4">
                  <textarea
                    id="message"
                    className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500  dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="Enter your Bio..."
                    onChange={handleBioChange}
                    value={bio}
                  ></textarea>
                </div>
                <button
                  onClick={handleSubmit}
                  type="button"
                  className="text-white bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
                >
                  <SaveAsIcon />
                  &nbsp; Save Changes
                </button>
              </>
            ) : (
              <>
                {" "}
                <div className="flex items-center">
                  <div className="w-24 h-24 overflow-hidden rounded-full mr-6">
                    {user.photo ? (
                      <Avatar
                        sx={{ width: "100%", height: "100%" }}
                        alt={user?.name}
                        src={user?.photo}
                        className="mr-2"
                      />
                    ) : (
                      <Avatar
                        sx={{
                          width: "100%",
                          height: "100%",
                          backgroundColor: "orange",
                        }}
                        className="mr-2"
                      >
                        {user?.name[0]}
                      </Avatar>
                    )}
                  </div>
                  <div>
                    <h2 className="text-2xl font-semibold">{user.name}</h2>
                    <div className="flex">
                      {user.followers && (
                        <p>
                          <Modal
                            open={open}
                            onClose={handleClose}
                            aria-labelledby="modal-modal-title"
                            aria-describedby="modal-modal-description"
                          >
                            <div
                              className="w-fit border-customGreen border-solid border-3 absolute top-1/2 left-1/2 bg-green-50 transform -translate-x-1/2 -translate-y-1/2 w-400 bg-background-paper border-2 shadow-lg p-4"
                              style={{ overflowY: "auto", maxHeight: "80vh" }}
                            >
                              <h1 className="mb-4 text-2xl font-extrabold text-gray-900 dark:text-black md:text-3xl lg:text-4xl">
                                <span className="text-transparent bg-clip-text bg-gradient-to-r to-emerald-600 from-sky-400">
                                  {user.name}'s
                                </span>{" "}
                                Followers
                              </h1>
                              <div>
                              {followerList &&
                                  followerList.reverse().map((user, index) => (
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
                                        <Link to={`/user/${user.userName}`}>
                                          <div className="flex items-center justify-between mb-2">
                                            <div className="flex items-center">
                                              <Avatar
                                                sx={{ width: 75, height: 75 }}
                                                alt={user.userName}
                                                src={
                                                  user?.photo
                                                    ? String(user.photo)
                                                    : ""
                                                }
                                                className="mr-2"
                                              />
                                              <span className="text-black text-base font-semibold">
                                                {user.userName}
                                              </span>
                                            </div>
                                            <p className="text-black text-sm mb-2">
                                              <HistoryEduIcon
                                                fontSize="large"
                                                className="mx-1"
                                              />
                                              {user.storyCount}
                                              <PeopleIcon
                                                fontSize="large"
                                                className="mx-1"
                                              />
                                              {user.followerCount}
                                            </p>
                                          </div>
                                        </Link>
                                      </div>
                                    </Card>
                                  ))}
                                  
                              </div>
                            </div>
                          </Modal>
                          <PeopleIcon
                            fontSize="large"
                            className="cursor-pointer hover:text-blue-500"
                            onClick={handleOpen}
                          />{" "}
                          {user.followers.length}
                        </p>
                      )}

                      {user.stories && (
                        <p>
                          <HistoryEduIcon fontSize="large" />{" "}
                          {user.stories.length}
                        </p>
                      )}
                    </div>
                    {isAuthor && (
                      <div className="flex my-2">
                        <EditIcon
                          className=" cursor-pointer text-gray-600"
                          onClick={() => setEditing(true)}
                        />
                        <p className="text-xs text-gray-700">Edit Profile</p>
                      </div>
                    )}
                  </div>
                </div>
                <div className="border border-gray-50 p-2 rounded mt-4">
                  <p>{user.biography}</p>
                </div>
              </>
            )}

            {isAuthor ? (
              <></>
            ) : (
              <div className="flex justify-center mt-6">
                <FollowButton followers={user.followers} id={user.id} />
              </div>
            )}
          </div>
        </div>
        <div className="w-full bg-slate-50 rounded-3xl text-center py-8">
          <h1 className="mb-4 text-3xl font-extrabold text-gray-900 dark:text-black md:text-5xl lg:text-6xl">
            <span className="text-transparent bg-clip-text bg-gradient-to-r to-emerald-600 from-sky-400">
              {user.name}'s
            </span>{" "}
            Stories
          </h1>

          {user.stories && (
            <h1 className="flex items-center justify-center text-5xl font-extrabold dark:text-black">
              {user.name}&nbsp; <p className="text-2xl text-gray-600">has</p>
              <span className="bg-blue-100 text-blue-800 text-2xl font-semibold me-2 px-2.5 py-0.5 rounded dark:bg-blue-200 dark:text-blue-800 ms-2">
                {user.stories.length}{" "}
                {user.stories.length === 1 ? "story" : "stories"}
              </span>
            </h1>
          )}

          <div className=" border-solid rounded-2xl  flex flex-wrap justify-center">
            {user.stories
              ?.slice()
              .reverse()
              .map((story) => (
                <div key={story.id} className="p-2">
                  <StoryComponent story={story} />
                </div>
              ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default ProfilePage;
