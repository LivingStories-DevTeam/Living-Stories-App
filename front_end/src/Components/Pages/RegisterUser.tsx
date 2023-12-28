import Button from "antd/es/button";
import Form from "antd/es/form";
import Input from "antd/es/input";
import Image from "antd/es/image";
import axios from "axios";
import { useState } from "react";
import { Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import "../CSS/background.css";

interface RegisterFormData {
  email: string;
  password: string;
  repassword: string;
  name: string;
}

const RegisterUser: React.FC = () => {
  const [formData, setFormData] = useState<RegisterFormData>({
    email: "",
    password: "",
    repassword: "",
    name: "",
  });
  const [passwordError, setPasswordError] = useState("");

  const navigate = useNavigate();
  console.log(formData);
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    console.log(
      "password: " + formData.password + "Repassword : " + formData.repassword
    );
    if (formData.password !== formData.repassword) {
      setPasswordError("Password do not match !");
    } else {
      setPasswordError("");
      // Send form data to backend
      try {
        const response = await axios.post(
          `${import.meta.env.VITE_BACKEND_URL}/users`,
          formData
        );
        console.log(response.data);
        navigate("/login", { replace: true });
      } catch (error) {
        alert(
          "The user already exists, or something went wrong with the server. Try again!"
        );
        console.error(error);
      }
      console.log(formData);
    }
  };
  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, email: event.target.value });
  };
  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, name: event.target.value });
  };

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, password: event.target.value });
  };

  const handleRepasswordChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setFormData({ ...formData, repassword: event.target.value });
  };

  return (
    <div className="background_gif min-h-screen flex flex-col items-center justify-center ">
      <img
        src="./src/assets/images/logo_kare.png"
        style={{
          width: "70%",
        }}
      />
      <div className="w-full p-2 m-auto bg-white rounded-md shadow-xl lg:max-w-xl flex flex-col items-center">
        <h1 className="text-3xl font-semibold text-center uppercase text-customGreenD">
          Welcome to Living Stories!
        </h1>
        <Row style={{ justifyContent: "center", marginTop: "50px" }}>
          <Form
            name="registration-form"
            onFinish={handleSubmit}
            style={{ maxWidth: 600 }}
          >
            <div className="mb-2 w-full">
              <label className="block text-sm font-semibold text-center text-customGreenD">
                Email
              </label>
              <Input
                required
                name="email"
                type="text"
                placeholder="Email"
                className="w-full px-4 py-2 mt-2 text-customGreenD bg-white border rounded-md focus:border-customGreenD focus:ring-customGreenD focus:outline-none focus:ring focus:ring-opacity-40"
                onChange={handleEmailChange}
              />
            </div>

            <div className="mb-2 w-full">
              <label className="block text-sm font-semibold text-center text-customGreenD">
                Name
              </label>
              <Input
                required
                name="name"
                type="text"
                placeholder="Name"
                className="w-full px-4 py-2 mt-2 text-customGreenD bg-white border rounded-md focus:border-customGreenD focus:ring-customGreenD focus:outline-none focus:ring focus:ring-opacity-40"
                onChange={handleNameChange}
              />
            </div>

            <div className="mb-2 w-full">
              <label className="block text-sm font-semibold text-center text-customGreenD">
                Password
              </label>
              <Input.Password
                required
                name="password"
                type="password"
                placeholder="Password"
                className="w-full px-4 py-2 mt-2 text-customGreenD bg-white border rounded-md focus:border-customGreenD focus:ring-customGreenD focus:outline-none focus:ring focus:ring-opacity-40"
                onChange={handlePasswordChange}
              />
            </div>

            <label className="block text-sm font-semibold text-center text-customGreenD">
              Repeat Password
            </label>
            <Input.Password
              placeholder="Repeat password"
              className="w-full px-4 py-2 mt-2 text-customGreenD bg-white border rounded-md focus:border-customGreenD focus:ring-customGreenD focus:outline-none focus:ring focus:ring-opacity-40"
              onChange={handleRepasswordChange}
            />

            {passwordError && <p className="text-red-600">{passwordError}</p>}
            <div className="mt-6">
              <Button
                type="primary"
                htmlType="submit"
                className="w-full px-4 py-2 text-center tracking-wide bg-customGreenD text-white transition-colors duration-200 transform rounded-md hover:bg-customGreen focus:outline-none focus:bg-green-900 submit-btn"
                style={{ lineHeight: "normal" }}
              >
                Register
              </Button>
            </div>
          </Form>
        </Row>
        <Link to={"/login"} className="font-medium hover:underline">
          <p className="mt-2 text-xs font-light text-center text-gray-700">
            If you have an account, go to the Login !
          </p>
        </Link>
      </div>
    </div>
  );
};

export default RegisterUser;
