import { useEffect, useState, useCallback } from "react";
import { useSearchParams } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { getNotesService, getTrendingNotesService } from "../services/notesService";

export const useNotes = () => {
  const { authUser } = useAuth();
  const [notes, setNotes] = useState([]);
  const [isTrending, setIsTrending] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const [loading, setLoading] = useState(false);

  const fetchNotes = useCallback(async () => {
    try {
      setLoading(true);
      const response = await getNotesService(searchParams);
      const sortedNotes = response.data.notes.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
      setNotes(sortedNotes);
    } catch (err) {
      console.error("Error fetching notes:", err);
      alert("Failed to fetch notes");
    } finally {
      setLoading(false);
    }
  }, [searchParams]);

  const fetchTrendingNotes = useCallback(async () => {
    try {
      setLoading(true);
      const response = await getTrendingNotesService();
      const sortedTrendingNotes = response.data.notes.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
      setNotes(sortedTrendingNotes);
    } catch (err) {
      console.error("Error fetching trending notes:", err);
      alert("Failed to fetch trending notes");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (authUser) {
      if (isTrending) {
        fetchTrendingNotes();
      } else {
        fetchNotes();
      }
    }
  }, [isTrending, authUser, fetchNotes, fetchTrendingNotes]);

  const likeNotesById = (post_id) => {
    setNotes((prevNotes) =>
      prevNotes.map((note) =>
        note.id === post_id
          ? {
              ...note,
              likedByMe: !note.likedByMe,
              votes: note.likedByMe ? note.votes - 1 : note.votes + 1,
            }
          : note
      )
    );
  };

  const deleteNotesById = (post_id) => {
    setNotes((prevNotes) => prevNotes.filter((note) => note.id !== post_id));
  };

  return {
    notes,
    isTrending,
    setIsTrending,
    searchParams,
    setSearchParams,
    likeNotesById,
    deleteNotesById,
    loading,
    refetchNotes: fetchNotes,
  };
};
