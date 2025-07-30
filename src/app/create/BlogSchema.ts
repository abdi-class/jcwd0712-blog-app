// schemas/blogSchema.ts
import * as Yup from "yup";

export const blogSchema = Yup.object({
  title: Yup.string().required("Title is required"),
  thumbnail: Yup.string()
    .url("Must be a valid URL")
    .required("Image URL is required"),
  category: Yup.string().required("Please select a category"),
  content: Yup.string()
    .min(50, "Content should be at least 50 characters")
    .required("Content is required"),
});
