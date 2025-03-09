import { put } from "@/hooks/userhooks";

export const handleEdit = async (AuthorId: number, data: any) => {
    try {
      await put(`/api/author/${AuthorId}`, data);
    } catch (error) {
      console.error("Error editing author:", error);
    }
  };