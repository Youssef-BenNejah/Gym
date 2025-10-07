'use client'
import { useEffect, useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { getDashboardStats } from "@/services/usersService"
import { Users, CheckCircle, Clock, XCircle } from "lucide-react"
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend
} from "recharts"


export default function DashboardPage() {
  const [stats, setStats] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const data = await getDashboardStats()
        setStats(data)
      } catch (err) {
        console.error("Erreur Dashboard:", err)
      } finally {
        setLoading(false)
      }
    }
    fetchStats()
  }, [])

  if (loading) {
    return <div className="p-10 text-center text-gray-500">Chargement du tableau de bord...</div>
  }

  const chartData = stats.labels.map((label, index) => ({
    name: label,
    Inscriptions: stats.inscritsParMois[index],
  }))

  return (
    
    <div className="p-6">
      <h1 className="text-3xl font-extrabold text-slate-800 mb-6">📊 Tableau de bord</h1>

      {/* === 4 Cartes principales === */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        <Card className="border border-gray-100 shadow-md hover:shadow-lg transition bg-gradient-to-br from-slate-50 to-white">
          <CardContent className="p-6 flex items-center justify-between">
            <div>
              <h3 className="text-gray-600 text-sm">Tous les membres</h3>
              <p className="text-3xl font-bold text-slate-700">{stats.total}</p>
            </div>
            <Users size={42} className="text-slate-500" />
          </CardContent>
        </Card>

        <Card className="border border-green-100 shadow-md hover:shadow-lg transition bg-gradient-to-br from-green-50 to-white">
          <CardContent className="p-6 flex items-center justify-between">
            <div>
              <h3 className="text-gray-600 text-sm">Membres payés</h3>
              <p className="text-3xl font-bold text-green-600">{stats.payes}</p>
            </div>
            <CheckCircle size={42} className="text-green-500" />
          </CardContent>
        </Card>

        <Card className="border border-yellow-100 shadow-md hover:shadow-lg transition bg-gradient-to-br from-yellow-50 to-white">
          <CardContent className="p-6 flex items-center justify-between">
            <div>
              <h3 className="text-gray-600 text-sm">Membres en cours</h3>
              <p className="text-3xl font-bold text-yellow-600">{stats.enCours}</p>
            </div>
            <Clock size={42} className="text-yellow-500" />
          </CardContent>
        </Card>

        <Card className="border border-red-100 shadow-md hover:shadow-lg transition bg-gradient-to-br from-red-50 to-white">
          <CardContent className="p-6 flex items-center justify-between">
            <div>
              <h3 className="text-gray-600 text-sm">Membres non payés</h3>
              <p className="text-3xl font-bold text-red-600">{stats.nonPayes}</p>
            </div>
            <XCircle size={42} className="text-red-500" />
          </CardContent>
        </Card>
      </div>

      {/* === Graphique Inscriptions par Mois === */}
      <Card className="border border-blue-100 shadow-md">
        <CardContent className="p-6">
          <h3 className="text-lg font-semibold text-slate-700 mb-4">📈 Nouvelles inscriptions par mois</h3>
          <div className="w-full h-80">
            <ResponsiveContainer>
              <LineChart data={chartData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" stroke="#555" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="Inscriptions"
                  stroke="#2563eb"
                  strokeWidth={3}
                  dot={{ r: 4 }}
                  activeDot={{ r: 6 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </div>
    
  )
}
