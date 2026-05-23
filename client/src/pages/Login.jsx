import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { login } from "../api/auth.api";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

const Login = () => {
  const navigate = useNavigate();

  // 🔥 get loadUser from context
  const { loadUser } = useContext(AuthContext);

  const initialValues = {
    email: "",
    password: "",
  };

  const validationSchema = Yup.object({
    email: Yup.string().email("Invalid email").required("Required"),
    password: Yup.string().required("Required"),
  });

  const handleSubmit = async (values, { setSubmitting, setErrors }) => {
    try {
      // ❌ you had loginUser (doesn't exist)
      const res = await login(values);

      // 1. store token
      localStorage.setItem("token", res.token);

      // 2. sync auth state immediately
      await loadUser(); // 🔥 fixes refresh issue

      // 3. redirect
      navigate("/profile");
    } catch (err) {
      setErrors({
        general: err.response?.data?.message || "Login failed",
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div>
      <h2>Login</h2>

      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting, errors }) => (
          <Form>

            {errors.general && (
              <div style={{ color: "red" }}>
                {errors.general}
              </div>
            )}

            <div>
              <Field name="email" type="email" placeholder="Email" />
              <ErrorMessage name="email" component="div" />
            </div>

            <div>
              <Field name="password" type="password" placeholder="Password" />
              <ErrorMessage name="password" component="div" />
            </div>

            <button type="submit" disabled={isSubmitting}>
              Login
            </button>

          </Form>
        )}
      </Formik>
    </div>
  );
};

export default Login;