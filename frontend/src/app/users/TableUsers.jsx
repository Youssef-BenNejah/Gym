'use client'
import { useState, useMemo } from "react"
import { Trash2, Pencil, Clock } from "lucide-react"

export default function TableUsers({ users, onEdit, onDelete }) {
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 10

  const totalPages = Math.ceil(users.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const paginatedUsers = useMemo(
    () => users.slice(startIndex, startIndex + itemsPerPage),
    [users, currentPage]
  )

  // 🧠 Format de date jj-mm-aaaa
  const formatDate = (dateStr) => {
    if (!dateStr) return ""
    const date = new Date(dateStr)
    const day = String(date.getDate()).padStart(2, "0")
    const month = String(date.getMonth() + 1).padStart(2, "0")
    const year = date.getFullYear()
    return `${day}-${month}-${year}`
  }

  // 🕒 Calcul jours restants
  const getDaysRemaining = (dateFin) => {
    if (!dateFin) return null
    const today = new Date()
    const end = new Date(dateFin)
    const diffTime = end - today
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
    return diffDays
  }

  const handlePageChange = (page) => {
    if (page < 1 || page > totalPages) return
    setCurrentPage(page)
  }

  return (
    <div className="overflow-x-auto bg-white rounded-xl shadow-lg border border-gray-100">
      <table className="w-full text-sm text-gray-700">
        <thead className="bg-gradient-to-r from-orange-500 to-amber-600 text-white text-left">
          <tr>
            <th className="p-3">Photo</th>
            <th>Nom</th>
            <th>Prénom</th>
            <th>Téléphone</th>
            <th>Début</th>
            <th>Fin</th>
            <th>Jours restants</th>
            <th>Statut</th>
            <th className="text-center">Actions</th>
          </tr>
        </thead>


      <tbody>
        {paginatedUsers.length > 0 ? (
          paginatedUsers.map((u) => {
            const days = getDaysRemaining(u.dateFin)
            const isExpired = days !== null && days <= 0

            // ⚙️ Déterminer le statut à afficher (auto-mis à jour)
            let displayStatus = u.statut
            if (isExpired && (u.statut === "payé" || u.statut === "en cours")) {
              displayStatus = "non payé"
            }

            // 🎨 Couleur du badge
            const statutColor =
              displayStatus === "payé"
                ? "bg-green-100 text-green-700"
                : displayStatus === "en cours"
                  ? "bg-yellow-100 text-yellow-700"
                  : "bg-red-100 text-red-700"

            return (
              <tr key={u._id} className="border-b hover:bg-gray-50 transition">
                {/* 🖼️ Photo */}
                <td className="p-2 text-center">
                  {u.photo ? (
                    <div className="relative inline-block group">
                      <img
                        src={u.photo}
                        alt="avatar"
                        className="h-10 w-10 rounded-full object-cover border shadow-sm 
                                     transition-transform duration-300 ease-out group-hover:scale-150 group-hover:shadow-lg"
                      />
                    </div>
                  ) : (
                    <div className="h-10 w-10 bg-gray-200 rounded-full mx-auto" />
                  )}
                </td>

                <td className="font-medium">{u.nom}</td>
                <td>{u.prenom}</td>
                <td>{u.phone}</td>
                <td>{formatDate(u.dateDebut)}</td>
                <td>{formatDate(u.dateFin)}</td>

                {/* 📅 Jours restants */}
                <td>
                  {days === null ? (
                    "—"
                  ) : isExpired ? (
                    <span className="flex items-center gap-1 text-red-600 font-medium">
                      <Clock size={14} /> Expiré
                    </span>
                  ) : (
                    <span className="flex items-center gap-1 text-gray-700">
                      <Clock size={14} /> {days} j
                    </span>
                  )}
                </td>

                {/* 🏷️ Statut auto */}
                <td>
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-semibold ${statutColor}`}
                  >
                    {displayStatus}
                  </span>
                </td>

                {/* ✏️ / 🗑️ Actions */}
                <td className="text-center">
                  <div className="flex justify-center gap-3">
                    <button
                      onClick={() => onEdit(u)}
                      className="text-blue-600 hover:text-blue-800 transition-transform hover:scale-110"
                    >
                      <Pencil size={18} />
                    </button>
                    <button
                      onClick={() => onDelete(u._id)}
                      className="text-red-600 hover:text-red-800 transition-transform hover:scale-110"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </td>
              </tr>
            )
          })
        ) : (
          <tr>
            <td colSpan="9" className="text-center py-6 text-gray-400">
              Aucun utilisateur trouvé
            </td>
          </tr>
        )}
      </tbody>
    </table>

      {/* === Pagination === */ }
  {
    totalPages > 1 && (
      <div className="flex items-center justify-between px-6 py-4 border-t bg-gray-50">
        <p className="text-sm text-gray-600">
          Page <span className="font-semibold">{currentPage}</span> sur{" "}
          <span className="font-semibold">{totalPages}</span>
        </p>

        <div className="flex gap-2">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className={`px-3 py-1 rounded-md border ${currentPage === 1
              ? "bg-gray-100 text-gray-400 cursor-not-allowed"
              : "bg-white hover:bg-blue-50 text-blue-600 border-gray-200"
              }`}
          >
            ← Précédent
          </button>

          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <button
              key={page}
              onClick={() => handlePageChange(page)}
              className={`px-3 py-1 rounded-md border transition ${currentPage === page
                ? "bg-blue-600 text-white border-blue-600"
                : "bg-white hover:bg-blue-50 text-blue-600 border-gray-200"
                }`}
            >
              {page}
            </button>
          ))}

          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className={`px-3 py-1 rounded-md border ${currentPage === totalPages
              ? "bg-gray-100 text-gray-400 cursor-not-allowed"
              : "bg-white hover:bg-blue-50 text-blue-600 border-gray-200"
              }`}
          >
            Suivant →
          </button>
        </div>
      </div>
    )
  }
    </div >
  )
}
