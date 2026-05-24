import { useContext, useState, useEffect } from "react";
import { AuthContext } from "../context/AuthContext";
import api from "../api/axios";

import ProfileOverview from "../components/ProfileOverview";

const Profile = () => {
  const { user, loading } = useContext(AuthContext);

  const [uploading, setUploading] = useState(false);
  const [activeTab, setActiveTab] = useState("overview");

  const [characters, setCharacters] = useState([]);
  const [showCreateCharacter, setShowCreateCharacter] = useState(false);
  const [creating, setCreating] = useState(false);
  const [editingCharacterId, setEditingCharacterId] = useState(null);

  const isMaxCharacters = characters.length >= 3;

  const [form, setForm] = useState({
    name: "",
    race: "",
    class: "",
    age: "",
    traits: "",
    backstory: "",
  });

  useEffect(() => {
    if (activeTab === "characters") {
      fetchCharacters();
    }
  }, [activeTab]);

  const fetchCharacters = async () => {
    try {
      const res = await api.get("/characters/me");
      setCharacters(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleAvatarUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("avatar", file);

    try {
      setUploading(true);

      await api.put("/auth/avatar", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      window.location.reload();
    } catch (err) {
      console.error(err);
    } finally {
      setUploading(false);
    }
  };

  const handleSubmitCharacter = async (e) => {
    e.preventDefault();

    try {
      setCreating(true);

      const payload = {
        ...form,
        traits: form.traits
          .split(",")
          .map((t) => t.trim())
          .filter(Boolean),
      };

      let res;

      if (editingCharacterId) {
        res = await api.put(`/characters/${editingCharacterId}`, payload);

        setCharacters((prev) =>
          prev.map((c) => (c._id === editingCharacterId ? res.data : c)),
        );
      } else {
        res = await api.post("/characters", payload);

        setCharacters((prev) => [res.data, ...prev]);
      }

      setShowCreateCharacter(false);
      setEditingCharacterId(null);

      setForm({
        name: "",
        race: "",
        class: "",
        age: "",
        traits: "",
        backstory: "",
      });
    } catch (err) {
      console.error(err);
    } finally {
      setCreating(false);
    }
  };

  if (loading) return <div className="profile-status">Loading...</div>;
  if (!user) return <div className="profile-status">No user found</div>;

  const openCreateModal = () => {
    setEditingCharacterId(null);

    setForm({
      name: "",
      race: "",
      class: "",
      age: "",
      traits: "",
      backstory: "",
    });

    setShowCreateCharacter(true);
  };

  const openEditModal = (character) => {
    setEditingCharacterId(character._id);

    setForm({
      name: character.name || "",
      race: character.race || "",
      class: character.class || "",
      age: character.age || "",
      traits: (character.traits || []).join(", "),
      backstory: character.backstory || "",
    });

    setShowCreateCharacter(true);
  };

  const handleDeleteCharacter = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this character?",
    );

    if (!confirmDelete) return;

    try {
      await api.delete(`/characters/${id}`);

      setCharacters((prev) => prev.filter((c) => c._id !== id));
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="profile-page">
      <div className="profile-card">
        <aside className="profile-sidebar">
          <label className="sidebar-avatar-wrapper">
            <img src={user.avatar} alt="avatar" className="sidebar-avatar" />

            <input
              type="file"
              hidden
              accept="image/*"
              onChange={handleAvatarUpload}
            />
          </label>

          {uploading && <p className="uploading-text">Uploading...</p>}

          <h2>{user.username}</h2>

          <button
            className={activeTab === "overview" ? "active" : ""}
            onClick={() => setActiveTab("overview")}
          >
            Overview
          </button>

          <button
            className={activeTab === "characters" ? "active" : ""}
            onClick={() => setActiveTab("characters")}
          >
            Characters
          </button>

          <button>Settings</button>
        </aside>

        <main className="profile-content">
          {activeTab === "overview" && <ProfileOverview user={user} />}

          {activeTab === "characters" && (
            <div className="character-panel">
              <div className="panel-header">
                <h2>Characters</h2>

                <div className="panel-actions">
                  <div className="tooltip-wrapper">
                    <button
                      className="create-character-btn"
                      onClick={openCreateModal}
                      disabled={isMaxCharacters}
                    >
                      + Create Character
                    </button>

                    {isMaxCharacters && (
                      <span className="tooltip-text">
                        Max 3 characters reached
                      </span>
                    )}
                  </div>
                </div>
              </div>

              {characters.length === 0 && (
                <p className="empty-state">
                  No characters yet. Create your first one.
                </p>
              )}

              {characters.map((c) => (
                <div key={c._id} className="character-card">
                  <img src={c.avatar} className="character-image" alt="" />

                  <div>
                    <h3>{c.name}</h3>

                    <p>
                      {c.race} • {c.class}
                    </p>

                    <p>
                      {c.backstory?.slice(0, 120)}
                      {c.backstory?.length > 120 ? "..." : ""}
                    </p>
                    <div className="character-actions">
                      <button
                        onClick={() => openEditModal(c)}
                        className="edit-btn"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDeleteCharacter(c._id)}
                        className="delete-btn danger"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </main>
      </div>

      {showCreateCharacter && (
        <div className="modal-overlay">
          <div className="modal">
            <h2>
              {editingCharacterId ? "Edit Character" : "Create Character"}
            </h2>

            <form onSubmit={handleSubmitCharacter}>
              <input
                placeholder="Name"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                required
              />

              <input
                placeholder="Race"
                value={form.race}
                onChange={(e) => setForm({ ...form, race: e.target.value })}
              />

              <input
                placeholder="Class"
                value={form.class}
                onChange={(e) => setForm({ ...form, class: e.target.value })}
              />

              <input
                placeholder="Age"
                type="number"
                value={form.age}
                onChange={(e) => setForm({ ...form, age: e.target.value })}
              />

              <input
                placeholder="Traits (comma separated)"
                value={form.traits}
                onChange={(e) => setForm({ ...form, traits: e.target.value })}
              />

              <textarea
                placeholder="Backstory"
                value={form.backstory}
                onChange={(e) =>
                  setForm({ ...form, backstory: e.target.value })
                }
              />

              <div className="modal-actions">
                <button
                  type="button"
                  onClick={() => setShowCreateCharacter(false)}
                >
                  Cancel
                </button>

                <button type="submit" disabled={creating}>
                  {creating
                    ? "Saving..."
                    : editingCharacterId
                      ? "Save Changes"
                      : "Create Character"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;
