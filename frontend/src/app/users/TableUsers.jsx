'use client'
import { Trash2, Pencil } from "lucide-react"

export default function TableUsers({ users, onEdit, onDelete }) {
  return (
    <div className="overflow-x-auto bg-white rounded-xl shadow-lg border border-gray-100">
      <table className="w-full text-sm text-gray-700">
        <thead className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-left">
          <tr>
            <th className="p-3">Photo</th>
            <th>Nom</th>
            <th>Prénom</th>
            <th>Téléphone</th>
            <th>Début</th>
            <th>Fin</th>
            <th>Statut</th>
            <th className="text-center">Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.length > 0 ? (
            users.map((u) => (
              <tr key={u._id} className="border-b hover:bg-gray-50 transition">
                <td className="p-2">
                  {u.photo ? (
                    <img src={u.photo} className="h-10 w-10 rounded-full object-cover border" />
                  ) : (
                    <div className="h-10 w-10 bg-gray-200 rounded-full" />
                  )}
                </td>
                <td className="font-medium">{u.nom}</td>
                <td>{u.prenom}</td>
                <td>{u.phone}</td>
                <td>{u.dateDebut?.split("T")[0]}</td>
                <td>{u.dateFin?.split("T")[0]}</td>
                <td>
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      u.statut === "payé"
                        ? "bg-green-100 text-green-700"
                        : u.statut === "non payé"
                        ? "bg-red-100 text-red-700"
                        : "bg-yellow-100 text-yellow-700"
                    }`}
                  >
                    {u.statut}
                  </span>
                </td>
                <td className="text-center">
                  <div className="flex justify-center gap-3">
                    <button
                      onClick={() => onEdit(u)}
                      className="text-blue-600 hover:text-blue-800"
                    >
                      <Pencil size={18} />
                    </button>
                    <button
                      onClick={() => onDelete(u._id)}
                      className="text-red-600 hover:text-red-800"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="8" className="text-center py-6 text-gray-400">
                Aucun utilisateur trouvé
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  )
}
