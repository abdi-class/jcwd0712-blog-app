import axios from "axios";

interface IBlogDetailPageProps {
  params: Promise<{ title: string }>;
}

const getDetail = async (title: string) => {
  try {
    const result = await axios.get(
      `https://trimbalance-us.backendless.app/api/data/blogs?where=%60title%60%20%3D%20'${title}'`
    );
    console.log(result.data); // muncul diterminal vscode/server, bukan web browser

    return result.data[0];
  } catch (error) {
    console.log(error);
  }
};

async function BlogDetailPage(props: IBlogDetailPageProps) {
  const params = await props.params;
  const detail = await getDetail(params.title);
  return (
    <div>
      <h1 className="text-3xl">{detail.title}</h1>
    </div>
  );
}

export default BlogDetailPage;
