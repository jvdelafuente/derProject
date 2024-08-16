import { useEffect } from "react";
import { useAuth } from "../hooks/useAuth";
import { useNotes } from "../hooks/useNotes";
import NoteAll from "../components/NoteAll";
import NoteCreateForm from "../pages/NoteCreatePage/NoteCreateForm";
import SearchBar from "../components/SearchBar";
import "./Home.css";

const NotesSearchPage = () => {
  const { authUser } = useAuth();
  const { notes, likeNotesById, deleteNotesById, setIsTrending, refetchNotes, loading } = useNotes();

  useEffect(() => {
    setIsTrending(false);
  }, [setIsTrending]);

  return (
    <main className="main-list">
      {/* Lógica para crear nuevas notas */}
      {authUser && <NoteCreateForm onNewNote={refetchNotes} />}
      <div className="notes-list">
        <SearchBar />
        {loading && <p>Loading...</p>}
        {authUser &&
          notes.length > 0 &&
          notes.map((note) => (
            <NoteAll
              key={note.id}
              authUser={authUser}
              note={note}
              likeNotesById={likeNotesById}
              deleteNotesById={deleteNotesById}
            />
          ))}
      </div>
    </main>
  );
};

export default NotesSearchPage;
