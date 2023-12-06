import React, { useState, useRef, ChangeEvent, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "react-quill/dist/quill.snow.css";

import { GoogleMap, Marker, Autocomplete } from "@react-google-maps/api";
import axios from "axios";
import { Params, useNavigate, useParams } from "react-router-dom";
import ReactQuill, { Quill } from "react-quill";
import { Col, Row, Container } from "react-bootstrap";
import NavBar from "../Components/NavBar";
import dayjs from "dayjs";
import { RadioGroup } from "../Components/DateRadio";
import DatePicker from "antd/es/date-picker";
import { Radio, RadioChangeEvent, Select, TimePicker } from "antd";
import type { Dayjs } from "dayjs";
import CancelIcon from "@mui/icons-material/Cancel";
import ImageCompress from "quill-image-compress";
import { Chip } from "@mui/material";

Quill.register("modules/imageCompress", ImageCompress);

const urlEndpoint = `${import.meta.env.VITE_BACKEND_URL}/stories`;
const api_key = import.meta.env.VITE_GOOGLE_API_KEY;
const containerStyle = {
  width: "100%",
  height: "350px",
  margin: "auto",
  border: "1px solid #ccc",
  boxShadow: "0px 0px 10px 2px rgba(0, 0, 0, 0.1)",
  touchAction: "pan-y",
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

const StoryEditMobile: React.FC = () => { 
  const { id } = useParams<RouteParams>();

  useEffect(() => {
    // Fetch story data from API using the ID parameter
    const fetchStory = async () => {
      const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/stories/${id}`, {
        withCredentials: true,
      });
      setLabels(response.data.labels);
      setHeader(response.data.header)
      setEditorContent(response.data.richText)

    };

    fetchStory();
  }, [id]);
 
  
  const [header, setHeader] = useState<string>("");
  
  const [labels, setLabels] = useState<string[]>([]);

  const [editorContent, setEditorContent] = useState("");
  const [posted, setPosted] = useState(false);
 

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
        setPosted(true);
        alert("Story Updated successfully!");
          window.location.reload();
        console.log(response);
      } catch (error) {
        console.error("Error:", error);
      }
    }

    postData();
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
    <div style={{ backgroundColor: "#1f6c5c", touchAction: "pan-y" }}>
      <div style={{ marginLeft: 5, marginRight: 5,height: '100vh', touchAction: "pan-y" }}>
        <Container>
          <Row>
            <Col>
              <form
                style={{
                  backgroundColor: "#fff",
                  borderRadius: "8px",
                  padding: 1,
                  paddingRight: 15,
                  paddingLeft: 15,
                  border: "1px solid #ccc",
                  marginBottom: 10,
                  marginTop: 20,
                  boxShadow: "0px 0px 10px 2px rgba(0, 0, 0, 0.1)",
                  touchAction: "pan-y",
                }}
              >
                <div className="form-group" style={{ marginTop: 10 }}>
                  <label>Header:</label>
                  <input
                    type="text"
                    className="form-control"
                    value={header}
                    onChange={handleHeaderChange}
                  />
                </div>

                <div
                  className="form-group"
                  style={{ marginTop: 10, marginBottom: 10 }}
                >
                  <label>Labels (comma-separated):</label>
                  <input
                    type="text"
                    className="form-control"
                    value={labels.join(", ")}
                    onChange={handleLabelsChange}
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
                          style={{ backgroundColor: "#1f6c5c", color: "#fff" }}
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
          style={{
            backgroundColor: "#fff",
            borderRadius: "8px",
            padding: 10,
            alignItems: "center",
            justifyContent: "center",
            border: "1px solid #ccc",
            marginBottom: 10,
            marginTop: "35px",
            height: "350px",
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
            style={{
              marginTop: "30px",
              marginBottom: "50px",
              boxShadow: "0px 0px 10px 2px rgba(0, 0, 0, 0.1)",
              backgroundColor: "#29b3f2",
              border: "1px solid #fff",
              borderRadius: "30px",
              color: "#fff",
              touchAction: "pan-y",
            }}
            type="submit"
            className="btn btn-primary"
            onClick={handleSubmit}
            disabled={posted}
          >
            Update Story!
          </button>
        </div>
      </div>
    </div>
  );
};

export default StoryEditMobile;
