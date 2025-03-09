import { put } from "@/hooks/userhooks";

export const handleEdit = async (TypeId: number, data: any) => {
    try {
      await put(`/api/type/${TypeId}`, data);
    } catch (error) {
      console.error("Error editing type:", error);
    }
  };