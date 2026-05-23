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
  <div className="auth-layout">
    <div className="card login-card">
      <h2 className="login-title">Welcome Back</h2>

      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting, errors }) => (
          <Form className="login-form">

            {errors.general && (
              <div className="error-banner">
                {errors.general}
              </div>
            )}

            <div className="form-group">
              <Field
                name="email"
                type="email"
                placeholder="Email"
                className="input"
              />
              <ErrorMessage name="email" component="div" className="error-text" />
            </div>

            <div className="form-group">
              <Field
                name="password"
                type="password"
                placeholder="Password"
                className="input"
              />
              <ErrorMessage name="password" component="div" className="error-text" />
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="btn-primary"
            >
              {isSubmitting ? "Logging in..." : "Login"}
            </button>

          </Form>
        )}
      </Formik>
    </div>
  </div>
);
};

export default Login;