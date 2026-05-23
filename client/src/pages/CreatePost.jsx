import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { createPost } from "../api/post.api";
import { useNavigate } from "react-router-dom";

const CreatePost = () => {
  const navigate = useNavigate();

  const initialValues = {
    title: "",
    content: "",
    category: "",
    tags: "",
  };

const validationSchema = Yup.object({
  title: Yup.string()
    .min(5, "Title too short")
    .required("Required"),

  content: Yup.string()
    .min(10, "Content too short")
    .required("Required"),

  category: Yup.string().required("Required"),
});

  const handleSubmit = async (values, { setSubmitting, setErrors }) => {
  try {
    const payload = {
      ...values,

      category: values.category, // 👈 THIS GOES HERE

      tags: values.tags
        ? values.tags.split(",").map((t) => t.trim())
        : [],
    };

    await createPost(payload);

    navigate("/");
  } catch (err) {
    setErrors({
      general:
        err.response?.data?.message || "Failed to create post",
    });
  } finally {
    setSubmitting(false);
  }
};

  return (
  <div className="create-post-page">
    <div className="create-post-card">
      <h2 className="create-post-title">Create New Thread</h2>

      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting, errors }) => (
          <Form className="create-post-form">

            {errors.general && (
              <div className="error-banner">
                {errors.general}
              </div>
            )}

            <div className="form-group">
              <Field
                name="title"
                placeholder="Thread title"
                className="input input-title"
              />
              <ErrorMessage name="title" component="div" className="error-text" />
            </div>

            <div className="form-group">
              <Field as="select" name="category" className="input">
                <option value="">Select category</option>
                <option value="general">General</option>
                <option value="tech-help">Tech Help</option>
                <option value="announcements">Announcements</option>
                <option value="off-topic">Off-topic</option>
              </Field>
              <ErrorMessage name="category" component="div" className="error-text" />
            </div>

            <div className="form-group">
              <Field
                as="textarea"
                name="content"
                placeholder="Write your post..."
                rows="10"
                className="textarea"
              />
              <ErrorMessage name="content" component="div" className="error-text" />
            </div>

            <div className="form-group">
              <Field
                name="tags"
                placeholder="tags (comma separated)"
                className="input"
              />
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="btn-primary"
            >
              {isSubmitting ? "Publishing..." : "Create Thread"}
            </button>

          </Form>
        )}
      </Formik>
    </div>
  </div>
);
};

export default CreatePost;