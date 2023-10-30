import { Autocomplete, Circle, GoogleMap, Marker } from "@react-google-maps/api";
import NavBar from "../Components/NavBar";
import { Avatar, Button, Col, Collapse, DatePicker, DatePickerProps, Form, Input, Layout, List, Row, Select, Space, Spin, Switch, TimeRangePickerProps, Tooltip, Tree, Typography } from "antd";
import axios from "axios";
import { Fragment, useEffect, useRef, useState, } from "react";
import { Content } from "antd/es/layout/layout";
import { CommentOutlined, DeleteTwoTone, DislikeOutlined, InfoCircleOutlined, LikeOutlined, MinusOutlined, RadiusSettingOutlined, UserOutlined } from "@ant-design/icons";
import "../CSS/timeline.css";
import { DataNode, TreeProps } from "antd/es/tree";
import React from "react";
import ReactQuill from "react-quill";
import dayjs from "dayjs";
import advancedFormat from 'dayjs/plugin/advancedFormat';

dayjs.extend(advancedFormat);

const { Text } = Typography;
const { Panel } = Collapse;
const { RangePicker } = DatePicker;

const Timeline: React.FC = () => {

    const [form] = Form.useForm();
    const [sortForm] = Form.useForm();
    const [locations, setLocations] = useState<any>();
    const [mapCenter, setMapCenter] = useState<{ lat: number; lng: number }>({ lat: 41.0856396, lng: 29.0424937 });
    const [searchResult, setSearchResult] = useState<any[]>([]);
    const [screenSpin, setScreenSpin] = useState<boolean>(false);
    const [circleOnce, setCircleOnce] = useState<boolean>(false);
    const [nativeCircle, setNativeCircle] = useState<google.maps.Circle | null>(null);
    const radius = Form.useWatch("radius", form);
    const radiusVisual = Form.useWatch("radiusVisual", form);
    const key = Form.useWatch("key", form);
    const dateClass = Form.useWatch("dateClass", form);
    const date = Form.useWatch("date", form);
    const autocompleteRef = useRef<google.maps.places.Autocomplete | null>(null);
    const circleRef = useRef<Circle | null>(null);

    const containerStyle = {
        width: "100%",
        height: "400px"
    };

    useEffect(() => {
        if (locations && nativeCircle) {
            if (!nativeCircle.getRadius() && circleOnce) {
                setCircleOnce(false);
                nativeCircle.setRadius(Number(radius) * 1000)
            }
            else if (!circleOnce)
                setCircleOnce(true);
        }
    }, [locations, nativeCircle])

    const selectOptions = [
        {
            value: "ascending", label: <Space><Text style={{ fontFamily: "sans-serif" }}>{"Ascending"}</Text></Space>
        },
        {
            value: "descending", label: <Space><Text style={{ fontFamily: "sans-serif" }}>{"Descending"}</Text></Space>
        }
    ]

    const IconText = ({ icon, text }: { icon: React.FC; text: string }) => (
        <Space>
            {React.createElement(icon)}
            {text}
        </Space>
    );

    const onRadiusChange = (value: any) => {
        value = value.target.value;
        const regex = /^\d+\.?\d*$/;
        if (value) {
            if (regex.test(value)) {
                form.setFieldsValue({
                    radius: value,
                    radiusVisual: value
                })
            }
            else {
                form.setFieldsValue({
                    radiusVisual: radius
                })
            }
        }
        else {
            form.setFieldsValue({
                radius: 0
            })
        }
    };

    const onRadiusBlur = () => {
        if (radiusVisual.endsWith(".")) {
            form.setFieldsValue({
                radius: radiusVisual + "0",
                radiusVisual: radiusVisual + "0"
            });
        }
        if (nativeCircle)
            nativeCircle.setRadius(Number(radius) * 1000);
        onSearch();
    };

    // const disabledDate = (current: any) => {
    //     return current && current.isAfter(dayjs());
    // };

    const treeData: DataNode[] = [
        {
            title: "Precise",
            key: "0",
            selectable: false,
            children: [
                {
                    title: "Day",
                    key: "0-0"
                },
                {
                    title: "Week",
                    key: "0-1"
                },
                {
                    title: "Month",
                    key: "0-2"
                },
                {
                    title: "Quarter",
                    key: "0-3"
                },
                {
                    title: "Year",
                    key: "0-4"
                }
            ]
        },
        {
            title: "Interval",
            key: "1",
            selectable: false,
            children: [
                {
                    title: "Day",
                    key: "1-0"
                },
                {
                    title: "Week",
                    key: "1-1"
                },
                {
                    title: "Month",
                    key: "1-2"
                },
                {
                    title: "Quarter",
                    key: "1-3"
                },
                {
                    title: "Decade",
                    key: "1-4"
                }
            ]
        },
    ];
    const onSelectChange = (value: any) => {
        let sortedResults = [...searchResult];
        if (value === "descending") {
            sortedResults.sort((a, b) =>
                dayjs(b.startDate, "DD/MM/YYYY").unix() - dayjs(a.startDate, "DD/MM/YYYY").unix()
            );
        }
        else if (value === "ascending") {
            sortedResults.sort((a, b) =>
                dayjs(a.startDate, "DD/MM/YYYY").unix() - dayjs(b.startDate, "DD/MM/YYYY").unix()
            );
        }
        setSearchResult(sortedResults);
    };

    const onTreeSelect: TreeProps["onSelect"] = (key) => {
        form.setFieldsValue({
            dateClass: key.find(() => true),
            date: undefined
        });
        onSearch();
    };

    const onCircleRadiusChange = () => {
        if (nativeCircle) {
            const currentRadius = nativeCircle.getRadius() / 1000;
            form.setFieldsValue({
                radius: currentRadius,
                radiusVisual: currentRadius
            });
            onSearch(null, currentRadius);
        }
    };

    const periodIntervalPresets: TimeRangePickerProps["presets"] = [
        { label: "1950s", value: [dayjs("1950-01-01"), dayjs("1959-12-31")] },
        { label: "1960s", value: [dayjs("1960-01-01"), dayjs("1969-12-31")] },
        { label: "1970s", value: [dayjs("1970-01-01"), dayjs("1979-12-31")] },
        { label: "1980s", value: [dayjs("1980-01-01"), dayjs("1989-12-31")] },
        { label: "1990s", value: [dayjs("1990-01-01"), dayjs("1999-12-31")] },
        { label: "2000s", value: [dayjs("2000-01-01"), dayjs("2009-12-31")] },
        { label: "2010s", value: [dayjs("2010-01-01"), dayjs("2019-12-31")] },
        { label: "2020s", value: [dayjs("2020-01-01"), dayjs("2029-12-31")] }
    ];

    const customFormat: DatePickerProps["format"] = (value) =>
        `${value.format("YYYY")}s`;

    const renderDateElement = () => {
        switch (dateClass) {
            case null:
            case undefined:
                return (
                    <Text
                        style={{ fontFamily: "sans-serif", color: "cornflowerblue" }}>
                        {"You can choose a date class to filter further."}
                    </Text>
                )
            case "0-0":
                return (
                    <DatePicker onChange={onSearch} />
                )
            case "0-1":
                return (
                    <DatePicker picker="week" onChange={() => onSearch()} />
                )
            case "0-2":
                return (
                    <DatePicker picker="month" onChange={() => onSearch()} />
                )
            case "0-3":
                return (
                    <DatePicker picker="quarter" onChange={() => onSearch()} />
                )
            case "0-4":
                return (
                    <DatePicker picker="year" onChange={() => onSearch()} />
                )
            case "1-0":
                return (
                    <RangePicker onChange={() => onSearch()} />
                )
            case "1-1":
                return (
                    <RangePicker picker="week" onChange={() => onSearch()} />
                )
            case "1-2":
                return (
                    <RangePicker picker="month" onChange={() => onSearch()} />
                )
            case "1-3":
                return (
                    <RangePicker picker="quarter" onChange={() => onSearch()} />
                )
            case "1-4":
                return (
                    <RangePicker picker="year" onChange={() => onSearch()} presets={periodIntervalPresets} />
                )
        }
    };

    const onSearch = async (directed?: any, radius?: any) => {
        setScreenSpin(true)
        try {
            if (!directed)
                directed = locations;
            let startDate;
            let endDate;
            switch (dateClass) {
                case "0-0":
                case "1-0":
                    startDate = Array.isArray(date) ? date[0] : date;
                    endDate = Array.isArray(date) ? date[1] : date[0];
                    break;
                case "0-1":
                case "1-1":
                    startDate = Array.isArray(date) ? date[0].startOf("week") : date.startOf("week");
                    endDate = Array.isArray(date) ? date[1].endOf("week") : date[0].endOf("week");
                    break;
                case "0-2":
                case "1-2":
                    startDate = Array.isArray(date) ? date[0].startOf("month") : date.startOf("month");
                    endDate = Array.isArray(date) ? date[1].endOf("month") : date[0].endOf("month");
                    break;
                case "0-3":
                case "1-3":
                    startDate = Array.isArray(date) ? date[0].startOf("quarter") : date.startOf("quarter");
                    endDate = Array.isArray(date) ? date[1].endOf("quarter") : date[0].endOf("quarter");
                    break;
                case "0-4":
                case "1-4":
                    startDate = Array.isArray(date) ? date[0].startOf("year") : date.startOf("year");
                    endDate = Array.isArray(date) ? date[1].endOf("year") : date[0].endOf("year");
                    break;
                // case "0-5":
                // case "1-5":
            }
            let request = {
                startDate: startDate,
                endDate: endDate,
                key: key === "" ? null : key,
                longitude: directed.lng,
                latitude: directed.lat,
                radius: radius
            }
            const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/stories/advancedsearch`, request, {
                withCredentials: true,
            });
            if (response.status === 200) {
                const data = response.data;
                const searchResult = data.map((item: any) => {
                    const quill = item.richText;
                    const regex = /<img[^>]+src="([^">]+)"/g;
                    let match;
                    const imageDataList = [];
                    while ((match = regex.exec(quill))) {
                        const imageData = match[1];
                        imageDataList.push(imageData);
                    }                
                    const parser = new DOMParser();
                    const document = parser.parseFromString(item.richText, "text/html");
                    const image = document.querySelectorAll("img");
                    image.forEach(image => image.remove());
                    return {
                        ...item,
                        text: document.body.textContent,
                        imageData: imageDataList
                    };
                });
                setSearchResult(searchResult);
            }
            setScreenSpin(false);
        } catch (error) {
            setScreenSpin(false);
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
                `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${import.meta.env.VITE_GOOGLE_API_KEY}`
            );
            const { results } = response.data;
            let stopExecution = false;
            if (results.length > 0) {
                results.forEach((result: any) => {
                    const address_components = result.address_components;
                    address_components?.forEach(
                        (component: google.maps.GeocoderAddressComponent) => {
                            if (component.types.includes("country"))
                                country = component.long_name;
                            if (component.types.includes("administrative_area_level_1") || component.types.includes("locality") || component.types.includes("administrative_area_level_2"))
                                city = component.long_name;
                        }
                    );
                    if (city && country) {
                        stopExecution = true;
                        return;
                    }
                });
                const locationData = {
                    name: results[1].formatted_address,
                    lat: Number(lat?.toFixed(6)),
                    lng: Number(lng?.toFixed(6)),
                    city: city,
                    country: country,
                };
                setLocations(locationData);
                setMapCenter({ lat: locationData.lat, lng: locationData.lng });
                onSearch(locationData);
            }
        } catch (error) { }
    };

    const handleLocationSelect = () => {
        const place = autocompleteRef.current?.getPlace();
        if (place?.geometry?.location) {
            const addressComponents = place?.address_components;
            let country = "";
            let city = "";
            addressComponents?.forEach((component) => {
                if (component.types.includes("country"))
                    country = component.long_name;
                if (component.types.includes("administrative_area_level_1") || component.types.includes("locality"))
                    city = component.long_name;
            });
            const locationData = {
                name: place.name || "",
                lat: Number(place.geometry?.location?.lat().toFixed(6)),
                lng: Number(place.geometry?.location?.lng().toFixed(6)),
                city: city,
                country: country,
            };
            setLocations(locationData);
            setMapCenter({ lat: locationData.lat, lng: locationData.lng });
            onSearch(locationData);
        }
    };

    return (
        <>
            <NavBar />
            <Layout
                style={{ backgroundColor: "white" }}>
                <Col
                    offset={1}
                    span={22}>
                    {/* <Header
                        style={{ backgroundColor: "white", marginTop: "12px", marginBottom: "12px", paddingLeft: "8px" }}>
                        <Text
                            style={{ fontFamily: "Handwriting", fontSize: "48px" }}>{"Timeline"}</Text>
                    </Header> */}
                    <Content>
                        <Collapse
                            accordion
                            ghost
                            defaultActiveKey={"1"}>
                            <Panel
                                className={"panel--icon"} key={"1"} header={<Text style={{ fontSize: "16px", fontFamily: "system-ui", fontWeight: "500" }}>{"Filter"}</Text>}>
                                <Form
                                    form={form}
                                    initialValues={{ radius: 0.1, radiusVisual: 0.1 }}
                                    requiredMark={false}
                                    layout="vertical">
                                    <Form.Item
                                        label={<Text style={{ fontSize: "16px", fontFamily: "system-ui", fontWeight: "500" }}>{"Find Location"}</Text>}>
                                        <Autocomplete
                                            onLoad={(autocomplete) => {
                                                autocompleteRef.current = autocomplete;
                                            }}
                                            onPlaceChanged={handleLocationSelect}>
                                            <Input placeholder="" />
                                        </Autocomplete>
                                    </Form.Item>
                                    <Form.Item
                                        name={"radiusVisual"}
                                        rules={[
                                            {
                                                pattern: /^\d+\.?\d*$/,
                                                message: "You need to input numbers.",
                                            },
                                            {
                                                required: true,
                                                message: "You need to input radius.",
                                            }
                                        ]}
                                        label={<Text style={{ fontSize: "16px", fontFamily: "system-ui", fontWeight: "500" }}>{"Radius"}</Text>}>
                                        <Input
                                            style={{ width: "130px" }}
                                            prefix={<RadiusSettingOutlined />}
                                            suffix={<Text style={{ fontSize: "12px", fontFamily: "system-ui", fontWeight: "500", paddingTop: "2px" }}>{"Kilometers"}</Text>}
                                            maxLength={3}
                                            onChange={onRadiusChange}
                                            onBlur={onRadiusBlur} />
                                    </Form.Item>
                                    <Form.Item noStyle name={"radius"} />
                                    <div
                                        hidden={!locations}>
                                        <Form.Item
                                            label={<Text style={{ fontSize: "12px", fontFamily: "system-ui", fontWeight: "500" }}>{"Location"}</Text>}>
                                            <Space
                                                direction="horizontal"
                                                align="center">
                                                <Text
                                                    style={{ fontFamily: "sans-serif" }}>
                                                    {locations?.name || `${locations?.lat}, ${locations?.lng}`}
                                                </Text>
                                                <DeleteTwoTone
                                                    style={{ marginBottom: "4px" }}
                                                    twoToneColor={"indianred"}
                                                    onClick={() => setLocations(null)}
                                                />
                                            </Space>
                                        </Form.Item>
                                    </div>
                                    <div
                                        hidden={locations}>
                                        <Form.Item>
                                            <Text
                                                style={{ fontFamily: "sans-serif", color: "indianred" }}>
                                                {"You need to choose a location."}
                                            </Text>
                                        </Form.Item>
                                    </div>
                                    <Form.Item>
                                        <GoogleMap
                                            mapContainerStyle={containerStyle}
                                            center={mapCenter}
                                            zoom={17}
                                            onClick={handleMapClick}>
                                            {locations && (
                                                <Fragment>
                                                    <Marker position={{ lat: locations.lat, lng: locations.lng }} />
                                                    <Circle
                                                        onLoad={(circle) => setNativeCircle(circle)}
                                                        ref={circleRef}
                                                        onRadiusChanged={onCircleRadiusChange}
                                                        center={{
                                                            lat: locations.lat,
                                                            lng: locations.lng
                                                        }}
                                                        options={{ strokeColor: "#FF0000", clickable: true, editable: true, visible: Object.keys(locations) ? true : false }}
                                                    />
                                                </Fragment>
                                            )}
                                        </GoogleMap>
                                    </Form.Item>
                                    <Row>
                                        <Col>
                                            <Form.Item
                                                name={"dateClass"}
                                                label={<Text style={{ fontSize: "16px", fontFamily: "system-ui", fontWeight: "500" }}>{"Date Class"}</Text>}>
                                                <Tree
                                                    onSelect={onTreeSelect}
                                                    treeData={treeData} />
                                            </Form.Item>
                                        </Col>
                                        <Col
                                            offset={1}>
                                            <Form.Item
                                                name={"date"}
                                                label={<Text style={{ fontSize: "16px", fontFamily: "system-ui", fontWeight: "500" }}>{"Date"}</Text>}>
                                                {renderDateElement()}
                                            </Form.Item>
                                        </Col>
                                        <Col
                                            offset={1}>
                                            <Space>
                                                <Form.Item
                                                    name={"key"}
                                                    label={<Text style={{ fontSize: "16px", fontFamily: "system-ui", fontWeight: "500" }}>{"Search"}</Text>}>
                                                    <Input
                                                        maxLength={50}
                                                        showCount
                                                        onBlur={() => onSearch()}
                                                        style={{ width: "250px" }}>
                                                    </Input>
                                                </Form.Item>
                                                <Tooltip
                                                    title={() => <Text
                                                        style={{ fontFamily: "sans-serif", color: "white" }}>
                                                        {"Use a keyword to narrow down stories based on their titles, content, tags or username."}
                                                    </Text>}>
                                                    <InfoCircleOutlined style={{ paddingTop: "12px" }} />
                                                </Tooltip>
                                            </Space>
                                        </Col>
                                    </Row>
                                </Form>
                            </Panel>
                        </Collapse>
                        <Spin
                            spinning={screenSpin}>
                            <Form
                                form={sortForm}
                                layout="vertical"
                                initialValues={{ sort: "ascending" }}>
                                <Form.Item
                                    label={<Text style={{ fontFamily: "system-ui", fontSize: "16px", fontWeight: "500" }}>{"Sort"}</Text>}
                                    style={{ paddingLeft: "16px" }}>
                                    <Form.Item
                                        noStyle
                                        name={"sort"}>
                                        <Select
                                            options={selectOptions}
                                            onChange={onSelectChange}
                                            style={{ width: "120px" }} />
                                    </Form.Item>
                                    <Space
                                        style={{ paddingLeft: "8px" }}>
                                        <Tooltip
                                            title={() => <Text
                                                style={{ fontFamily: "sans-serif", color: "white" }}>
                                                {"Currently, stories are sorted by their start date."}
                                            </Text>}>
                                            <InfoCircleOutlined />
                                        </Tooltip>
                                    </Space>
                                </Form.Item>
                            </Form>
                            <List
                                itemLayout="vertical"
                                size="large"
                                pagination={{ pageSize: 10, hideOnSinglePage: true }}
                                dataSource={searchResult}
                                renderItem={(item) => (
                                    <List.Item
                                        key={item.id}
                                        actions={[
                                            <IconText key="likes" icon={LikeOutlined} text={item.likes.length} />,
                                            <IconText key="dislike" icon={DislikeOutlined} text={"0"} />,
                                            <IconText key="comment" icon={CommentOutlined} text={item.comments.length} />
                                        ]}
                                        extra={
                                            <img style={{ maxWidth: "300px", maxHeight: "300px" }} src={item.imageData?.find(() => true)} alt={""} />
                                        }>
                                        <List.Item.Meta
                                            avatar={
                                                <Space direction="vertical" align="center">
                                                    {item.user.photo ? (
                                                        <Avatar size={150} src={<img src={item.user.photo} alt="avatar" />} />
                                                    ) : (
                                                        <Avatar size={150}></Avatar>
                                                    )}
                                                    <Text style={{ fontWeight: "bold" }} >{item.user.name}</Text>
                                                </Space>}
                                            title={
                                                <Row
                                                    justify={"space-between"}>
                                                    <Button
                                                        onClick={() => window.location.href = `/stories/${item.id}`}
                                                        type="link">{item.header}
                                                    </Button>
                                                    <Text>{"Created on: Unknown"}</Text>
                                                </Row>}
                                            description={
                                                <>
                                                    <Space direction="vertical"
                                                        style={{ paddingLeft: "16px" }}>
                                                        <Text style={{ fontWeight: "500" }}>
                                                            <Space direction="horizontal" size="small">
                                                                {item.startDate}{<MinusOutlined />}{item.endDate}
                                                            </Space>
                                                        </Text>
                                                        <Text style={{ fontWeight: "500" }}>
                                                            {item.locations.find(() => true).name}
                                                        </Text>
                                                    </Space>
                                                </>}
                                        />
                                        <>
                                            <ReactQuill
                                                className="borderless"
                                                value={item.text.substring(0, 250) + "..."}
                                                readOnly={true}
                                                theme="snow"
                                                modules={{ toolbar: false }}
                                                style={{ border: "none" }}
                                            />
                                        </>
                                    </List.Item>
                                )}
                            />
                        </Spin>
                    </Content>
                </Col>
            </Layout>
        </>
    );
};

export default Timeline;