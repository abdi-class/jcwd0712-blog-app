"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Send } from "lucide-react";
import { Footer } from "@/components/footer";
import { Formik, Form, FormikProps } from "formik";
import { blogSchema } from "./BlogSchema";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import axios from "axios";
import BlogList from "./components/BlogList";
import { useAccountStore } from "@/lib/store/accountStore";
// import { BlogManagement } from "@/components/blog-management";

interface IBlogFormValues {
  title: string;
  thumbnail: string;
  category: string;
  content: string;
}

export default function CreateBlogPage() {
  const account = useAccountStore((state) => state.account);
  const [editingBlog, setEditingBlog] = useState<any>(null);

  const defaultValues: IBlogFormValues = {
    title: "",
    thumbnail: "",
    category: "",
    content: "",
  };

  const onSubmit = async (values: IBlogFormValues) => {
    try {
      if (!account?.objectId) {
        throw new Error("Account objectId is missing!");
      }

      // Step 1: Create blog post (without relation)
      const result = await axios.post(
        "https://trimbalance-us.backendless.app/api/data/blogs",
        values
      );

      const blogId = result.data?.objectId;
      if (!blogId) {
        throw new Error("Failed to retrieve blog objectId after creation.");
      }

      console.log([
        {
          __type: "Pointer",
          className: "accounts",
          objectId: account.objectId,
        },
      ]);

      // Step 2: Create relation via /blogs/:id/account
      await axios.put(
        `https://trimbalance-us.backendless.app/api/data/blogs/${blogId}/account`,
        {
          objectId: account.objectId,
        }
      );

      alert("Publish blog success");
    } catch (error: any) {
      console.error(
        "Error publishing blog:",
        error?.response?.data || error.message || error
      );
    }
  };

  return (
    <>
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-white">
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-6xl mx-auto">
            {/* Header */}
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-slate-900">
                Content Management
              </h1>
              <p className="text-slate-600 mt-2">
                Create new posts or manage your existing content
              </p>
            </div>

            <Tabs defaultValue="create" className="space-y-8">
              <TabsList className="grid w-full grid-cols-2 max-w-md">
                <TabsTrigger value="create" data-value="create">
                  {editingBlog ? "Edit Post" : "Create New"}
                </TabsTrigger>
                <TabsTrigger value="manage">Manage Posts</TabsTrigger>
              </TabsList>

              {/* Create/Edit Tab */}
              <TabsContent value="create">
                <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-xl font-semibold text-slate-900">
                        Write Your Story
                      </CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-8">
                    <Formik
                      initialValues={defaultValues}
                      validationSchema={blogSchema}
                      onSubmit={onSubmit}
                    >
                      {(props: FormikProps<IBlogFormValues>) => {
                        const {
                          values,
                          errors,
                          touched,
                          handleChange,
                          handleBlur,
                          setFieldValue,
                          isValid,
                          dirty,
                        } = props;

                        return (
                          <Form>
                            <CardContent className="space-y-8">
                              {/* Title */}
                              <div className="space-y-3">
                                <Label htmlFor="title">Blog Title</Label>
                                <Input
                                  id="title"
                                  name="title"
                                  type="text"
                                  placeholder="Enter blog title"
                                  value={values.title}
                                  onChange={handleChange}
                                  onBlur={handleBlur}
                                  className="h-12 text-lg border-slate-200"
                                />
                                {touched.title && errors.title && (
                                  <p className="text-sm text-red-500">
                                    {errors.title}
                                  </p>
                                )}
                              </div>

                              {/* Image URL */}
                              <div className="space-y-3">
                                <Label htmlFor="thumbnail">Image URL</Label>
                                <Input
                                  id="thumbnail"
                                  name="thumbnail"
                                  type="text"
                                  placeholder="https://example.com/image.jpg"
                                  value={values.thumbnail}
                                  onChange={handleChange}
                                  onBlur={handleBlur}
                                  className="h-12 border-slate-200"
                                />
                                {touched.thumbnail && errors.thumbnail && (
                                  <p className="text-sm text-red-500">
                                    {errors.thumbnail}
                                  </p>
                                )}
                              </div>

                              {/* Category */}
                              <div className="space-y-3">
                                <Label htmlFor="category">Category</Label>
                                <Select
                                  defaultValue={values.category}
                                  onValueChange={(value) =>
                                    setFieldValue("category", value)
                                  }
                                >
                                  <SelectTrigger className="h-12 border-slate-200 text-base">
                                    <SelectValue placeholder="Select a category" />
                                  </SelectTrigger>
                                  <SelectContent>
                                    <SelectItem value="technology">
                                      Technology
                                    </SelectItem>
                                    <SelectItem value="lifestyle">
                                      Lifestyle
                                    </SelectItem>
                                    <SelectItem value="travel">
                                      Travel
                                    </SelectItem>
                                    <SelectItem value="education">
                                      Education
                                    </SelectItem>
                                  </SelectContent>
                                </Select>
                                {touched.category && errors.category && (
                                  <p className="text-sm text-red-500">
                                    {errors.category}
                                  </p>
                                )}
                              </div>

                              {/* Content */}
                              <div className="space-y-3">
                                <Label htmlFor="content">Blog Content</Label>
                                <Textarea
                                  id="content"
                                  name="content"
                                  placeholder="Write your blog content..."
                                  value={values.content}
                                  onChange={handleChange}
                                  onBlur={handleBlur}
                                  className="min-h-[400px] text-base border-slate-200 resize-none"
                                />
                                <p className="text-sm text-slate-500">
                                  {values.content.length} characters
                                </p>
                                {touched.content && errors.content && (
                                  <p className="text-sm text-red-500">
                                    {errors.content}
                                  </p>
                                )}
                              </div>

                              {/* Submit */}
                              <div className="flex flex-col sm:flex-row gap-4 pt-6 border-t border-slate-200">
                                <Button
                                  type="submit"
                                  size="lg"
                                  className="flex-1 h-12 text-base font-medium"
                                  disabled={!isValid || !dirty}
                                >
                                  <Send className="h-4 w-4 mr-2" />
                                  {editingBlog ? "Update Post" : "Publish Post"}
                                </Button>
                              </div>
                            </CardContent>
                          </Form>
                        );
                      }}
                    </Formik>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Manage Posts Tab */}
              <TabsContent value="manage">
                <BlogList />
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
