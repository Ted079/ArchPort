import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ROUTES } from "../../utils/route";
import type { RegisterDTO } from "../../../../shared/types/user.types";
import { useAppDispatch } from "../../store";
import { createUser } from "../../store/user/authSlice";
import {
  signupSchema,
  type SignupFormData,
} from "../../../../shared/validators/auth.validators";
import AuthIcons from "../../components/UI/icons/AuthIcons";

const Signup = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [values, setValue] = useState<RegisterDTO>({
    name: "",
    email: "",
    password: "",
  });

  const [error, setError] = useState<Record<string, string>>({});

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setValue((prev) => ({ ...prev, [name]: value }));

    if (error[name]) setError((prev) => ({ ...prev, [name]: "" }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const result = signupSchema.safeParse(values);

    if (!result.success) {
      const errorField: Record<string, string> = {};
      result.error.issues.forEach((err) => {
        const path = err.path[0];
        if (path) {
          errorField[String(path)] = err.message;
        }
      });
      setError(errorField);
      return;
    }

    dispatch(createUser(values));
    navigate("/");
  };

  const inputStyles = (field: keyof SignupFormData) =>
    `block w-full py-3 text-gray-700 bg-white border border-gray-200  rounded-lg px-11 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40 ${
      error[field]
        ? "border-red-500 focus:border-red-400 focus:ring-red-300"
        : "border-gray-200 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300"
    }`;

  return (
    <section className="bg-white dark:bg-gray-900">
      <div className="container flex items-center justify-center min-h-screen px-6 mx-auto">
        <form className="w-full max-w-md" onSubmit={handleSubmit} noValidate>
          <div className="flex justify-center mx-auto">
            <img
              className="w-auto h-7 sm:h-8"
              src="https://merakiui.com/images/logo.svg"
              alt=""
            />
          </div>

          <div className="flex items-center justify-center mt-6">
            <span className="w-1/3 pb-4 font-medium text-center text-gray-800 capitalize border-b-2 border-gray-200  dark:border-blue-400 dark:text-white">
              sign up
            </span>
          </div>

          <div className="relative flex items-center mt-8">
            <span className="absolute">
              <AuthIcons
                type="user"
                className="w-6 h-6 mx-3 text-gray-300 dark:text-gray-500"
              />
            </span>

            <input
              type="name"
              name="name"
              value={values.name}
              onChange={handleChange}
              className={inputStyles("name")}
              placeholder="Username"
            />
          </div>
          {error.name && (
            <p className="text-red-500 text-sm mt-1">{error.name}</p>
          )}

          <div className="relative flex items-center mt-6">
            <span className="absolute">
              <AuthIcons
                type="email"
                className="w-6 h-6 mx-3 text-gray-300 dark:text-gray-500"
              />
            </span>

            <input
              type="email"
              name="email"
              value={values.email}
              onChange={handleChange}
              className={inputStyles("email")}
              placeholder="Email address"
            />
          </div>
          {error.email && (
            <p className="text-red-500 text-sm mt-1">{error.email}</p>
          )}

          <div className="relative flex items-center mt-4">
            <span className="absolute">
              <AuthIcons
                type="password"
                className="w-6 h-6 mx-3 text-gray-300 dark:text-gray-500"
              />
            </span>

            <input
              type="password"
              name="password"
              value={values.password}
              onChange={handleChange}
              className={inputStyles("password")}
              placeholder="Password"
            />
          </div>
          {error.password && (
            <p className="text-red-500 text-sm mt-1">{error.password}</p>
          )}

          <div className="mt-6">
            <button className="w-full px-6 py-3 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-gray-800 rounded-lg hover:bg-gray-700 focus:outline-none focus:ring focus:ring-gray-300 focus:ring-opacity-50">
              Sign Up
            </button>

            <div className="mt-6 text-center ">
              <Link
                to={ROUTES.LOGIN}
                className="text-xs text-gray-500 uppercase dark:text-gray-400 hover:underline"
              >
                Already have an account?
              </Link>
            </div>
          </div>
        </form>
      </div>
    </section>
  );
};

export default Signup;
