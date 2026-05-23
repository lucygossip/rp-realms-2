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
    <div style={{ maxWidth: "700px", margin: "0 auto" }}>
      <h2>Create New Thread</h2>

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
              <Field
                name="title"
                placeholder="Thread title"
              />
              <ErrorMessage name="title" component="div" />
            </div>

            <div>
              <Field as="select" name="category">
  <option value="">Select category</option>
  <option value="general">General</option>
  <option value="tech-help">Tech Help</option>
  <option value="announcements">Announcements</option>
  <option value="off-topic">Off-topic</option>
</Field>
            </div>

            <div>
              <Field
                as="textarea"
                name="content"
                placeholder="Write your post..."
                rows="8"
              />
              <ErrorMessage name="content" component="div" />
            </div>

            <div>
              <Field
                name="tags"
                placeholder="tags (comma separated)"
              />
            </div>

            <button type="submit" disabled={isSubmitting}>
              Create Thread
            </button>

          </Form>
        )}
      </Formik>
    </div>
  );
};

export default CreatePost;