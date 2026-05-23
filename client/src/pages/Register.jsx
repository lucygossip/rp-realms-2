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
    <div>
      <h2>Register</h2>

      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting, errors }) => (
          <Form>

            {errors.general && (
              <div style={{ color: "red" }}>{errors.general}</div>
            )}

            <div>
              <Field name="username" placeholder="Username" />
              <ErrorMessage name="username" component="div" />
            </div>

            <div>
              <Field name="email" type="email" placeholder="Email" />
              <ErrorMessage name="email" component="div" />
            </div>

            <div>
              <Field name="password" type="password" placeholder="Password" />
              <ErrorMessage name="password" component="div" />
            </div>

            <button type="submit" disabled={isSubmitting}>
              Register
            </button>

          </Form>
        )}
      </Formik>
    </div>
  );
};

export default Register;