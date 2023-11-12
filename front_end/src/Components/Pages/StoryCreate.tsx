import React, { useState, useRef, ChangeEvent, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "react-quill/dist/quill.snow.css";
import { GoogleMap, Marker, Autocomplete } from "@react-google-maps/api";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import ReactQuill, { Quill } from "react-quill";
import NavBar from "../Components/NavBar";
import dayjs from "dayjs";
import DatePicker from "antd/es/date-picker";
import { Layout, Radio, RadioChangeEvent, Select, TimePicker, Col, Row, Form, Typography, Space } from "antd";
import type { Dayjs } from "dayjs";
import ImageCompress from "quill-image-compress";
import { DeleteTwoTone } from "@ant-design/icons";
import icon from "../../assets/images/icon-resized.png";

const { Text } = Typography;
const { Content } = Layout;

Quill.register('modules/imageCompress', ImageCompress);

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
  const [selectedOptionEnd, setSelectedOptionEnd] = useState<string>("exact-year");
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
    { value: 2021, label: "2020s" }
  ];

  const dateFormats: { [key: string]: string } = {
    "exact-year": "DD/MM/YYYY",
    month: "MM/YYYY",
    year: "YYYY",
  };

  const combinedStartDateTimeString = `${startDate && startTime && selectedOption === 'exact-year'
    ? dayjs(
      `${startDate.format("YYYY-MM-DD")}T${startTime.format("HH:mm:ss")}`
    ).format("DD/MM/YYYY HH:mm:ss")
    : startDate?.format(dateFormats[selectedOption])
    }`;

  const combinedEndDateTimeString = `${endtDate && endTime && selectedOptionEnd === "exact-year"
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

  const handleLocationSelect = () => {
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
          Number(place.geometry.location.lat().toFixed(6))
        ]
      },
      latitude: Number(place.geometry.location.lat().toFixed(6)),
      longitude: Number(place.geometry.location.lng().toFixed(6))
    };
    setLocations(prevLocations => {
      const updatedLocations = [...prevLocations, newLocation];
      console.log("New locations array:", updatedLocations);
      return updatedLocations;
    });
    setMapCenter({
      lat: newLocation.latitude,
      lng: newLocation.longitude
    });
    // if (inputRef.current) {
    //   inputRef.current.value = "";
    // }
    // if (onAddLocation) {
    //   onAddLocation(newLocation);
    // }
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
      ...(decade && { decade: decade })
    };
    async function postData() {
      const requiredFieldsEmpty = [storyRequest.richText, storyRequest.header, storyRequest.locationsAdvanced, storyRequest.startDate].some(
        (value) => value === undefined || value === "" || value.length === 0
      );
      if (requiredFieldsEmpty) {
        alert("The necessary field is empty! Please make sure necessary fields like header and text are not empty, and the story has a start date and at least one location.");
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
        } catch (error) {
        }
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
    }
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
    const updatedLocationsBackend = locationsBackend.filter((_, i) => i !== index);
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
        event.overlay.getPath().getArray().forEach((path: any) => {
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
        console.log(event.overlay.getRadius())
        break;
      default:
        console.error("Unsupported shape type:", event.type);
        return;
    }
    setDrawnItems(prevDrawnItems => [...prevDrawnItems, event.overlay]);
    try {
      const response = await axios.get(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${(locationData as any).latitude},${(locationData as any).longitude}&key=${api_key}`);
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
    setLocations(prevLocations => [...prevLocations, locationData]);
    let backendLocationData = {};
    switch (event.type) {
      case "marker":
        backendLocationData = {
          name: await getLocationName(event.overlay.getPosition().lat(), event.overlay.getPosition().lng()),
          type: "Point",
          coordinates: [[event.overlay.getPosition().lng(), event.overlay.getPosition().lat()]],
          radius: null
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
          [sw.lng(), sw.lat()]
        ];
        backendLocationData = {
          name: await getLocationName((ne.lat() + sw.lat()) / 2, (ne.lng() + sw.lng()) / 2),
          type: "Polygon",
          coordinates: rectangleCoordinates,
          radius: null
        };
        break;
      case "polygon":
        const path = event.overlay.getPath().getArray();
        const coordinates = path.map((p: any) => [p.lng(), p.lat()]);
        coordinates.push([path[0].lng(), path[0].lat()]);
        backendLocationData = {
          name: await getLocationName(path[0].lat(), path[0].lng()),
          type: "Polygon",
          coordinates: coordinates,
          radius: null
        };
        break;
      case "circle":
        backendLocationData = {
          name: await getLocationName(event.overlay.getCenter().lat(), event.overlay.getCenter().lng()),
          type: "Circle",
          coordinates: [[event.overlay.getCenter().lng(), event.overlay.getCenter().lat()]],
          radius: event.overlay.getRadius()
        };
        break;
      default:
        console.error("Unsupported shape type:", event.type);
        return;
    }
    console.log("Location Data for Backend:", backendLocationData);
    setLocationsBackend(prevLocations => [...prevLocations, backendLocationData]);
    //onAddLocation(backendLocationData); 
  };
  async function getLocationName(lat: any, lng: any) {
    try {
      const response = await axios.get(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${api_key}`);
      const { results } = response.data;
      if (results.length > 0) {
        return results[0].formatted_address;
      }
      return "Unnamed location";
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
    window.google.maps.event.addListener(manager, "overlaycomplete", onOverlayComplete);
  };

  return (
    <Layout
      style={{ backgroundColor: "white" }}>
      <NavBar />
      <Col
        offset={1}
        span={22}>
        <Content>
          <Form
            layout="vertical">
            <Form.Item
              style={{ paddingTop: "1vh" }}
              label={<Text style={{ fontSize: "16px", fontFamily: "system-ui", fontWeight: "500" }}>{"Header"}</Text>}>
              <input
                type="text"
                className="form-control"
                value={header}
                onChange={handleHeaderChange}
              />
            </Form.Item>
            <Form.Item
              label={<Text style={{ fontSize: "16px", fontFamily: "system-ui", fontWeight: "500" }}>{"Comma Seperated Labels"}</Text>}>
              <input
                type="text"
                className="form-control"
                value={labels.join(", ")}
                onChange={handleLabelsChange}
              />
            </Form.Item>
            <Form.Item
              style={{ paddingTop: "0px" }}>
              {labels.map((value, index) => (
                <div key={index}>
                  <li
                    style={{
                      display: "inline-block",
                      marginRight: "0.5em",
                      marginLeft: "0.5em",
                    }}
                  >
                    {value}
                  </li>
                  <DeleteTwoTone
                    onClick={() => {
                      setLabels(labels.filter((_, i) => i !== index));
                    }}
                  />
                </div>
              ))}
            </Form.Item>
            <Row>
              <Col>
                <Form.Item>
                  <Radio.Group
                    options={decadeOption}
                    onChange={onRadioChangeInput}
                    value={selectedDateInput}
                    optionType="button"
                    buttonStyle="solid"
                    style={{ marginBottom: "10px" }}
                  />
                </Form.Item>
                {selectedDateInput !== "date" &&
                  <Form.Item>
                    <Select
                      value={selectedDecadeValue}
                      onChange={(value: number) => {
                        const decString = value - 1
                        const decEndString = value + 7
                        setDecade(decString.toString() + "s")
                        setStartDate(dayjs(value.toString(), yearFormat))
                        setEndDate(dayjs(decEndString.toString(), yearFormat))
                      }}
                      options={decadeSelectOptions}
                      placeholder="Select a decade."
                      style={{ marginBottom: "30px" }}
                    />
                  </Form.Item>
                }
                {selectedDateInput === "date" &&
                  <Form.Item>
                    <Space>
                      <Select
                        value={selectedSeason}
                        onChange={(value) => setSelectedSeason(value)}
                        options={seasonOptions}
                        placeholder="Select a start season."
                        style={{ marginBottom: "30px" }}
                      />
                      <Select
                        value={selectedSeasonEnd}
                        onChange={(value) => setSelectedSeasonEnd(value)}
                        options={seasonOptions}
                        placeholder="Select an end season."
                        style={{ marginBottom: "30px" }}
                      />
                    </Space>
                  </Form.Item>
                }
              </Col>
              {selectedDateInput === "date" &&
                <>
                  <Col
                    offset={1}>
                    <Form.Item>
                      <Radio.Group
                        options={options}
                        onChange={onRadioChange}
                        value={selectedOption}
                        optionType="button"
                        buttonStyle="solid"
                        style={{ marginBottom: "10px" }}
                      />
                    </Form.Item>
                    {selectedOption === "exact-year" && (
                      <Space
                        align="start">
                        <TimePicker
                          onChange={handleStartTimeChange}
                          defaultOpenValue={dayjs("00:00:00", "HH:mm:ss")}
                          style={{ marginBottom: "10px" }}
                        />
                        <DatePicker
                          placeholder="Select start date!"
                          status="error"
                          picker="date"
                          disabledDate={disableStartdDate}
                          format={exactDateFormat}
                          onChange={(date) => {
                            const start = dayjs(date, exactDateFormat);
                            setStartDate(start);
                            console.log(start.format(exactDateFormat));
                          }}
                        />
                      </Space>
                    )}
                    {selectedOption === "month" && (
                      <Form.Item>
                        <DatePicker
                          status="error"
                          format={monthFormat}
                          disabledDate={disableStartdDate}
                          picker="month"
                          placeholder="Select start date!"
                          onChange={(date) => {
                            const start = dayjs(date, monthFormat);
                            setStartDate(start);
                          }}
                        />
                      </Form.Item>
                    )}
                    {selectedOption === "year" && (
                      <DatePicker
                        placeholder="Select start date!"
                        status="error"
                        format={yearFormat}
                        disabledDate={disableStartdDate}
                        picker="year"
                        onChange={(date) => {
                          const start = dayjs(date, yearFormat);
                          setStartDate(start);
                        }}
                      />
                    )}
                  </Col>
                  <Col
                    offset={1}>
                    <Form.Item>
                      <Radio.Group
                        options={options}
                        onChange={onRadioChangeEnd}
                        value={selectedOptionEnd}
                        optionType="button"
                        buttonStyle="solid"
                        style={{ marginBottom: "10px" }}
                      />
                    </Form.Item>
                    {selectedOptionEnd === "exact-year" && (
                      <Space
                        align="start">
                        <TimePicker
                          onChange={handleEndTimeChange}
                          defaultOpenValue={dayjs("00:00:00", "HH:mm:ss")}
                          style={{ marginBottom: "10px" }}
                        />
                        <DatePicker
                          placeholder="Select end date!"
                          picker="date"
                          disabledDate={disabledDate}
                          format={exactDateFormat}
                          onChange={(date) => {
                            const start = dayjs(date, exactDateFormat);
                            setEndDate(start);
                          }}
                        />
                      </Space>
                    )}
                    {selectedOptionEnd === "month" && (
                      <DatePicker
                        placeholder="Select end date!"
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
                        placeholder="Select end date!"
                        format={yearFormat}
                        picker="year"
                        disabledDate={disabledDate}
                        onChange={(date) => {
                          const start = dayjs(date, yearFormat);
                          setEndDate(start);
                        }}
                      />
                    )}
                  </Col>
                </>
              }
            </Row>
            <Form.Item>
              <ReactQuill
                theme="snow"
                value={editorContent}
                onChange={handleEditorChange}
                formats={formats}
                modules={modules}
                style={{ marginTop: "50px" }}
              />
            </Form.Item>
            <Form.Item
              label={<Text style={{ fontSize: "16px", fontFamily: "system-ui", fontWeight: "500" }}>{"Locations"}</Text>}>
              <Autocomplete
                onLoad={(autocomplete) => {
                  autocompleteRef.current = autocomplete;
                }}
                onPlaceChanged={handleLocationSelect}
              >
                <input type="text" className="form-control" />
              </Autocomplete>
            </Form.Item>
            <Form.Item>
              {locations.map((loc, index) => (
                <div key={index}>
                  <li
                    style={{
                      display: "inline-block",
                      marginRight: "0.5em",
                      marginLeft: "0.5em",
                    }}
                  >
                    {loc.name || `${loc.latitude}, ${loc.longitude}`}
                  </li>
                  <DeleteTwoTone
                    onClick={() => {
                      handleLocationRemove(index);
                    }}
                  />
                </div>
              ))}
            </Form.Item>
            <GoogleMap
              mapContainerStyle={containerStyle}
              center={mapCenter}
              zoom={20}
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
            <Form.Item>
              <button style={{ marginTop: "40px" }} type="submit" className="btn btn-primary" onClick={handleSubmit}>
                Create Story!
              </button>
            </Form.Item>
          </Form>
        </Content>
      </Col >
    </Layout >
  );
};

export default Story;
