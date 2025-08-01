"use client";

import axios from "axios";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

interface IBlog {
  objectId: string;
  title: string;
  thumbnail: string;
  category: string;
  content: string;
  created: number;
}
function BlogDetailPage() {
  const params = useParams();
  const [detail, setDetail] = useState<IBlog | null>(null);

  const getDetail = async () => {
    try {
      //
      const result = await axios.get(
        `https://trimbalance-us.backendless.app/api/data/blogs?where=%60title%60%20%3D%20'${params.title}'`
      );

      console.log(result.data);
      setDetail(result.data[0]);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getDetail();
  }, []);
  return (
    <div>
      {detail ? (
        <div>
          <h1 className="text-5xl font-bold">{detail?.title}</h1>
          <p>{detail?.content}</p>
        </div>
      ) : (
        ""
      )}
    </div>
  );
}

export default BlogDetailPage;
