import {
  Radio,
  RadioChangeEvent,
  Form,
  Slider,
  DatePicker,
  Select,
  TimePicker,
} from "antd";

import axios from "axios";
import { useEffect, useRef, useState } from "react";
import {  Row,  } from "react-bootstrap";
import NavBar from "../Components/NavBar";
import { Link, useNavigate } from "react-router-dom";
import { Autocomplete, GoogleMap, Marker } from "@react-google-maps/api";
import { StoryInt } from "../../Interfaces/StoryInt";
import Story from "../Components/StoryCard";
import CancelIcon from "@mui/icons-material/Cancel";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import PersonSearchIcon from "@mui/icons-material/PersonSearch";
import HistoryEduIcon from "@mui/icons-material/HistoryEdu";
import PeopleIcon from "@mui/icons-material/People";
import dayjs from "dayjs";
import { Avatar, Card } from "@mui/material";
interface storySearchData {
  name?: string;
  text?: string;
  header?: string;
  startDate?: string;
  endDate?: string;
  city?: string;
  label?: string;
  country?: string;
  longitude?: number;
  latitude?: number;
  radius?: number;
  startSeason?: string;
  endSeason?: string;
}

const containerStyle = {
  width: "100%",
  height: "400px",
};

interface UserSearchResult {
  name: string;
  id: number;
  photo: string;
  stories?: StoryInt[];
  followers?: UserSearchResult[];
}
interface Location {
  name: string;
  lat: number;
  lng: number;
  city?: string;
  country?: string;
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

const exactDateFormat = "DD/MM/YYYY";
const yearFormat = "YYYY";
const monthFormat = "MM/YYYY";

const decadeOption: Option[] = [
  { label: "Date", value: "date" },
  { label: "Decade", value: "decade" },
];

const searchOptions: Option[] = [
  { label: "User", value: "user" },
  { label: "Story", value: "story" },
];

const searchDateOptions: Option[] = [
  { label: "Exact Date Search", value: "one_date" },
  { label: "Interval Search", value: "interval" },
];

const UserSearch: React.FC = () => {
  const [name, setName] = useState<string>("");
  const [users, setUsers] = useState<UserSearchResult[]>([]);
  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
  };
  const handleSubmit = async (event: any) => {
    const searchData: storySearchData = {
      name,
    };

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/users/findusers`,
        searchData,
        { withCredentials: true }
      );

      if (response.status === 200) {
        // Redirect or update the state based on successful login
        console.log(response.data);
        setUsers(response.data);
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div
      className="w-4/5 mx-auto mr-4 border-customGreen border-solid border-3"
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
      }}
    >
      <div>
        <label className="mr-2 font-semibold">Username :</label>
        <input
          className="px-2 w-1/2 py-1 mt-2 text-customGreenD bg-white border rounded-md focus:border-customGreenD focus:ring-customGreenD focus:outline-none focus:ring focus:ring-opacity-40"
          onChange={handleNameChange}
          type="text"
        />
        <PersonSearchIcon
          className="transition-transform mx-1 transform-gpu hover:scale-110 hover:text-green-500"
          fontSize="large"
          onClick={handleSubmit}
        />
      </div>
      {users.length > 0 && (
        <>
          <span className="bg-blue-100 text-blue-800 text-2xl font-semibold me-2 my-2 px-2.5 py-0.5 rounded dark:bg-blue-200 dark:text-blue-800 ms-2">
            Results
          </span>
          <ul style={{ listStyle: "none", marginRight: "10px" }}>
            {users.reverse().map((user: UserSearchResult) => (
              <Card
                sx={{
                  maxWidth: 350,
                  minWidth: 300,
                  width: "100%",
                  height: "100%",
                }}
                className="shadow-md h-fit transition duration-300 ease-in-out transform hover:scale-105 hover:shadow-2xl"
              >
                <div className="p-4">
                  <Link to={`/user/${user.id}`}>
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center">
                        <Avatar
                          sx={{ width: 75, height: 75 }}
                          alt={user.name}
                          src={user.photo}
                          className="mr-2"
                        />
                        <span className="text-gray-700 text-base font-semibold">
                          {user.name}
                        </span>
                      </div>
                      <p className="text-gray-700 text-sm mb-2">
                        <HistoryEduIcon fontSize="large" className="mx-1" />
                        {user.stories?.length}
                        <PeopleIcon fontSize="large" className="mx-1" />
                        {user.followers?.length}
                      </p>
                    </div>
                  </Link>
                </div>
              </Card>
            ))}
          </ul>
        </>
      )}
    </div>
  );
};

const onFinish = (values: any) => {
  console.log("Success:", values);
};

const onFinishFailed = (errorInfo: any) => {
  console.log("Failed:", errorInfo);
};
const api_key = import.meta.env.VITE_GOOGLE_API_KEY;

const StroySearch: React.FC = () => {
  const [mapCenter, setMapCenter] = useState<{ lat: number; lng: number }>({
    lat: 41.0856396,
    lng: 29.0424937,
  });
  const autocompleteRef = useRef<google.maps.places.Autocomplete | null>(null);
  const [stories, setStories] = useState<StoryInt[]>();
  const [locations, setLocations] = useState<Location>();
  const [header, setHeader] = useState<string>();
  const [name, setName] = useState<string>();
  const [city, setCity] = useState<string>();
  const [label, setLabel] = useState<string>();
  const [country, setCountry] = useState<string>();
  const [startDate, setStartDate] = useState<dayjs.Dayjs | null>(null);
  const [endtDate, setEndDate] = useState<dayjs.Dayjs | null>(null);
  const [text, setText] = useState<string>();
  const [radius, setRadius] = useState<number>(1);
  const [selectedOption, setSelectedOption] = useState<string>("exact-year");
  const [selectedDateOption, setSelectedDateOption] =
    useState<string>("one_date");
  const [selectedSeason, setSelectedSeason] = useState<string>();
  const [selectedSeasonEnd, setSelectedSeasonEnd] = useState<string>();
  const [selectedOptionEnd, setSelectedOptionEnd] =
    useState<string>("exact-year");
  const [selectedDateInput, setSelectedDateInput] = useState<string>("date");

  const [form] = Form.useForm();

  const seasonOptions = [
    { value: "spring", label: "Spring" },
    { value: "summer", label: "Summer" },
    { value: "fall", label: "Fall" },
    { value: "winter", label: "Winter" },
  ];
  const dateFormats: { [key: string]: string } = {
    "exact-year": "DD/MM/YYYY",
    month: "MM/YYYY",
    year: "YYYY",
  };
  const dateFormatsForDisable: { [key: string]: dayjs.ManipulateType } = {
    "exact-year": "day",
    month: "month",
    year: "year",
  };
  const [selectedDecadeValue, setSelectedDecadeValue] = useState<number>();
  const onRadioChangeInput = (e: RadioChangeEvent) => {
    setSelectedDateInput(e.target.value);
  };
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

  const combinedEndDateTimeString = `${
    endtDate && selectedOptionEnd === "exact-year"
      ? dayjs(`${endtDate.format("YYYY-MM-DD")}`).format("DD/MM/YYYY HH:mm:ss")
      : endtDate?.format(dateFormats[selectedOptionEnd])
  }`;

  const onFinish = async () => {
    const searchData: storySearchData = {
      ...(name && { name: name }),
      ...(text && { text: text }),
      ...(header && { header: header }),
      ...(locations?.lat && { latitude: locations?.lat }),
      ...(locations?.lng && { longitude: locations?.lng }),
      ...(locations?.lng && { radius: radius }),
      ...(city && { city: city }),
      ...(country && { country: country }),
      ...(label && { label: label }),
      ...(startDate && {
        startDate: startDate?.format(dateFormats[selectedOption]),
      }),
      ...(endtDate && {
        endDate: endtDate?.format(dateFormats[selectedOptionEnd]),
      }),
      ...(selectedSeason && { startSeason: selectedSeason }),
      ...(selectedSeasonEnd && { endSeason: selectedSeasonEnd }),
    };
    const allFieldsEmpty = Object.values(searchData).every(
      (value) => value === undefined || value === ""
    );
    const search_url =
      selectedOption === "one_day"
        ? `${import.meta.env.VITE_BACKEND_URL}/stories/search`
        : `${import.meta.env.VITE_BACKEND_URL}/stories/intervalsearch`;

    if (allFieldsEmpty) {
      alert("No search criteria provided");
      return;
    } else {
      try {
        console.log(searchData);
        const response = await axios.post(search_url, searchData, {
          withCredentials: true,
        });

        if (response.status === 200) {
          // Redirect or update the state based on successful login
          console.log(response.data);

          setStories(response.data);
        }
      } catch (error) {
        console.log(error);
      }
    }
  };
  const navigate = useNavigate();

  useEffect(() => {
    const cookieValue = document.cookie
      .split("; ")
      .find((row) => row.startsWith("jwt_Token"))
      ?.split("=")[1];

    if (!cookieValue) {
      navigate("/login");
    }
  }, []);

  const handleSubmit = async (event: any) => {
    form.submit();
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

      setLocations(locationData);

      console.log(locationData);
      setMapCenter({ lat: locationData.lat, lng: locationData.lng });
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

        setLocations(locationData);
        setMapCenter({ lat: locationData.lat, lng: locationData.lng });
      }
    } catch (error) {
      console.log(error);
    }
  };
  const onChange = (newValue: number) => {
    setRadius(newValue);
  };

  const onRadioChange = (e: RadioChangeEvent) => {
    setSelectedOption(e.target.value);
  };

  const onDateRadioChange = (e: RadioChangeEvent) => {
    setSelectedDateOption(e.target.value);
  };
  const onRadioChangeEnd = (e: RadioChangeEvent) => {
    setSelectedOptionEnd(e.target.value);
  };

  const disabledDate = (currentDate: dayjs.Dayjs): boolean => {
    const today = dayjs();
    const isAfterToday = currentDate.isAfter(today);
    const isBeforeStartDate = currentDate.isBefore(
      dayjs(
        startDate?.add(2, dateFormatsForDisable[selectedOption]),
        dateFormats[selectedOption]
      )
    );

    return isAfterToday || isBeforeStartDate;
  };
  const validateInput = (rule: any, value: string) => {
    if (!/^[a-zA-Z]+$/.test(value)) {
      return Promise.reject("Only letters are allowed.");
    } else if (value !== undefined && value.length < 4) {
      return Promise.reject("Value must have at least 4 characters.");
    } else {
      return Promise.resolve("OK");
    }
  };

  return (
    <>
      <div className="bg-green-50">
        <div
          className="w-4/5 mx-auto mr-4 border-customGreen border-solid border-3"
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
          }}
        >
          <div className="flex flex-row items-center my-3 mx-10 w-full ">
            <div className="w-2/4">
              <label className="mr-2 font-semibold">Title:</label>
              <input
                className="px-2 w-1/2 py-1 mt-2 text-customGreenD bg-white border rounded-md focus:border-customGreenD focus:ring-customGreenD focus:outline-none focus:ring focus:ring-opacity-40"
                onChange={(e) => setHeader(e.target.value)}
                value={header}
                type="text"
              />
            </div>
            <div className="w-2/4">
              <label className="mr-2 font-semibold">Author's Name:</label>
              <input
                className="px-2 w-1/2 py-1 mt-2 text-customGreenD bg-white border rounded-md focus:border-customGreenD focus:ring-customGreenD focus:outline-none focus:ring focus:ring-opacity-40"
                onChange={(e) => setName(e.target.value)}
                value={name}
                type="text"
              />
            </div>
          </div>
          <div className="flex flex-row items-center my-3 mx-10 w-full ">
            <div className="w-2/4">
              <label className="mr-2 font-semibold">City:</label>
              <input
                className="px-2 w-1/2 py-1 mt-2 text-customGreenD bg-white border rounded-md focus:border-customGreenD focus:ring-customGreenD focus:outline-none focus:ring focus:ring-opacity-40"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                type="text"
              />
            </div>
            <div className="w-2/4">
              <label className="mr-2 font-semibold">Country: </label>
              <input
                className="px-2 w-1/2 py-1 mt-2 text-customGreenD bg-white border rounded-md focus:border-customGreenD focus:ring-customGreenD focus:outline-none focus:ring focus:ring-opacity-40"
                value={country}
                onChange={(e) => setCountry(e.target.value)}
                type="text"
              />
            </div>
          </div>
          <div className="flex flex-row items-center my-3 mx-10 w-full ">
            <div className="w-2/4">
              <label className="mr-2 font-semibold">Label:</label>
              <input
                className="px-2 w-1/2 py-1 mt-2 text-customGreenD bg-white border rounded-md focus:border-customGreenD focus:ring-customGreenD focus:outline-none focus:ring focus:ring-opacity-40"
                value={label}
                onChange={(e) => setLabel(e.target.value)}
                type="text"
              />
            </div>
            <div className="w-2/4">
              <label className="mr-2 font-semibold">Text: </label>
              <input
                className="px-2 w-1/2 py-1 mt-2 text-customGreenD bg-white border rounded-md focus:border-customGreenD focus:ring-customGreenD focus:outline-none focus:ring focus:ring-opacity-40"
                value={text}
                onChange={(e) => setText(e.target.value)}
                // rules={[{ validator: validateInput }]}
                type="text"
              />
            </div>
          </div>
        </div>
        <div
          className="w-1/2 mx-auto mr-4 border-customGreen border-solid border-3"
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
              }}
            />
          </Row>
          {selectedDateInput !== "date" && (
            <Select
              value={selectedDecadeValue}
              onChange={(value: number) => {
                const decStartString = (value - 2).toString();
                const decEndString = (value + 8).toString();
                setStartDate(dayjs(decStartString.toString(), yearFormat));
                setEndDate(dayjs(decEndString.toString(), yearFormat));
                console.log(endtDate);
              }}
              options={decadeSelectOptions}
              placeholder="Select a decade."
              style={{
                marginBottom: "5px",
                marginTop: "5px",
                width: "100%",
                minWidth: "100px",
                maxWidth: "200px",
                touchAction: "pan-y",
              }}
            />
          )}

          {selectedDateInput === "date" && (
            <div>
              <div
                style={{
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Radio.Group
                  options={searchDateOptions}
                  onChange={onDateRadioChange}
                  value={selectedDateOption}
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
              <div className="my-2">
                {selectedDateOption === "interval" ? (
                  <label>Select Start Season : </label>
                ) : (
                  <label>Select Season : </label>
                )}

                <Select
                  allowClear
                  value={selectedSeason}
                  onChange={(value) => setSelectedSeason(value)}
                  options={seasonOptions}
                  placeholder="Select a season."
                  style={{
                    marginBottom: "10px",
                    width: "100%",
                    minWidth: "100px",
                    maxWidth: "200px",
                  }}
                />
              </div>
              {selectedDateOption === "interval" && (
                <div className="my-2">
                  <label>Select End Season : </label>
                  <Select
                    allowClear
                    value={selectedSeasonEnd}
                    onChange={(value) => setSelectedSeasonEnd(value)}
                    options={seasonOptions}
                    placeholder="Select End season."
                    style={{
                      marginBottom: "10px",
                      width: "100%",
                      minWidth: "100px",
                      maxWidth: "200px",
                    }}
                  />
                </div>
              )}
              <div>
                <Radio.Group
                  options={options}
                  onChange={onRadioChange}
                  value={selectedOption}
                  optionType="button"
                  buttonStyle="solid"
                  style={{
                    marginBottom: "10px",
                    width: "100%",
                    minWidth: "100px",
                  }}
                />
                {selectedOption === "exact-year" && (
                  <>
                    <DatePicker
                      placeholder="Select start date!"
                      status="error"
                      picker="date"
                      format={exactDateFormat}
                      onChange={(date) => {
                        if (selectedDateOption !== "interval") {
                          const start = dayjs(date, exactDateFormat);
                          const endDate = dayjs(date, exactDateFormat);
                          setStartDate(start.subtract(1, "day"));
                          setSelectedOptionEnd("exact-year");
                          setEndDate(endDate.add(1, "day"));
                        }
                        const start = dayjs(date, exactDateFormat);
                        setStartDate(start.subtract(1, "day"));
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
                    status="error"
                    format={monthFormat}
                    picker="month"
                    placeholder="Select start date!"
                    onChange={(date) => {
                      if (selectedDateOption === "one_date") {
                        const start = dayjs(date, monthFormat);
                        const endDate = dayjs(date, monthFormat);
                        setStartDate(start.subtract(1, "month"));
                        setSelectedOptionEnd("month");
                        setEndDate(endDate.add(1, "month"));
                        console.log("burada");
                      }
                      const start = dayjs(date, monthFormat);
                      setStartDate(start.subtract(1, "month"));
                    }}
                    style={{
                      marginBottom: "20px",
                      width: "100%",
                      minWidth: "100px",
                      touchAction: "pan-y",
                      maxWidth: "200px",
                    }}
                  />
                )}
                {selectedOption === "year" && (
                  <DatePicker
                    placeholder="Select start date!"
                    status="error"
                    format={yearFormat}
                    picker="year"
                    onChange={(date) => {
                      if (selectedDateOption !== "interval") {
                        const start = dayjs(date, yearFormat);
                        const endDate = dayjs(date, yearFormat);
                        setStartDate(start.subtract(1, "year"));
                        setSelectedOptionEnd("year");
                        setEndDate(endDate.add(1, "year"));
                      }
                      const start = dayjs(date, yearFormat);
                      setStartDate(start.subtract(1, "year"));
                    }}
                    style={{
                      marginBottom: "20px",
                      width: "100%",
                      minWidth: "100px",
                      touchAction: "pan-y",
                      maxWidth: "200px",
                    }}
                  />
                )}
              </div>

              {selectedDateOption === "interval" && (
                <>
                  <div>
                    <div
                      style={{
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <Radio.Group
                        options={options}
                        onChange={onRadioChangeEnd}
                        value={selectedOptionEnd}
                        optionType="button"
                        buttonStyle="solid"
                        style={{
                          marginBottom: "10px",
                          width: "100%",
                          minWidth: "100px",
                        }}
                      />
                    </div>
                    {selectedOptionEnd === "exact-year" && (
                      <>
                        <DatePicker
                          placeholder="Select end date!"
                          picker="date"
                          disabledDate={disabledDate}
                          format={exactDateFormat}
                          onChange={(date) => {
                            const start = dayjs(date, exactDateFormat);
                            setEndDate(start.add(1, "day"));
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
                    {selectedOptionEnd === "month" && (
                      <DatePicker
                        placeholder="Select end date!"
                        format={monthFormat}
                        disabledDate={disabledDate}
                        picker="month"
                        onChange={(date) => {
                          const start = dayjs(date, monthFormat);
                          setEndDate(start.add(1, "month"));
                        }}
                        style={{
                          marginBottom: "20px",
                          width: "100%",
                          minWidth: "100px",
                          touchAction: "pan-y",
                          maxWidth: "200px",
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
                          setEndDate(start.add(1, "year"));
                        }}
                        style={{
                          marginBottom: "20px",
                          width: "100%",
                          minWidth: "100px",
                          touchAction: "pan-y",
                          maxWidth: "200px",
                        }}
                      />
                    )}
                  </div>
                </>
              )}
            </div>
          )}
        </div>

        <div
          className="w-4/5 mx-auto mr-4 border-customGreen items-center p-4 border-solid border-3"
          style={{
            backgroundColor: "#fff",
            borderRadius: "8px",
            alignItems: "center",
            justifyContent: "center",
            marginBottom: 10,
            boxShadow: "0px 0px 10px 2px rgba(0, 0, 0, 0.1)",
          }}
        >
          <Row>
            <div className="form-group">
              <label className="font-semibold">Locations:</label>
              <Autocomplete
                onLoad={(autocomplete) => {
                  autocompleteRef.current = autocomplete;
                }}
                onPlaceChanged={handleLocationSelect}
              >
                <input type="text" className="form-control" />
              </Autocomplete>

              <div
                className="align-items-center"
                style={{
                  maxHeight: 250,
                  overflowY: "scroll",
                  borderTop: "1px solid #ccc",
                  borderBottom: "1px solid #ccc",
                  marginBottom: 2,
                }}
              >
                {locations && (
                  <div className="flex align-items-center">
                    <div className="align-items-center flex w-52 m-1 p-1 bg-customGreen text-white rounded-full">
                      <p className="flex-1">
                        <LocationOnIcon />{" "}
                        {locations.name
                          ? locations.name.length > 20
                            ? locations.name.slice(0, 20) + "..."
                            : locations.name
                          : `${locations.lat}, ${locations.lng}`}
                      </p>
                    </div>
                    <CancelIcon
                      type="button"
                      fontSize="medium"
                      className="text-red-800"
                      style={{
                        cursor: "pointer",
                      }}
                      onClick={() => setLocations(undefined)}
                    />
                  </div>
                )}
              </div>
            </div>
          </Row>

          <div className="w-full my-2">
            <GoogleMap
              mapContainerStyle={containerStyle}
              center={mapCenter}
              zoom={11}
              onClick={handleMapClick}
            >
              {locations && (
                <Marker position={{ lat: locations.lat, lng: locations.lng }} />
              )}
            </GoogleMap>
          </div>
          <div>
            <label className="font-semibold">Radius (km)</label>
            <Slider
              onChange={onChange}
              min={1}
              defaultValue={1}
              max={100}
              marks={{ 1: "1 km", 100: "100 km" }}
              tooltip={{ open: true }}
            />
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
            onClick={onFinish}
            className="text-white bg-gradient-to-r from-cyan-500 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-10 mt-2"
          >
            Search !
          </button>
        </div>

        {stories != null && (
          <div className="max-w-screen-md mx-auto ">
            <h2>
              <span className="bg-blue-100 text-blue-800 text-2xl font-semibold me-2 px-2.5 py-0.5 rounded dark:bg-blue-200 dark:text-blue-800 ms-2">
                Results
              </span>
            </h2>
            <ul style={{ listStyle: "none", marginRight: "10px" }}>
              {stories
                ?.slice()
                .reverse()
                .map((story: StoryInt) => (
                  <li key={story.id}>
                    <Story story={story} />
                  </li>
                ))}
            </ul>
          </div>
        )}
      </div>
    </>
  );
};

const Search: React.FC = () => {
  const [selectedOption, setSelectedOption] = useState<string>("story");
  const onRadioChange = (e: RadioChangeEvent) => {
    setSelectedOption(e.target.value);
  };
  return (
    <div className="bg-green-50 h-screen">
      <NavBar />
      <h1 className="text-5xl font-extrabold dark:text-black text-center my-2">
        Search
      </h1>
      <div className="flex justify-center my-2">
        <Radio.Group
          options={searchOptions}
          onChange={onRadioChange}
          value={selectedOption}
          optionType="button"
          buttonStyle="solid"
        />
      </div>
      {selectedOption === "user" ? <UserSearch /> : <StroySearch />}
    </div>
  );
};

export default Search;
