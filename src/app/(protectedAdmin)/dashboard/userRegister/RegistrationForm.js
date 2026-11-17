import { Formik, Form } from "formik";
import { Button } from "@mui/material";
import axios from "axios";
//import { useAxios } from "@/app/Hook/useAxios";
import { toast } from "react-toastify";
//import { ErrorDisplay } from "@/app/utils/axiosError";

export const ITPersonnelForm = () => {
  const initialValues = {
    name: "",
    username: "",
    password: "",
    rank: "",
    domain: "",
  };

  const handleSubmit = async (values, { resetForm }) => {
    try {
      //console.log("IT Personnel Data:", values);

      // Add your API call here
      const response = await axios.post("/api/itPersonReg", values);
      //console.log(response);
      toast.success(response.data.message || "New Registration Successfull");
      // await axios.post("/your-api-url", values);

      resetForm();
    } catch (error) {
      console.error("Registration Error:", error);
      toast.error("Registration Failed");
    }
  };

  return (
    <Formik initialValues={initialValues} onSubmit={handleSubmit}>
      {({ values, handleChange, handleBlur, isSubmitting }) => (
        <Form>
          <h3>IT Personnel Registration</h3>

          <div>
            <label>Name</label>
            <input
              type="text"
              name="name"
              value={values.name}
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder="Enter full name"
              required
            />
          </div>

          <div>
            <label>Username</label>
            <input
              type="text"
              name="username"
              value={values.username}
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder="Enter username"
              required
            />
          </div>

          <div>
            <label>Password</label>
            <input
              type="password"
              name="password"
              value={values.password}
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder="Enter password"
              required
            />
          </div>

          <div>
            <label>Rank</label>
            <input
              type="text"
              name="rank"
              value={values.rank}
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder="Enter rank"
              required
            />
          </div>

          <div>
            <label>Domain</label>
            <select
              name="domain"
              value={values.domain}
              onChange={handleChange}
              onBlur={handleBlur}
              required
            >
              <option value="">Select Domain</option>
              <option value="networking">Networking</option>
              <option value="voice">Voice</option>
              <option value="hardware-app">Hardware App</option>
              <option value="catv-nabanna">CATV Nabanna</option>
            </select>
          </div>

          <Button
            type="submit"
            variant="contained"
            color="success"
            disabled={isSubmitting}
          >
            Register IT Personnel
          </Button>
        </Form>
      )}
    </Formik>
  );
};

export const AdminForm = () => {
  const initialValues = {
    name: "",
    email: "",
    rank: "",
    subdivision: "",
    mobile: "",
    password: "",
  };

  const handleSubmit = async (values, { resetForm }) => {
    try {
      //console.log("Admin Registration Data:", values);

      // Add your API call here
      const response = await axios.post("/api/adminReg", values);
      //console.log(response);
      toast.success(response.data?.message || "New Registration Successfull");

      resetForm();
    } catch (error) {
      console.error("Admin Registration Error:", error);
      toast.error("Registration Failed");
    }
  };

  return (
    <Formik initialValues={initialValues} onSubmit={handleSubmit}>
      {({ values, handleChange, handleBlur, isSubmitting }) => (
        <Form>
          <h3>Admin Registration</h3>

          <div>
            <label>Name</label>
            <input
              type="text"
              name="name"
              value={values.name}
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder="Enter full name"
              required
            />
          </div>

          <div>
            <label>Email</label>
            <input
              type="email"
              name="email"
              value={values.email}
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder="Enter email"
              required
            />
          </div>

          <div>
            <label>Rank</label>
            <input
              type="text"
              name="rank"
              value={values.rank}
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder="Enter rank"
              required
            />
          </div>

          <div>
            <label>Subdivision</label>
            <input
              type="text"
              name="subdivision"
              value={values.subdivision}
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder="Enter subdivision"
              required
            />
          </div>

          <div>
            <label>Mobile</label>
            <input
              type="tel"
              name="mobile"
              value={values.mobile}
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder="Enter mobile number"
              required
            />
          </div>

          <div>
            <label>Password</label>
            <input
              type="password"
              name="password"
              value={values.password}
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder="Enter password"
              required
            />
          </div>

          <Button
            type="submit"
            variant="contained"
            color="success"
            disabled={isSubmitting}
          >
            Register Admin
          </Button>
        </Form>
      )}
    </Formik>
  );
};
