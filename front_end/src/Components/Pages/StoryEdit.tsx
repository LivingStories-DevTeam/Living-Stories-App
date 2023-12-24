import React, { useState, useRef, ChangeEvent, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "react-quill/dist/quill.snow.css";

import axios from "axios";
import { Params, useNavigate, useParams } from "react-router-dom";
import ReactQuill from "react-quill";
import { Col, Row, Container } from "react-bootstrap";
import NavBar from "../Components/NavBar";
import CancelIcon from "@mui/icons-material/Cancel";
import { Chip } from "@mui/material";
const urlEndpoint = `${import.meta.env.VITE_BACKEND_URL}/stories`;
const api_key = import.meta.env.VITE_GOOGLE_API_KEY;
const containerStyle = {
  width: "100%",
  height: "400px",
};

interface Location {
  name: string;
  lat: number;
  lng: number;
}

interface Story {
  text: string;
  header: string;
  labels: string[];
  locations: Location[];
  mediaString: string[];
  richText: string;
}
interface RouteParams extends Params {
  id: string;
}

const exactDateFormat = "DD/MM/YYYY";
const yearFormat = "YYYY";
const monthFormat = "MM/YYYY";

const Story: React.FC = () => {
  const { id } = useParams<RouteParams>();

  useEffect(() => {
    // Fetch story data from API using the ID parameter
    const fetchStory = async () => {
      const response = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/stories/${id}`,
        {
          withCredentials: true,
        }
      );
      setLabels(response.data.labels);
      setHeader(response.data.header);
      setEditorContent(response.data.richText);
    };

    fetchStory();
  }, [id]);

  const [header, setHeader] = useState<string>("");

  const [labels, setLabels] = useState<string[]>([]);

  const [editorContent, setEditorContent] = useState("");

  const navigate = useNavigate();

  const handleEditorChange = (content: string) => {
    setEditorContent(content);
  };
  useEffect(() => {
    const cookieValue = document.cookie
      .split("; ")
      .find((row) => row.startsWith("jwt_Token"))
      ?.split("=")[1];

    if (!cookieValue) {
      navigate("/login");
    }
  }, []);

  const handleSubmit = () => {
    const editRequest: any = {
      header,
      labels,
      richText: editorContent,
    };
    async function postData() {
      try {
        console.log(editRequest);
        const response = await axios.post(
          `${import.meta.env.VITE_BACKEND_URL}/stories/edit/${id}`,
          editRequest,
          {
            withCredentials: true,
          }
        );

        console.log(response);
      } catch (error) {
        console.error("Error:", error);
      }
    }

    postData();
    navigate("/home");
  };

  const handleHeaderChange = (event: ChangeEvent<HTMLInputElement>) => {
    setHeader(event.target.value);
  };

  const handleLabelsChange = (event: ChangeEvent<HTMLInputElement>) => {
    setLabels(event.target.value.split(",").map((label) => label.trim()));
  };

  const modules = {
    toolbar: [
      [{ header: [1, 2, false] }],
      ["bold", "italic", "underline", "strike", "blockquote"],
      [{ list: "ordered" }, { list: "bullet" }],
      ["link", "image"],
    ],
  };

  const formats = [
    "header",
    "bold",
    "italic",
    "underline",
    "strike",
    "blockquote",
    "list",
    "bullet",
    "indent",
    "link",
    "image",
  ];
  return (
    <>
      {" "}
      <div className="bg-green-50 h-screen">
        <NavBar />

        <h1 className="text-5xl font-extrabold dark:text-black text-center my-2">
          Edit Your Story {header&& ": " + header}
        </h1>
        <div style={{ marginLeft: 2, marginRight: 2 }}>
          <Container>
            <Row>
              <Col>
                <form
                  className="border-customGreen border-solid border-3"
                  style={{
                    backgroundColor: "#fff",
                    borderRadius: "8px",
                    padding: 1,
                    paddingRight: 15,
                    paddingLeft: 15,
                    marginBottom: 10,
                    marginTop: 10,
                    boxShadow: "0px 0px 10px 2px rgba(0, 0, 0, 0.1)",
                    touchAction: "pan-y",
                  }}
                >
                  <div className="form-group" style={{ marginTop: 10 }}>
                    <label>Title:</label>

                    <input
                      className="w-full px-4 py-2 mt-2 text-customGreenD bg-white border rounded-md focus:border-customGreenD focus:ring-customGreenD focus:outline-none focus:ring focus:ring-opacity-40"
                      onChange={handleHeaderChange}
                      value={header}
                      type="text"
                    />
                  </div>

                  <div
                    className="form-group"
                    style={{ marginTop: 10, marginBottom: 10 }}
                  >
                    <label>Labels (comma-separated):</label>

                    <input
                      className="w-full px-4 py-2 mt-2 text-customGreenD bg-white border rounded-md focus:border-customGreenD focus:ring-customGreenD focus:outline-none focus:ring focus:ring-opacity-40"
                      onChange={handleLabelsChange}
                      value={labels.join(", ")}
                      type="text"
                    />
                  </div>
                  <div style={{ width: "100%", overflowX: "auto" }}>
                    <ul
                      style={{
                        display: "flex",
                        flexDirection: "row",
                        backgroundColor: "#fff",
                        borderRadius: "8px",
                        touchAction: "pan-y",
                      }}
                    >
                      {labels.map((value, index) => (
                        <div
                          key={index}
                          style={{
                            display: "flex",
                            alignItems: "center",
                            backgroundColor: "#fff",
                            paddingTop: 5,
                            paddingBottom: 5,
                            touchAction: "pan-y",
                          }}
                        >
                          <Chip
                            style={{
                              backgroundColor: "#1f6c5c",
                              color: "#fff",
                            }}
                            label={value}
                          />
                          <CancelIcon
                            type="button"
                            style={{ color: "#ad0202" }}
                            onClick={() =>
                              setLabels(labels.filter((_, i) => i !== index))
                            }
                          />
                        </div>
                      ))}
                    </ul>
                  </div>
                </form>
              </Col>
            </Row>
          </Container>
          <div
            className="border-customGreen border-solid border-3 w-4/5 text-center mx-auto h-96"
            style={{
              backgroundColor: "#fff",
              borderRadius: "8px",
              padding: 10,
              marginBottom: 10,
              marginTop: "10px",
              boxShadow: "0px 0px 10px 2px rgba(0, 0, 0, 0.1)",
              touchAction: "pan-y",
            }}
          >
            <ReactQuill
              theme="snow"
              value={editorContent}
              onChange={handleEditorChange}
              formats={formats}
              modules={modules}
              style={{
                height: "80%",
                backgroundColor: "#fff",
                touchAction: "pan-y",
              }}
            />
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              touchAction: "pan-y",
            }}
          >
            <button
              type="button"
              onClick={handleSubmit}
              className="text-white bg-gradient-to-r from-green-500 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-10 mt-2"
            >
              Update Story!
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Story;
