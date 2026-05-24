import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { register } from "../api/auth.api";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const navigate = useNavigate();

  const initialValues = {
    username: "",
    email: "",
    password: "",
  };

  const validationSchema = Yup.object({
    username: Yup.string()
      .min(3, "Too short")
      .required("Required"),
    email: Yup.string().email("Invalid email").required("Required"),
    password: Yup.string()
      .min(6, "Min 6 characters")
      .required("Required"),
  });

  const handleSubmit = async (values, { setSubmitting, setErrors }) => {
    try {
      await register(values);
      navigate("/login");
    } catch (err) {
      setErrors({
        general: err.response?.data?.message || "Registration failed",
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="auth-layout">
      <div className="card login-card">
        <h2 className="login-title">Create Account</h2>

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
                  name="username"
                  placeholder="Username"
                  className="input"
                />
                <ErrorMessage
                  name="username"
                  component="div"
                  className="error-text"
                />
              </div>

              <div className="form-group">
                <Field
                  name="email"
                  type="email"
                  placeholder="Email"
                  className="input"
                />
                <ErrorMessage
                  name="email"
                  component="div"
                  className="error-text"
                />
              </div>

              <div className="form-group">
                <Field
                  name="password"
                  type="password"
                  placeholder="Password"
                  className="input"
                />
                <ErrorMessage
                  name="password"
                  component="div"
                  className="error-text"
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="btn-primary"
              >
                {isSubmitting ? "Creating account..." : "Register"}
              </button>

            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default Register;