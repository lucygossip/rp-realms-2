import { useEffect, useState } from "react";
import { getPage } from "../api/page.api";
import ReactMarkdown from "react-markdown";

const StaticPage = ({ slug }) => {
  const [page, setPage] = useState(null);

  useEffect(() => {
    const fetchPage = async () => {
      const data = await getPage(slug);
      setPage(data);
    };

    fetchPage();
  }, [slug]);

  if (!page) return <p>Loading...</p>;

  return (
    <div className="prose mx-auto p-4">
      <h1>{page.title}</h1>
      <ReactMarkdown>{page.content}</ReactMarkdown>
    </div>
  );
};

export default StaticPage;