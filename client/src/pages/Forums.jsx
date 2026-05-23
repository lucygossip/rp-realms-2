import { Link } from "react-router-dom";
import "../styles/components/forums.css";

const categories = [
  {
    name: "general",
    label: "General",
    description: "General discussion about anything.",
  },
  {
    name: "tech-help",
    label: "Tech Help",
    description: "Ask for help with coding and tech issues.",
  },
  {
    name: "announcements",
    label: "Announcements",
    description: "Official updates and announcements.",
  },
  {
    name: "off-topic",
    label: "Off-Topic",
    description: "Anything unrelated to main topics.",
  },
];

const Forums = () => {
  return (
    <div className="forums-page">
      <div className="forums-container">
        <h1 className="forums-title">Forums</h1>
        <p className="forums-subtitle">
          Choose a category to view threads
        </p>

        <div className="forums-list">
          {categories.map((cat) => (
            <Link
              key={cat.name}
              to={`/forums/${cat.name}`}
              className="forum-link"
            >
              <div className="forum-card">
                <h3 className="forum-label">{cat.label}</h3>
                <p className="forum-description">
                  {cat.description}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Forums;