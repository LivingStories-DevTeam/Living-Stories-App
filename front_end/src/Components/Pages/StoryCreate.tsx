import React, { useState, useRef, ChangeEvent, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "react-quill/dist/quill.snow.css";
import { GoogleMap, Marker, Autocomplete } from "@react-google-maps/api";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import ReactQuill, { Quill } from "react-quill";
import NavBar from "../Components/NavBar";
import dayjs from "dayjs";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import MyLocationIcon from "@mui/icons-material/MyLocation";
import DatePicker from "antd/es/date-picker";
import {
  Layout,
  Radio,
  RadioChangeEvent,
  Select,
  TimePicker,
  Form,
  Typography,
  Space,
} from "antd";
import { Col, Row, Container } from "react-bootstrap";
import type { Dayjs } from "dayjs";
import ImageCompress from "quill-image-compress";

import { DeleteTwoTone } from "@ant-design/icons";
import icon from "../../assets/images/icon-resized.png";

import CancelIcon from "@mui/icons-material/Cancel";
import { Chip } from "@mui/material";

const { Text } = Typography;
const { Content } = Layout;

Quill.register("modules/imageCompress", ImageCompress);

const api_key = import.meta.env.VITE_GOOGLE_API_KEY;
const containerStyle = {
  width: "100%",
  height: "400px",
};
interface Story {
  text: string;
  decade?: string;
  header: string;
  labels: string[];
  locations: Location[];
  mediaString: string[];
  richText: string;
  startDate?: string;
  endDate?: string;
  startSeason?: string;
  endSeason?: string;
}
type Option = {
  label: string;
  value: string;
};

const options: Option[] = [
  { label: "Exact Date", value: "exact-year" },
  { label: "Month", value: "month" },
  { label: "Year", value: "year" },
];
const decadeOption: Option[] = [
  { label: "Date", value: "date" },
  { label: "Decade", value: "decade" },
];
const exactDateFormat = "DD/MM/YYYY";
const yearFormat = "YYYY";
const monthFormat = "MM/YYYY";

const Story: React.FC = () => {
  const [drawnItems, setDrawnItems] = useState<any[]>([]);
  const [mapCenter, setMapCenter] = useState<{ lat: number; lng: number }>({
    lat: 41.0856396,
    lng: 29.0424937,
  });
  const [startTime, setStartTime] = useState<dayjs.Dayjs | null>();
  const [endTime, setEndTime] = useState<dayjs.Dayjs | null>();
  const [locations, setLocations] = useState<any[]>([]);
  const [locationsBackend, setLocationsBackend] = useState<any[]>([]);
  const [text, setText] = useState<string>("");
  const [header, setHeader] = useState<string>("");
  const [startDate, setStartDate] = useState<dayjs.Dayjs | null>(null);
  const [endtDate, setEndDate] = useState<dayjs.Dayjs | null>(null);
  const [labels, setLabels] = useState<string[]>([]);
  const [media, setMedia] = useState<string[]>([]);
  const [editorContent, setEditorContent] = useState("");
  const [selectedOption, setSelectedOption] = useState<string>("exact-year");
  const [selectedSeason, setSelectedSeason] = useState<string>();
  const [selectedSeasonEnd, setSelectedSeasonEnd] = useState<string>();
  const [requestStartDate, setRequestStartDate] = useState<string>();
  const [selectedOptionEnd, setSelectedOptionEnd] =
    useState<string>("exact-year");
  const [selectedDateInput, setSelectedDateInput] = useState<string>("date");
  const [selectedDecadeValue, setSelectedDecadeValue] = useState<number>();
  const [decade, setDecade] = useState<string>();

  const seasonOptions = [
    { value: "spring", label: "Spring" },
    { value: "summer", label: "Summer" },
    { value: "fall", label: "Fall" },
    { value: "winter", label: "Winter" },
  ];

  const decadeSelectOptions = [
    { value: 1901, label: "1900s" },
    { value: 1911, label: "1910s" },
    { value: 1921, label: "1920s" },
    { value: 1931, label: "1930s" },
    { value: 1941, label: "1940s" },
    { value: 1951, label: "1950s" },
    { value: 1961, label: "1960s" },
    { value: 1971, label: "1970s" },
    { value: 1981, label: "1980s" },
    { value: 1991, label: "1990s" },
    { value: 2001, label: "2000s" },
    { value: 2011, label: "2010s" },
    { value: 2021, label: "2020s" },
  ];

  const dateFormats: { [key: string]: string } = {
    "exact-year": "DD/MM/YYYY",
    month: "MM/YYYY",
    year: "YYYY",
  };

  const combinedStartDateTimeString = `${
    startDate && startTime && selectedOption === "exact-year"
      ? dayjs(
          `${startDate.format("YYYY-MM-DD")}T${startTime.format("HH:mm:ss")}`
        ).format("DD/MM/YYYY HH:mm:ss")
      : startDate?.format(dateFormats[selectedOption])
  }`;

  const combinedEndDateTimeString = `${
    endtDate && endTime && selectedOptionEnd === "exact-year"
      ? dayjs(
          `${endtDate.format("YYYY-MM-DD")}T${endTime.format("HH:mm:ss")}`
        ).format("DD/MM/YYYY HH:mm:ss")
      : endtDate?.format(dateFormats[selectedOptionEnd])
  }`;

  const onRadioChange = (e: RadioChangeEvent) => {
    setSelectedOption(e.target.value);
  };
  const onRadioChangeEnd = (e: RadioChangeEvent) => {
    setSelectedOptionEnd(e.target.value);
  };
  const onRadioChangeInput = (e: RadioChangeEvent) => {
    setSelectedDateInput(e.target.value);
  };

  const navigate = useNavigate();

  const autocompleteRef = useRef<google.maps.places.Autocomplete | null>(null);
  const handleEditorChange = (content: string) => {
    setEditorContent(content);
  };

  const handleLocationSelect = async () => {
    if (!autocompleteRef.current) {
      return;
    }
    const place = autocompleteRef.current.getPlace();
    if (!place || !place.geometry || !place.geometry.location) {
      return;
    }
    const newLocation = {
      name: place.name,
      point: {
        type: "Point",
        coordinates: [
          Number(place.geometry.location.lng().toFixed(6)),
          Number(place.geometry.location.lat().toFixed(6)),
        ],
      },
      latitude: Number(place.geometry.location.lat().toFixed(6)),
      longitude: Number(place.geometry.location.lng().toFixed(6)),
    };
    const backendLocationData = {
      lat: Number(place.geometry.location.lat().toFixed(6)),
      lng: Number(place.geometry.location.lng().toFixed(6)),
      name: place.name,
      city: await getLocationName(
        Number(place.geometry.location.lat().toFixed(6)),
        Number(place.geometry.location.lng().toFixed(6)),
        1
      ),
      country: await getLocationName(
        Number(place.geometry.location.lat().toFixed(6)),
        Number(place.geometry.location.lng().toFixed(6)),
        2
      ),
      type: "Point",
      coordinates: [
        [
          Number(place.geometry.location.lng().toFixed(6)),
          Number(place.geometry.location.lat().toFixed(6)),
        ],
      ],
      radius: null,
    };
    setLocations((prevLocations) => {
      const updatedLocations = [...prevLocations, newLocation];
      console.log("New locations array:", updatedLocations);
      return updatedLocations;
    });
    setLocationsBackend((prevLocations) => [
      ...prevLocations,
      backendLocationData,
    ]);
    setMapCenter({
      lat: newLocation.latitude,
      lng: newLocation.longitude,
    });
  };

  const disabledDate = (currentDate: dayjs.Dayjs): boolean => {
    const today = dayjs();
    const isAfterToday = currentDate.isAfter(today);
    const isBeforeStartDate = currentDate.isBefore(
      dayjs(startDate, dateFormats[selectedOption])
    );
    return isAfterToday || isBeforeStartDate;
  };

  const disableStartdDate = (currentDate: dayjs.Dayjs): boolean => {
    const today = dayjs();
    const isAfterToday = currentDate.isAfter(today);
    return isAfterToday;
  };

  const handleStartTimeChange = (time: Dayjs | null, timeString: string) => {
    setStartTime(time);
    console.log(time?.format("HH:mm:ss"));
  };
  const handleEndTimeChange = (time: Dayjs | null, timeString: string) => {
    setEndTime(time);
    console.log(time?.format("HH:mm:ss"));
  };

  const handleSubmit = () => {
    const storyRequest = {
      text,
      header,
      labels,
      locationsAdvanced: locationsBackend,
      mediaString: media,
      richText: editorContent,
      ...(startDate && { startDate: combinedStartDateTimeString }),
      ...(endtDate && { endDate: combinedEndDateTimeString }),
      ...(selectedSeason && { startSeason: selectedSeason }),
      ...(selectedSeasonEnd && { endSeason: selectedSeasonEnd }),
      ...(decade && { decade: decade }),
    };
    async function postData() {
      const requiredFieldsEmpty = [
        storyRequest.richText,
        storyRequest.header,
        storyRequest.locationsAdvanced,
        storyRequest.startDate,
      ].some(
        (value) => value === undefined || value === "" || value.length === 0
      );
      if (requiredFieldsEmpty) {
        alert(
          "The necessary field is empty! Please make sure necessary fields like header and text are not empty, and the story has a start date and at least one location."
        );
        return;
      } else {
        try {
          const response = await axios.post(
            `${import.meta.env.VITE_BACKEND_URL}/stories/advanced`,
            storyRequest,
            {
              withCredentials: true,
            }
          );
        } catch (error) {}
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
    imageCompress: {
      quality: 0.7,
      maxWidth: 1024,
      maxHeight: 1024,
      imageType: "image/jpeg",
      debug: false,
    },
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

  useEffect(() => {
    const cookieValue = document.cookie
      .split("; ")
      .find((row) => row.startsWith("jwt_Token"))
      ?.split("=")[1];
    if (!cookieValue) {
      navigate("/login");
    }
  }, []);

  const handleLocationRemove = (index: any) => {
    const overlayToRemove = drawnItems[index];
    if (overlayToRemove) {
      overlayToRemove.setMap(null);
    }
    const updatedDrawnItems = drawnItems.filter((_, i) => i !== index);
    const updatedLocations = locations.filter((_, i) => i !== index);
    const updatedLocationsBackend = locationsBackend.filter(
      (_, i) => i !== index
    );
    setDrawnItems(updatedDrawnItems);
    setLocations(updatedLocations);
    setLocationsBackend(updatedLocationsBackend);
  };

  const onOverlayComplete = async (event: any) => {
    let locationData = {};
    let name = "Custom Location";
    switch (event.type) {
      case "marker":
        event.overlay.setMap(null);
        locationData = {
          name: name,
          latitude: event.overlay.getPosition().lat(),
          longitude: event.overlay.getPosition().lng(),
        };
        break;
      case "polyline":
        const firstPathPoint = event.overlay.getPath().getArray()[0];
        locationData = {
          name: name,
          latitude: firstPathPoint.lat(),
          longitude: firstPathPoint.lng(),
        };
        break;
      case "rectangle":
        const rectBounds = event.overlay.getBounds();
        const northEast = rectBounds.getNorthEast();
        const southWest = rectBounds.getSouthWest();
        const rectCenterLat = (southWest.lat() + northEast.lat()) / 2;
        const rectCenterLng = (southWest.lng() + northEast.lng()) / 2;
        locationData = {
          name: name,
          latitude: rectCenterLat,
          longitude: rectCenterLng,
        };
        break;
      case "polygon":
        const bounds = new window.google.maps.LatLngBounds();
        event.overlay
          .getPath()
          .getArray()
          .forEach((path: any) => {
            bounds.extend(path);
          });
        const center = bounds.getCenter();
        locationData = {
          name: name,
          latitude: center.lat(),
          longitude: center.lng(),
        };
        break;
      case "circle":
        locationData = {
          name: name,
          latitude: event.overlay.getCenter().lat(),
          longitude: event.overlay.getCenter().lng(),
          radius: event.overlay.getRadius(),
        };
        console.log(event.overlay.getRadius());
        break;
      default:
        console.error("Unsupported shape type:", event.type);
        return;
    }
    setDrawnItems((prevDrawnItems) => [...prevDrawnItems, event.overlay]);
    try {
      const response = await axios.get(
        `https://maps.googleapis.com/maps/api/geocode/json?latlng=${
          (locationData as any).latitude
        },${(locationData as any).longitude}&key=${api_key}`
      );
      const { results } = response.data;
      if (results.length > 0) {
        (locationData as any).name = results[0].formatted_address;
      } else {
        (locationData as any).name = "Unnamed location";
      }
    } catch (error) {
      console.error("Error fetching location name:", error);
      (locationData as any).name = "Unnamed location";
    }
    console.log("Location Data for Backend 1:", locationData);
    setLocations((prevLocations) => [...prevLocations, locationData]);
    let backendLocationData = {};
    switch (event.type) {
      case "marker":
        backendLocationData = {
          lat: event.overlay.getPosition().lat(),
          lng: event.overlay.getPosition().lng(),
          name: await getLocationName(
            event.overlay.getPosition().lat(),
            event.overlay.getPosition().lng(),
            0
          ),
          city: await getLocationName(
            event.overlay.getPosition().lat(),
            event.overlay.getPosition().lng(),
            1
          ),
          country: await getLocationName(
            event.overlay.getPosition().lat(),
            event.overlay.getPosition().lng(),
            2
          ),
          type: "Point",
          coordinates: [
            [
              event.overlay.getPosition().lng(),
              event.overlay.getPosition().lat(),
            ],
          ],
          radius: null,
        };
        break;
      case "rectangle":
        const bounds = event.overlay.getBounds();
        const ne = bounds.getNorthEast();
        const sw = bounds.getSouthWest();
        const rectangleCoordinates = [
          [sw.lng(), sw.lat()],
          [ne.lng(), sw.lat()],
          [ne.lng(), ne.lat()],
          [sw.lng(), ne.lat()],
          [sw.lng(), sw.lat()],
        ];
        backendLocationData = {
          lat: ne.lat() + sw.lat(),
          lng: ne.lng() + sw.lng(),
          name: await getLocationName(
            (ne.lat() + sw.lat()) / 2,
            (ne.lng() + sw.lng()) / 2,
            0
          ),
          city: await getLocationName(
            (ne.lat() + sw.lat()) / 2,
            (ne.lng() + sw.lng()) / 2,
            1
          ),
          country: await getLocationName(
            (ne.lat() + sw.lat()) / 2,
            (ne.lng() + sw.lng()) / 2,
            2
          ),
          type: "Polygon",
          coordinates: rectangleCoordinates,
          radius: null,
        };
        break;
      case "polygon":
        const path = event.overlay.getPath().getArray();
        const coordinates = path.map((p: any) => [p.lng(), p.lat()]);
        coordinates.push([path[0].lng(), path[0].lat()]);
        backendLocationData = {
          lat: path[0].lat(),
          lng: path[0].lng(),
          name: await getLocationName(path[0].lat(), path[0].lng(), 0),
          city: await getLocationName(path[0].lat(), path[0].lng(), 1),
          country: await getLocationName(path[0].lat(), path[0].lng(), 2),
          type: "Polygon",
          coordinates: coordinates,
          radius: null,
        };
        break;
      case "circle":
        backendLocationData = {
          lat: event.overlay.getCenter().lat(),
          lng: event.overlay.getCenter().lng(),
          name: await getLocationName(
            event.overlay.getCenter().lat(),
            event.overlay.getCenter().lng(),
            0
          ),
          city: await getLocationName(
            event.overlay.getCenter().lat(),
            event.overlay.getCenter().lng(),
            1
          ),
          country: await getLocationName(
            event.overlay.getCenter().lat(),
            event.overlay.getCenter().lng(),
            2
          ),
          type: "Circle",
          coordinates: [
            [event.overlay.getCenter().lng(), event.overlay.getCenter().lat()],
          ],
          radius: event.overlay.getRadius(),
        };
        break;
      default:
        console.error("Unsupported shape type:", event.type);
        return;
    }
    console.log("Location Data for Backend:", backendLocationData);
    setLocationsBackend((prevLocations) => [
      ...prevLocations,
      backendLocationData,
    ]);
    //onAddLocation(backendLocationData);
  };
  async function getLocationName(lat: any, lng: any, type: any) {
    try {
      const response = await axios.get(
        `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${api_key}`
      );
      const { results } = response.data;
      let city = "";
      let country = "";
      results.forEach((item: any) => {
        item.address_components.forEach((subItem: any) => {
          if (
            subItem.types.includes("administrative_area_level_1") ||
            subItem.types.includes("locality")
          )
            city = subItem.long_name;
          if (subItem.types.includes("country")) country = subItem.long_name;
        });
      });
      if (results.length > 0 && type === 0) {
        return results[0].formatted_address;
      } else if (type === 1) return city;
      else if (type === 2) return country;
      else return "Unnamed location";
    } catch (error) {
      console.error("Error fetching location name:", error);
      return "Unnamed location";
    }
  }

  const handleMapLoad = (map: any) => {
    if (!window.google.maps.drawing) {
      console.error("Drawing library is not loaded");
      return;
    }
    const manager = new window.google.maps.drawing.DrawingManager({
      drawingControl: true,
      drawingControlOptions: {
        position: window.google.maps.ControlPosition.TOP_CENTER,
        drawingModes: [
          window.google.maps.drawing.OverlayType.MARKER,
          window.google.maps.drawing.OverlayType.CIRCLE,
          window.google.maps.drawing.OverlayType.POLYGON,
          window.google.maps.drawing.OverlayType.RECTANGLE,
        ],
      },
    });
    manager.setMap(map);
    window.google.maps.event.addListener(
      manager,
      "overlaycomplete",
      onOverlayComplete
    );
  };

  const handleGetUserLocation = async () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;
          const lat = Number(latitude.toFixed(6));
          const lng = Number(longitude.toFixed(6));
          const name = await getLocationName(
            Number(lat.toFixed(6)),
            Number(lng.toFixed(6)),
            0
          );

          let city = await getLocationName(
            Number(lat.toFixed(6)),
            Number(lng.toFixed(6)),
            1
          );
          let country = await getLocationName(
            Number(lat.toFixed(6)),
            Number(lng.toFixed(6)),
            2
          );

          const newLocation = {
            name: name,
            latitude: lat,
            longitude: lng,
          };
          const backendLocationData = {
            lat: lat,
            lng: lng,
            name: name,
            city: city,
            country: country,
            type: "Point",
            coordinates: [[lng, lat]],
            radius: null,
          };
          setLocations((prevLocations) => {
            const updatedLocations = [...prevLocations, newLocation];
            console.log("New locations array:", updatedLocations);
            return updatedLocations;
          });
          setLocationsBackend((prevLocations) => [
            ...prevLocations,
            backendLocationData,
          ]);
          setMapCenter({
            lat: newLocation.latitude,
            lng: newLocation.longitude,
          });
          console.log("Location Data for Backend:", backendLocationData);
        },
        (error) => {
          console.error("Error getting location:", error.message);
        }
      );
    } else {
      alert("Geolocation is not supported by your browser");
    }
  };

  return (
    <div className="bg-green-50">
      <NavBar />

      <h1 className="text-5xl font-extrabold dark:text-black text-center my-2">
        Create Story
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
        <div className="flex flex-row w-4/5 mx-auto">
          <div
            className="w-1/2 mr-4 border-customGreen border-solid border-3"
            style={{
              backgroundColor: "#fff",
              borderRadius: "8px",
              padding: 10,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              marginBottom: 10,
              boxShadow: "0px 0px 10px 2px rgba(0, 0, 0, 0.1)",
              touchAction: "pan-y",
            }}
          >
            <Row>
              <Radio.Group
                options={decadeOption}
                onChange={onRadioChangeInput}
                value={selectedDateInput}
                optionType="button"
                buttonStyle="solid"
                style={{
                  marginBottom: "10px",
                  width: "100%",
                  minWidth: "100px",
                  maxWidth: "200px",
                  touchAction: "pan-y",
                }}
              />
            </Row>
            {selectedDateInput !== "date" && (
              <Row>
                <Select
                  value={selectedDecadeValue}
                  onChange={(value: number) => {
                    const decString = value - 1;
                    const decEndString = value + 7;
                    setDecade(decString.toString() + "s");
                    setStartDate(dayjs(value.toString(), yearFormat));
                    setEndDate(dayjs(decEndString.toString(), yearFormat));
                  }}
                  options={decadeSelectOptions}
                  placeholder="Select a decade"
                  style={{
                    marginBottom: "5px",
                    marginTop: "5px",
                    width: "100%",
                    minWidth: "100px",
                    maxWidth: "200px",
                    touchAction: "pan-y",
                  }}
                />
              </Row>
            )}
            {selectedDateInput === "date" && (
              <>
                <div>
                  <Col style={{ marginRight: "30px" }}>
                    <Row gutter={[16, 16]} justify="center" align="middle">
                      <Col span={24}>
                        <label>Start Season:</label>
                        <Select
                          value={selectedSeason}
                          onChange={(value) => setSelectedSeason(value)}
                          options={seasonOptions}
                          placeholder="Start Season"
                          style={{
                            marginBottom: "10px",
                            width: "100%",
                            minWidth: "100px",
                            maxWidth: "200px",
                            touchAction: "pan-y",
                          }}
                        />
                      </Col>
                      <Col span={24}>
                        <label>End Season:</label>
                        <Select
                          value={selectedSeasonEnd}
                          onChange={(value) => setSelectedSeasonEnd(value)}
                          options={seasonOptions}
                          placeholder="End Season"
                          style={{
                            marginBottom: "10px",
                            width: "100%",
                            minWidth: "100px",
                            touchAction: "pan-y",
                            maxWidth: "200px",
                          }}
                        />
                      </Col>
                    </Row>
                  </Col>
                </div>
                <div
                  style={{
                    justifyContent: "center",
                    alignItems: "center",
                    touchAction: "pan-y",
                  }}
                >
                  <Radio.Group
                    options={options}
                    onChange={onRadioChange}
                    value={selectedOption}
                    optionType="button"
                    buttonStyle="solid"
                    style={{
                      margin: "auto",
                      width: "100%",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  />
                </div>
                {selectedOption === "exact-year" && (
                  <>
                    <TimePicker
                      onChange={handleStartTimeChange}
                      inputReadOnly={true}
                      defaultOpenValue={dayjs("00:00:00", "HH:mm:ss")}
                      style={{
                        marginTop: "10px",
                        marginBottom: "10px",
                        width: "100%",
                        minWidth: "100px",
                        touchAction: "pan-y",
                        maxWidth: "200px",
                      }}
                    />
                    <DatePicker
                      placeholder="Select start date"
                      status="error"
                      picker="date"
                      disabledDate={disableStartdDate}
                      inputReadOnly={true}
                      format={exactDateFormat}
                      onChange={(date) => {
                        const start = dayjs(date, exactDateFormat);
                        setStartDate(start);
                        console.log(start.format(exactDateFormat));
                      }}
                      style={{
                        marginBottom: "20px",
                        width: "100%",
                        minWidth: "100px",
                        touchAction: "pan-y",
                        maxWidth: "200px",
                      }}
                    />
                  </>
                )}
                {selectedOption === "month" && (
                  <DatePicker
                    style={{
                      marginTop: "10px",
                      marginBottom: "10px",
                      width: "100%",
                      minWidth: "100px",
                      maxWidth: "200px",
                      touchAction: "pan-y",
                    }}
                    inputReadOnly={true}
                    status="error"
                    format={monthFormat}
                    disabledDate={disableStartdDate}
                    picker="month"
                    placeholder="Select start date"
                    onChange={(date) => {
                      const start = dayjs(date, monthFormat);
                      setStartDate(start);

                      console.log(startDate?.toString);
                      // Do something with the selected date value here
                    }}
                  />
                )}
                {selectedOption === "year" && (
                  <DatePicker
                    style={{
                      marginTop: "10px",
                      marginBottom: "10px",
                      width: "100%",
                      minWidth: "100px",
                      touchAction: "pan-y",
                      maxWidth: "200px",
                    }}
                    inputReadOnly={true}
                    placeholder="Select start Year"
                    status="error"
                    format={yearFormat}
                    disabledDate={disableStartdDate}
                    picker="year"
                    onChange={(date) => {
                      const start = dayjs(date, yearFormat);
                      setStartDate(start);
                      console.log(startDate?.toString);
                      // Do something with the selected date value here
                    }}
                  />
                )}
                <div style={{ justifyContent: "center", alignItems: "center" }}>
                  <Radio.Group
                    options={options}
                    onChange={onRadioChangeEnd}
                    value={selectedOptionEnd}
                    optionType="button"
                    buttonStyle="solid"
                    style={{
                      margin: "auto",
                      marginBottom: "10px",
                      width: "100%",
                      touchAction: "pan-y",
                    }}
                  />
                </div>
                {selectedOptionEnd === "exact-year" && (
                  <>
                    <TimePicker
                      onChange={handleEndTimeChange}
                      defaultOpenValue={dayjs("00:00:00", "HH:mm:ss")}
                      inputReadOnly={true}
                      style={{
                        marginTop: "10px",
                        marginBottom: "10px",
                        width: "100%",
                        minWidth: "100px",
                        maxWidth: "200px",
                        touchAction: "pan-y",
                      }}
                    />
                    <DatePicker
                      style={{
                        marginTop: "10px",
                        marginBottom: "10px",
                        width: "100%",
                        minWidth: "100px",
                        maxWidth: "200px",
                        touchAction: "pan-y",
                      }}
                      placeholder="Select end date"
                      picker="date"
                      inputReadOnly={true}
                      disabledDate={disabledDate}
                      format={exactDateFormat}
                      onChange={(date) => {
                        const start = dayjs(date, exactDateFormat);
                        setEndDate(start);
                      }}
                    />
                  </>
                )}
                {selectedOptionEnd === "month" && (
                  <DatePicker
                    style={{
                      marginTop: "10px",
                      marginBottom: "10px",
                      width: "100%",
                      minWidth: "100px",
                      maxWidth: "200px",
                      touchAction: "pan-y",
                    }}
                    inputReadOnly={true}
                    placeholder="Select end date"
                    format={monthFormat}
                    disabledDate={disabledDate}
                    picker="month"
                    onChange={(date) => {
                      const start = dayjs(date, monthFormat);
                      setEndDate(start);
                    }}
                  />
                )}
                {selectedOptionEnd === "year" && (
                  <DatePicker
                    style={{
                      marginTop: "10px",
                      marginBottom: "10px",
                      width: "100%",
                      minWidth: "100px",
                      maxWidth: "200px",
                    }}
                    inputReadOnly={true}
                    placeholder="Select end Year"
                    format={yearFormat}
                    picker="year"
                    disabledDate={disabledDate}
                    onChange={(date) => {
                      const start = dayjs(date, yearFormat);
                      setEndDate(start);
                    }}
                  />
                )}
              </>
            )}
          </div>

          <div
            className="w-1/2 border-customGreen border-solid border-3"
            style={{
              backgroundColor: "#fff",
              borderRadius: "5px",
              padding: 5,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              marginBottom: 10,
              boxShadow: "0px 0px 10px 2px rgba(0, 0, 0, 0.1)",
              touchAction: "pan-y",
            }}
          >
            <div className="w-4/5">
              <div>
                <label>Locations:</label>
                <div className="flex w-full">
                  <Autocomplete
                    onLoad={(autocomplete) => {
                      autocompleteRef.current = autocomplete;
                    }}
                    onPlaceChanged={handleLocationSelect}
                  >
                    <input
                      type="text"
                      className="form-control"
                      style={{
                        marginBottom: "5px",
                        marginTop: "5px",
                        width: "100%",
                        minWidth: "100px",
                        maxWidth: "200px",
                        touchAction: "pan-y",
                      }}
                    />
                  </Autocomplete><div className="justify-center text-center items-center my-auto">
                  <MyLocationIcon
                    onClick={handleGetUserLocation}
                    fontSize="large"
                    style={{ marginLeft: "5px", cursor: "pointer" }}
                  /></div>
                </div>
                <div
                  className="align-items-center"
                  style={{
                    maxHeight: 250,
                    overflowY: "scroll",
                    borderTop: "1px solid #ccc",
                    borderBottom: "1px solid #ccc",
                    marginBottom: 2,
                    touchAction: "pan-y",
                  }}
                >
                  {locations.map((loc, index) => (
                    <div className="flex align-items-center">
                      <div
                        key={index}
                        className="align-items-center flex w-52 m-1 p-1 bg-customGreen text-white rounded-full"
                      >
                        <p className="flex-1">
                          <LocationOnIcon />{" "}
                          {loc.name
                            ? loc.name.length > 20
                              ? loc.name.slice(0, 20) + "..."
                              : loc.name
                            : `${loc.lat}, ${loc.lng}`}
                        </p>
                      </div>
                      <CancelIcon
                        type="button"
                        fontSize="medium"
                        className="text-red-800"
                        style={{
                          cursor: "pointer",
                        }}
                        onClick={() =>
                          setLocations(locations.filter((_, i) => i !== index))
                        }
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <GoogleMap
              mapContainerStyle={containerStyle}
              center={mapCenter}
              zoom={11}
              onLoad={handleMapLoad}
            >
              {locations.map((loc, index) => (
                <Marker
                  icon={icon}
                  key={index}
                  position={{ lat: loc.latitude, lng: loc.longitude }}
                />
              ))}
            </GoogleMap>
          </div>
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
            className="text-white bg-gradient-to-r from-cyan-500 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-10 mt-2"
          >
            Create Story!
          </button>
        </div>
      </div>
    </div>
  );
};

export default Story;
