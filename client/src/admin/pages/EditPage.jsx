import { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

import { getPage } from "../../api/page.api";
import { updatePage } from "../../admin/services/admin.page.api";

const EditPage = ({ slug }) => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const load = async () => {
      const page = await getPage(slug);
      setTitle(page.title);
      setContent(page.content);
      setLoading(false);
    };

    load();
  }, [slug]);

  const handleSave = async () => {
    setSaving(true);
    await updatePage(slug, { title, content });
    setSaving(false);
    alert("Saved!");
  };

  if (loading) {
    return <div className="admin-loading">Loading page...</div>;
  }

  return (
    <div className="admin-page">
      <h1 className="admin-title">
        Editing: <span style={{ color: "var(--primary-dark)" }}>{slug}</span>
      </h1>

      {/* TOP BAR */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginBottom: "16px",
        }}
      >
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Page title"
          style={{
            width: "60%",
            padding: "10px 12px",
            borderRadius: "10px",
            border: "1px solid var(--border)",
            background: "var(--surface)",
            color: "var(--text)",
            outline: "none",
            fontWeight: 600,
          }}
        />

        <button
          onClick={handleSave}
          disabled={saving}
          style={{
            background: "var(--primary)",
            color: "var(--surface)",
            border: "none",
            padding: "10px 16px",
            borderRadius: "10px",
            cursor: "pointer",
            fontWeight: 600,
          }}
        >
          {saving ? "Saving..." : "Save"}
        </button>
      </div>

      {/* EDITOR + PREVIEW GRID */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "16px",
          height: "75vh",
        }}
      >
        {/* LEFT: EDITOR */}
        <div
          style={{
            background: "var(--surface)",
            border: "1px solid var(--border)",
            borderRadius: "14px",
            padding: "12px",
            boxShadow: "0 4px 12px var(--shadow)",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <div
            style={{
              fontSize: "13px",
              color: "var(--text-muted)",
              marginBottom: "8px",
              fontWeight: 600,
            }}
          >
            Markdown Editor
          </div>

          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            style={{
              flex: 1,
              width: "100%",
              border: "1px solid var(--border)",
              borderRadius: "10px",
              padding: "12px",
              background: "var(--bg)",
              color: "var(--text)",
              resize: "none",
              outline: "none",
              fontFamily: "inherit",
              lineHeight: "1.5",
            }}
          />
        </div>

        {/* RIGHT: PREVIEW */}
        <div
          style={{
            background: "var(--surface)",
            border: "1px solid var(--border)",
            borderRadius: "14px",
            padding: "16px",
            boxShadow: "0 4px 12px var(--shadow)",
            overflowY: "auto",
          }}
        >
          <div
            style={{
              fontSize: "13px",
              color: "var(--text-muted)",
              marginBottom: "10px",
              fontWeight: 600,
            }}
          >
            Live Preview
          </div>

          <div className="prose" style={{ color: "var(--text)" }}>
            <ReactMarkdown remarkPlugins={[remarkGfm]}>
              {content || "Nothing to preview yet..."}
            </ReactMarkdown>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditPage;