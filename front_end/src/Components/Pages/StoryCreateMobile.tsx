import React, { useState, useRef, ChangeEvent, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "react-quill/dist/quill.snow.css";

import { GoogleMap, Marker, Autocomplete } from "@react-google-maps/api";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import ReactQuill, { Quill } from "react-quill";
import { Col, Row, Container } from "react-bootstrap";
import dayjs from "dayjs";
import DatePicker from "antd/es/date-picker";
import { Radio, RadioChangeEvent, Select, TimePicker } from "antd";
import type { Dayjs } from "dayjs";
import CancelIcon from "@mui/icons-material/Cancel";
import ImageCompress from "quill-image-compress";
import { Chip } from "@mui/material";
import MyLocationIcon from "@mui/icons-material/MyLocation";
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
  city?: string;
  country?: string;
}

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

const StoryCreateMobile: React.FC = () => {
  const [mapCenter, setMapCenter] = useState<{ lat: number; lng: number }>({
    lat: 41.0856396,
    lng: 29.0424937,
  });
  const [startTime, setStartTime] = useState<dayjs.Dayjs | null>();
  const [endTime, setEndTime] = useState<dayjs.Dayjs | null>();
  const [locations, setLocations] = useState<Location[]>([]);
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
  const [posted, setPosted] = useState(false);

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
  const handleLocationSelect = () => {
    const place = autocompleteRef.current?.getPlace();

    if (place?.geometry?.location) {
      const addressComponents = place?.address_components;

      let country = "";
      let city = "";

      addressComponents?.forEach((component) => {
        if (component.types.includes("country")) {
          country = component.long_name;
        }

        if (
          component.types.includes("administrative_area_level_1") ||
          component.types.includes("locality")
        ) {
          city = component.long_name;
        }
      });
      const locationData: Location = {
        name: place.name || "",
        lat: Number(place.geometry?.location?.lat().toFixed(6)),
        lng: Number(place.geometry?.location?.lng().toFixed(6)),
        city: city,
        country: country,
      };

      setLocations([...locations, locationData]);

      console.log(locationData);
      setMapCenter({ lat: locationData.lat, lng: locationData.lng });
    }
  };

  const handleGetUserLocation = async () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;

          const name = "User Location";
          const lat = Number(latitude.toFixed(6));
          const lng = Number(longitude.toFixed(6));
          let city = "";
          let country = "";

          try {
            const response = await axios.get(
              `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${api_key}`
            );

            const { results } = response.data;

            results.forEach((result: any) => {
              const address_components = result.address_components;
              console.log(address_components);

              address_components?.forEach(
                (component: google.maps.GeocoderAddressComponent) => {
                  if (component.types.includes("country")) {
                    country = component.long_name;
                  }

                  if (
                    component.types.includes("administrative_area_level_1") ||
                    component.types.includes("locality") ||
                    component.types.includes("administrative_area_level_2")
                  ) {
                    city = component.long_name;
                  }
                }
              );

              if (city && country) {
                return; // Stop the iteration
              }
            });

            const locationData: Location = {
              name: results[1].formatted_address,
              lat: Number(lat.toFixed(6)),
              lng: Number(lng.toFixed(6)),
              city: city,
              country: country,
            };
            console.log(locationData);

            // Assuming you have defined setLocations and setMapCenter somewhere
            setLocations([...locations, locationData]);
            setMapCenter({ lat: locationData.lat, lng: locationData.lng });
          } catch (error) {
            console.log("Error fetching geolocation data:", error);
          }
        },
        (error) => {
          console.error("Error getting location:", error.message);
        }
      );
    } else {
      alert("Geolocation is not supported by your browser");
    }
  };

  const handleMapClick = async (e: google.maps.MapMouseEvent) => {
    const { latLng } = e;
    const lat = latLng?.lat();
    const lng = latLng?.lng();
    let country = "";
    let city = "";

    try {
      const response = await axios.get(
        `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${api_key}`
      );
      const { results } = response.data;
      let stopExecution = false;
      if (results.length > 0) {
        results.forEach((result: any) => {
          const address_components = result.address_components;
          console.log(address_components);

          address_components?.forEach(
            (component: google.maps.GeocoderAddressComponent) => {
              if (component.types.includes("country")) {
                country = component.long_name;
              }

              if (
                component.types.includes("administrative_area_level_1") ||
                component.types.includes("locality") ||
                component.types.includes("administrative_area_level_2")
              ) {
                city = component.long_name;
              }
            }
          );

          if (city && country) {
            stopExecution = true;
            return; // Stop the iteration
          }
        });

        const locationData: Location = {
          name: results[1].formatted_address,
          lat: Number(lat?.toFixed(6)),
          lng: Number(lng?.toFixed(6)),
          city: city,
          country: country,
        };
        console.log(locationData);

        setLocations([...locations, locationData]);
        setMapCenter({ lat: locationData.lat, lng: locationData.lng });
      }
    } catch (error) {
      console.log(error);
    }
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
    const storyRequest: Story = {
      text,
      header,
      labels,
      locations,
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
        storyRequest.locations,
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
          setPosted(true);
          console.log(storyRequest);
          const response = await axios.post(
            `${import.meta.env.VITE_BACKEND_URL}/stories`,
            storyRequest,
            {
              withCredentials: true,
            }
          );
          setLocations([]);
          setText("");
          setHeader("");
          setStartDate(null);
          setEndDate(null);
          setLabels([]);
          setEditorContent("");
          setSelectedSeason("");
          setSelectedSeasonEnd("");
          setDecade("");
          alert("Story posted successfully!");
          window.location.reload();
          console.log(response);
        } catch (error) {
          console.error("Error:", error);
        }
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
      alert("User is not logged in!");
    }
  }, []);
  return (
    <div style={{ backgroundColor: "#1f6c5c", touchAction: "pan-y" }}>
      <div style={{ marginLeft: 5, marginRight: 5, touchAction: "pan-y" }}>
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
                  marginTop: 10,
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
          <div
            style={{
              backgroundColor: "#fff",
              borderRadius: "8px",
              padding: 10,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              border: "1px solid #ccc",
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
                      marginBottom: "10px",
                      width: "100%",
                      justifyContent: "center",
                      alignItems: "center",
                      touchAction: "pan-y",
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
                        margin: "auto",
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
                        margin: "auto",
                        marginBottom: "10px",
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
                      margin: "auto",
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
                      margin: "auto",
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
                        margin: "auto",
                        marginBottom: "10px",
                        width: "100%",
                        minWidth: "100px",
                        maxWidth: "200px",
                        touchAction: "pan-y",
                      }}
                    />
                    <DatePicker
                      style={{
                        margin: "auto",
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
                      margin: "auto",
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
                      margin: "auto",
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
            style={{
              backgroundColor: "#fff",
              borderRadius: "5px",
              padding: 5,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              border: "1px solid #ccc",
              marginBottom: 10,
              boxShadow: "0px 0px 10px 2px rgba(0, 0, 0, 0.1)",
              touchAction: "pan-y",
            }}
          >
            <div>
              <div className="form-group">
                <label>Locations:</label>
                <div style={{ display: "flex", alignItems: "center" }}>
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
                  </Autocomplete>
                  <MyLocationIcon
                    onClick={handleGetUserLocation}
                    style={{ marginLeft: "5px", cursor: "pointer" }}
                  />
                </div>
                <div
                  style={{
                    maxHeight: 250,
                    overflow: "scroll",
                    borderTop: "1px solid #ccc",
                    borderBottom: "1px solid #ccc",
                    marginBottom: 2,
                    touchAction: "pan-y",
                  }}
                >
                  {locations.map((loc, index) => (
                    <div
                      key={index}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        border: "1px solid black",
                        borderRadius: "5px",
                        marginBottom: "8px",
                        marginTop: "8px",
                        padding: "8px",
                        touchAction: "pan-y",
                      }}
                    >
                      <p
                        style={{
                          flex: 1,
                          margin: 4,
                          fontSize: 11,
                        }}
                      >
                        {(loc.name || `${loc.lat}, ${loc.lng}`).slice(0, 55) +
                          "..."}
                      </p>
                      <CancelIcon
                        type="button"
                        fontSize="medium"
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
              zoom={20}
              onClick={handleMapClick}
            >
              {locations.map((loc, index) => (
                <Marker key={index} position={{ lat: loc.lat, lng: loc.lng }} />
              ))}
            </GoogleMap>
          </div>
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
            Create Story!
          </button>
        </div>
      </div>
    </div>
  );
};

export default StoryCreateMobile;
