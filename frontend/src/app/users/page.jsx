'use client'
import { useEffect, useMemo, useState } from "react"
import { Search, UserPlus } from "lucide-react"
import { getUsers, deleteUser } from "@/services/usersService"
import AddUserForm from "./AddUserForm"
import UpdateUserForm from "./UpdateUserForm"
import TableUsers from "./TableUsers"

export default function UsersPage() {
  const [users, setUsers] = useState([])
  const [search, setSearch] = useState("")
  const [statusFilter, setStatusFilter] = useState("tous")
  const [startDate, setStartDate] = useState("")
  const [endDate, setEndDate] = useState("")
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

  // 🔍 Filtrage global combiné
  const filteredUsers = useMemo(() => {
    return users.filter((u) => {
      const q = search.toLowerCase().trim()
      const matchSearch =
        !q ||
        u.nom?.toLowerCase().includes(q) ||
        u.prenom?.toLowerCase().includes(q) ||
        u.phone?.toLowerCase().includes(q)

      const matchStatus =
        statusFilter === "tous" || u.statut === statusFilter

      const matchDate =
        (!startDate || new Date(u.dateDebut) >= new Date(startDate)) &&
        (!endDate || new Date(u.dateFin) <= new Date(endDate))

      return matchSearch && matchStatus && matchDate
    })
  }, [search, users, statusFilter, startDate, endDate])

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
        <h1 className="text-3xl font-extrabold tracking-tight text-slate-800 mb-6">
          👥 Gestion des utilisateurs
        </h1>

        {/* ======= CONTROLS ======= */}
        <div className="bg-white/80 backdrop-blur-md border border-gray-200 shadow-md rounded-2xl p-5 mb-8 flex flex-col gap-5">
          
          {/* === Ligne 1 : Recherche + Ajouter === */}
          <div className="flex flex-col sm:flex-row justify-between items-center gap-3">
            {/* 🔍 Barre de recherche */}
            <div className="flex items-center bg-gray-50 border border-gray-200 rounded-xl px-3 py-2 w-full sm:w-[420px] shadow-sm hover:shadow-md transition">
              <Search size={18} className="text-gray-500 mr-2" />
              <input
                type="text"
                placeholder="Rechercher par nom, prénom ou téléphone..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="bg-transparent flex-1 outline-none text-gray-800 placeholder:text-gray-400"
              />
            </div>

            {/* ➕ Bouton Ajouter */}
            <button
              onClick={() => {
                setShowAdd(true)
                setEditing(null)
              }}
              className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700
                         text-white font-semibold flex items-center justify-center gap-2 px-6 py-2.5 rounded-xl shadow-lg transition-all hover:scale-105"
            >
              <UserPlus size={18} /> Ajouter
            </button>
          </div>

          {/* === Ligne 2 : Filtres === */}
          <div className="flex flex-col sm:flex-row justify-start items-center gap-6">
            {/* 🎯 Filtre par statut */}
            <div className="flex items-center gap-2">
              <label className="text-sm font-medium text-gray-700">Statut :</label>
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="border border-gray-200 rounded-xl px-3 py-2 text-sm text-gray-800 bg-gray-50 hover:bg-gray-100 focus:ring-2 focus:ring-blue-500 transition"
              >
                <option value="tous">Tous</option>
                <option value="payé">Payé</option>
                <option value="non payé">Non payé</option>
                <option value="en cours">En cours</option>
              </select>
            </div>

            {/* 📅 Filtre par date */}
            <div className="flex items-center gap-3">
              <span className="text-sm font-medium text-gray-700">Période :</span>
              <div className="flex items-center gap-2">
                <label className="text-sm text-gray-600">Du</label>
                <input
                  type="date"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  className="border border-gray-200 rounded-lg px-2 py-1.5 text-sm text-gray-700 bg-gray-50 hover:border-blue-400 focus:ring-2 focus:ring-blue-400 outline-none"
                />
                <label className="text-sm text-gray-600">au</label>
                <input
                  type="date"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                  className="border border-gray-200 rounded-lg px-2 py-1.5 text-sm text-gray-700 bg-gray-50 hover:border-blue-400 focus:ring-2 focus:ring-blue-400 outline-none"
                />
              </div>
            </div>
          </div>
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
