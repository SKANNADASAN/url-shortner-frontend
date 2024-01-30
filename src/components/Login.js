import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { useFormik } from "formik";
import React, { useContext } from "react";
import { toast, Toaster } from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import { API } from "../Global";
import * as yup from "yup";
import axios from "axios";
import UserContext from "../context/UserContext";
import { Avatar, Button, TextField, Typography } from "@mui/material";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";

const loginValidationSchema = yup.object({
  username: yup.string().required().min(4),
  password: yup.string().required().min(6),
});
const Login = () => {
  const navigate = useNavigate();
  const userContextData = useContext(UserContext);
  const { handleSubmit, handleChange, handleBlur, values, touched, errors } =
    useFormik({
      initialValues: {
        username: "",
        password: "",
      },
      validationSchema: loginValidationSchema,
      onSubmit: async (values) => {
        try {
          const login = await axios.post(`${API}/api/user/login`, values);
          if (login.data.token) {
            toast.success(login.data.message);
            localStorage.setItem("react_token", login.data.token);
            localStorage.setItem("userName", login.data.username.username);
            localStorage.setItem("userEmail", login.data.username.email);
            userContextData.setLoginPerson(login.data.username.username);
            navigate("/home");
          } else {
            toast.error(login.data.message);
          }
        } catch (error) {
          console.log(error);
          toast.error("Invalid Credential");
        }
      },
    });
  const paperStyle = {
    padding: 20,
    height: "70vh",
    width: 380,
    margin: "50px auto",
  };
  const avatarStyle = { backgroundColor: "#1bbd7e" };
  const btnstyle = { margin: "8px 0" };
  return (
    <>
      <Grid>
        <Toaster />
        <Paper elevation={3} style={paperStyle}>
          <Grid align="center">
            <Avatar style={avatarStyle} className="mt-2">
              <LockOutlinedIcon />
            </Avatar>
            <h2 className="fw-bold my-2">Sign In</h2>
          </Grid>
          <form onSubmit={handleSubmit}>
            <TextField
              label="Username"
              name="username"
              value={values.username}
              onChange={handleChange}
              onBlur={handleBlur}
              error={touched.username && !!errors.username}
              helperText={
                touched.username && errors.username ? errors.username : null
              }
              className="mb-3"
              type="text"
              fullWidth
              required
            />

            <TextField
              label="Password"
              name="password"
              value={values.password}
              onChange={handleChange}
              onBlur={handleBlur}
              error={touched.password && !!errors.password}
              helperText={
                touched.password && errors.password ? errors.password : null
              }
              className="mb-3"
              type="password"
              fullWidth
              required
            />
            <Button
              type="submit"
              color="primary"
              variant="contained"
              style={btnstyle}
              fullWidth
              className="my-2"
            >
              Sign in
            </Button>
          </form>
          <Typography className="text-center p-2">
            <Link to="/forgot-password">Forgot password ?</Link>
          </Typography>
          <Typography className="text-center p-2">
            Do you have an account ?
            <Link to="/register" className="mx-2 fw-bold">
              Sign Up
            </Link>
          </Typography>
        </Paper>
      </Grid>
    </>
  );
};

export default Login;