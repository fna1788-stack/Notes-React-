import React, { useState } from "react";
import "./App.css"
import axios from "axios";


function App() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [notes, setNotes] = useState([]);
  const [search, setSearch] = useState("");
  const [editId, setEditId] = useState(null);

  function handleSubmit(e) {
    e.preventDefault();

    if (title.trim() === "" || content.trim() === "") {
      return;
    }

    if (editId !== null) {
      setNotes(
        notes.map((note) =>
          note.id === editId
            ? { ...note, title: title, content: content }
            : note
        )
      );

      setEditId(null);
    } else {
    axios.post("http://localhost:3000/notes", {
      title: title,
      content: content
    })
    .then((res) => {
       setNotes([...notes, res.data]);
    });
  }

    setTitle("");
    setContent("");
  }

  function deleteNote(id) {
    setNotes(notes.filter((note) => note.id !== id));
  }

  
  function editNote(note) {
    setTitle(note.title);
    setContent(note.content);
    setEditId(note.id);
  }

  
  const filteredNotes = notes.filter(
    (note) =>
      note.title.toLowerCase().includes(search.toLowerCase()) ||
      note.content.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-slate-100 px-4 py-8">

    
      <div className="mx-auto max-w-6xl">

  
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

          <div>
            <h1 className="text-3xl font-bold text-slate-800">
              📝 My Notes
            </h1>

            <p className="mt-1 text-sm text-slate-500">
              Capture your ideas and thoughts
            </p>
          </div>

      
          <input
            type="text"
            placeholder="🔍 Search notes..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3
                       text-sm outline-none transition
                       focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100
                       sm:w-64"
          />
        </div>

        
        <form
          onSubmit={handleSubmit}
          className="mb-10 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
        >
          <h2 className="mb-5 text-xl font-semibold text-slate-800">
            {editId !== null ? "Edit Note" : "Create a Note"}
          </h2>

       
          <input
            type="text"
            placeholder="Note title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="mb-4 w-full rounded-xl border border-slate-200
                       px-4 py-3 text-slate-800 outline-none transition
                       placeholder:text-slate-400
                       focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
          />

          <textarea
            placeholder="Write your note here..."
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="mb-4 min-h-32 w-full resize-none rounded-xl
                       border border-slate-200 px-4 py-3 text-slate-800
                       outline-none transition
                       placeholder:text-slate-400
                       focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
          />

          <div className="flex gap-3">

            <button
              type="submit"
              className="rounded-xl bg-indigo-600 px-6 py-3
                         font-semibold text-white transition
                         hover:bg-indigo-700 active:scale-95"
            >
              {editId !== null ? "Update Note" : "+ Add Note"}
            </button>

            {editId !== null && (
              <button
                type="button"
                onClick={() => {
                  setEditId(null);
                  setTitle("");
                  setContent("");
                }}
                className="rounded-xl bg-slate-100 px-6 py-3
                           font-semibold text-slate-700
                           hover:bg-slate-200"
              >
                Cancel
              </button>
            )}

          </div>
        </form>

       
        <div className="mb-5 flex items-center justify-between">
          <h2 className="text-2xl font-bold text-slate-800">
            My Notes
          </h2>

          <span className="rounded-full bg-indigo-100 px-3 py-1 text-sm font-medium text-indigo-600">
            {filteredNotes.length} Notes
          </span>
        </div>

  
        {filteredNotes.length === 0 ? (

          <div className="rounded-2xl border border-dashed border-slate-300
                          bg-white py-16 text-center">
            <div className="mb-3 text-5xl">🗒️</div>

            <h3 className="text-lg font-semibold text-slate-700">
              No notes found
            </h3>

            <p className="mt-1 text-sm text-slate-400">
              Create your first note to get started.
            </p>
          </div>

        ) : (

          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">

            {filteredNotes.map((note) => (

              <div
                key={note.id}
                className="group rounded-2xl border border-slate-200
                           bg-white p-5 shadow-sm transition
                           hover:-translate-y-1 hover:shadow-lg"
              >

           
                <div className="mb-5">

                  <h3 className="mb-2 text-xl font-bold text-slate-800
                                 break-words">
                    {note.title}
                  </h3>

                  <p className="line-clamp-4 text-sm leading-6 text-slate-500
                                break-words">
                    {note.content}
                  </p>

                </div>

              
                <div className="flex gap-2 border-t border-slate-100 pt-4">

                  <button
                    onClick={() => editNote(note)}
                    className="flex-1 rounded-lg bg-slate-100 px-3 py-2
                               text-sm font-medium text-slate-700
                               transition hover:bg-slate-200"
                  >
                    ✏️ Edit
                  </button>

                  <button
                    onClick={() => deleteNote(note.id)}
                    className="flex-1 rounded-lg bg-red-50 px-3 py-2
                               text-sm font-medium text-red-600
                               transition hover:bg-red-100"
                  >
                    🗑️ Delete
                  </button>

                </div>

              </div>

            ))}

          </div>

        )}

      </div>
    </div>
  );
}

export default App;
