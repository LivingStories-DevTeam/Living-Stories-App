import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { Button, Form, Input } from "antd";
import "../CSS/background.css";

interface LoginFormData {
  email: string;
  password: string;
}

const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<LoginFormData>({
    email: "",
    password: "",
  });
  const [err, setErr] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const submitLogin = async () => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/login`,
        formData,
        { withCredentials: true }
      );

      if (response.status === 200) {
        console.log("Login successful");
        navigate("/home");
      }
    } catch (error) {
      setErr("Wrong email or password provided! Try again!");
      console.log(error);
    }
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
        <Form className="mt-6 w-2/3" onFinish={submitLogin}>
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
              onChange={handleChange}
            />
          </div>
          <div className="mb-2 w-full">
            <label className="block text-sm font-semibold text-center text-customGreen">
              Password
            </label>
            <Input
              required
              name="password"
              type="password"
              placeholder="Password"
              className="w-full px-4 py-2 mt-2 text-customGreenD bg-white border rounded-md focus:border-customGreenD focus:ring-customGreenD focus:outline-none focus:ring focus:ring-opacity-40"
              onChange={handleChange}
            />
          </div>
          {err && <p className="text-red-600">{err}</p>}
          <div className="mt-6">
            <Button
              type="primary"
              htmlType="submit"
              className="w-full px-4 py-2 text-center tracking-wide bg-customGreenD text-white transition-colors duration-200 transform rounded-md hover:bg-customGreen focus:outline-none focus:bg-green-900 submit-btn"
              style={{ lineHeight: "normal" }}
            >
              Login
            </Button>
          </div>
        </Form>
        <Link to={"/register"} className="font-medium hover:underline">
          <p className="mt-2 text-xs font-light text-center text-gray-700">
            If you don't have an account, go to the register!
          </p>
        </Link>
      </div>
    </div>
  );
};

export default LoginPage;
