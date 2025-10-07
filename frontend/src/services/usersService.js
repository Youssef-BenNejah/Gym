import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3000", // ✅ ton backend NestJS
  headers: {
    "Content-Type": "application/json",
  },
});

// 🧩 Fonction utilitaire pour formater les dates et nettoyer les données
const normalizeUser = (user) => ({
  ...user,
  dateDebut: user.dateDebut ? new Date(user.dateDebut).toISOString().split("T")[0] : "",
  dateFin: user.dateFin ? new Date(user.dateFin).toISOString().split("T")[0] : "",
});

export const getUsers = async () => {
  try {
    const response = await api.get("/users");
    const users = Array.isArray(response.data)
      ? response.data.map(normalizeUser)
      : [];

    // ✅ Vérifie si certains utilisateurs ont été mis à jour (statut expiré)
    const expiredUsers = users.filter((u) => u.statut === "non payé");
    if (expiredUsers.length > 0) {
      console.info(
        `⚠️ ${expiredUsers.length} utilisateur(s) sont passés automatiquement en statut "non payé".`
      );
    }

    return users;
  } catch (error) {
    console.error("❌ Erreur lors du chargement des utilisateurs:", error);
    throw error;
  }
};

export const getUserById = async (id) => {
  try {
    const response = await api.get(`/users/${id}`);
    return normalizeUser(response.data);
  } catch (error) {
    console.error(`❌ Erreur lors du chargement de l'utilisateur ${id}:`, error);
    throw error;
  }
};

export const createUser = async (userData) => {
  try {
    const response = await api.post("/users", userData);
    return normalizeUser(response.data);
  } catch (error) {
    console.error("❌ Erreur lors de la création de l'utilisateur:", error);
    throw error.response?.data || error;
  }
};

export const updateUser = async (id, userData) => {
  try {
    const response = await api.put(`/users/${id}`, userData);
    return normalizeUser(response.data);
  } catch (error) {
    console.error("❌ Erreur lors de la mise à jour de l'utilisateur:", error);
    throw error.response?.data || error;
  }
};

export const deleteUser = async (id) => {
  try {
    const response = await api.delete(`/users/${id}`);
    return response.data;
  } catch (error) {
    console.error("❌ Erreur lors de la suppression de l'utilisateur:", error);
    throw error.response?.data || error;
  }
};

export const getDashboardStats = async () => {
  try {
    const response = await api.get("/users/dashboard-stats");
    return response.data;
  } catch (error) {
    console.error("Erreur lors du chargement des statistiques du dashboard:", error);
    throw error;
  }
};

