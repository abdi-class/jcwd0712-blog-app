"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import {
  Search,
  Calendar,
  Eye,
  Heart,
  MessageCircle,
  Filter,
} from "lucide-react";
import axios from "axios";

const categories = [
  { name: "All" },
  { name: "Technology" },
  { name: "Lifestyle" },
  { name: "Travel" },
  { name: "Food" },
  { name: "Health" },
  { name: "Finance" },
  { name: "Career" },
];

export default function BlogsPage() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [blogs, setBlogs] = useState<any[]>([]);

  const getBlogs = async () => {
    try {
      const result = await axios.get(
        "https://trimbalance-us.backendless.app/api/data/blogs"
      );
      setBlogs(result.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getBlogs();
  }, []);

  return (
    <>
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-white">
        <div className="container mx-auto px-4 py-8">
          {/* Header */}
          <div className="max-w-4xl mx-auto text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">
              Explore Stories
            </h1>
            <p className="text-xl text-slate-600 mb-8">
              Discover inspiring content from our community of writers
            </p>

            {/* Search Bar */}
            <div className="relative max-w-md mx-auto mb-8">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 h-5 w-5" />
              <Input
                type="text"
                placeholder="Search articles..."
                className="pl-10 h-12 text-base border-slate-200 focus:border-slate-400 focus:ring-slate-400"
              />
            </div>
          </div>

          {/* Categories */}
          <div className="max-w-6xl mx-auto mb-12">
            <div className="flex items-center gap-4 mb-6">
              <Filter className="h-5 w-5 text-slate-600" />
              <h2 className="text-lg font-semibold text-slate-900">
                Categories
              </h2>
            </div>
            <div className="flex flex-wrap gap-3">
              {categories.map((category) => (
                <Button
                  key={category.name}
                  variant={
                    selectedCategory === category.name ? "default" : "outline"
                  }
                  onClick={() => setSelectedCategory(category.name)}
                  className="rounded-full"
                >
                  {category.name}
                </Button>
              ))}
            </div>
          </div>

          <div className="max-w-6xl mx-auto">
            {blogs.length > 0 && (
              <div className="mb-16">
                <h2 className="text-2xl font-bold text-slate-900 mb-8">
                  All Blogs
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {blogs.map((blog) => (
                    <Card
                      key={blog.objectId}
                      className="group hover:shadow-xl transition-all duration-300 border-0 bg-white/80 backdrop-blur-sm overflow-hidden"
                    >
                      <div className="relative">
                        <Image
                          src={blog.thumbnail || "/placeholder.svg"}
                          alt={blog.title}
                          width={500}
                          height={300}
                          className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                        <Badge className="absolute top-4 left-4 bg-blue-600 hover:bg-blue-700">
                          {blog.category}
                        </Badge>
                      </div>
                      <CardContent className="p-6">
                        <h3 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-blue-600 transition-colors line-clamp-2">
                          <Link href={`/blog/${blog.title}`}>{blog.title}</Link>
                        </h3>
                        <p className="text-slate-600 mb-4 line-clamp-3">
                          {blog.content}
                        </p>

                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-3">
                            <Image
                              src={blog.authorAvatar || "/placeholder.svg"}
                              alt="author"
                              width={40}
                              height={40}
                              className="rounded-full"
                            />
                            <div>
                              <p className="font-medium text-slate-900 text-sm">
                                Author
                              </p>
                              <div className="flex items-center text-xs text-slate-500 space-x-2">
                                <Calendar className="h-3 w-3" />
                                <span>
                                  {new Date(blog.created).toLocaleDateString()}
                                </span>
                              </div>
                            </div>
                          </div>

                          <div className="flex items-center space-x-4 text-sm text-slate-500">
                            <div className="flex items-center space-x-1">
                              <Eye className="h-4 w-4" />
                            </div>
                            <div className="flex items-center space-x-1">
                              <Heart className="h-4 w-4" />
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            )}

            {/* No Results */}
            {blogs.length === 0 && (
              <div className="text-center py-16">
                <div className="text-slate-400 mb-4">
                  <Search className="h-16 w-16 mx-auto" />
                </div>
                <h3 className="text-xl font-semibold text-slate-900 mb-2">
                  No posts found
                </h3>
                <p className="text-slate-600 mb-6">
                  Try adjusting your search or browse different categories
                </p>
                <Button>Clear Filters</Button>
              </div>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
