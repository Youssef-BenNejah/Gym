'use client'
import { useEffect, useMemo, useState } from "react"
import { Search, UserPlus } from "lucide-react"
import {
  getUsers,
  deleteUser
} from "@/services/usersService"
import AddUserForm from "./AddUserForm"
import UpdateUserForm from "./UpdateUserForm"
import TableUsers from "./TableUsers"

export default function UsersPage() {
  const [users, setUsers] = useState([])
  const [search, setSearch] = useState("")
  const [showAdd, setShowAdd] = useState(false)
  const [editing, setEditing] = useState(null)
  const [loading, setLoading] = useState(false)

  // Charger les users depuis le backend
  const fetchUsers = async () => {
    setLoading(true)
    try {
      const data = await getUsers()
      setUsers(data)
    } catch (err) {
      console.error("Erreur de chargement :", err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchUsers()
  }, [])

  // Filtrage par recherche
  const filteredUsers = useMemo(() => {
    const q = search.toLowerCase().trim()
    if (!q) return users
    return users.filter(
      (u) =>
        u.nom?.toLowerCase().includes(q) ||
        u.prenom?.toLowerCase().includes(q) ||
        u.phone?.toLowerCase().includes(q) ||
        u.statut?.toLowerCase().includes(q)
    )
  }, [search, users])

  const handleAdded = async () => {
    await fetchUsers()
    setShowAdd(false)
  }

  const handleUpdated = async () => {
    await fetchUsers()
    setEditing(null)
  }

  const handleDelete = async (id) => {
    if (confirm("Supprimer cet utilisateur ?")) {
      await deleteUser(id)
      await fetchUsers()
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#eef2ff] via-[#f8fafc] to-[#eef2ff] p-6">
      <div className="max-w-7xl mx-auto">
        {/* ======= TITRE ======= */}
        <h1 className="text-3xl font-extrabold tracking-tight text-slate-800 mb-3">
          👥 Gestion des utilisateurs
        </h1>

        {/* ======= BARRE DE RECHERCHE + AJOUT ======= */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-6">
          {/* Barre de recherche */}
          <div className="flex items-center bg-white border border-gray-200 rounded-xl px-3 py-2 w-full sm:w-96 shadow-sm">
            <Search size={18} className="text-gray-500 mr-2" />
            <input
              type="text"
              placeholder="Rechercher (nom, prénom, téléphone, statut)"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="bg-transparent flex-1 outline-none text-gray-700"
            />
          </div>

          {/* Bouton Ajouter */}
          <button
            onClick={() => {
              setShowAdd(true)
              setEditing(null)
            }}
            className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700
                       text-white flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl shadow-lg transition"
          >
            <UserPlus size={18} /> Ajouter un utilisateur
          </button>
        </div>

        {/* ======= FORMULAIRES ======= */}
        {showAdd && (
          <AddUserForm
            onAdded={handleAdded}
            onCancel={() => setShowAdd(false)}
          />
        )}

        {editing && (
          <UpdateUserForm
            user={editing}
            onUpdated={handleUpdated}
            onCancel={() => setEditing(null)}
          />
        )}

        {/* ======= TABLE ======= */}
        <div className="mt-4">
          {loading ? (
            <div className="text-center text-gray-500 py-10">
              Chargement des utilisateurs...
            </div>
          ) : (
            <TableUsers
              users={filteredUsers}
              onEdit={setEditing}
              onDelete={handleDelete}
            />
          )}
        </div>
      </div>
    </div>
  )
}
