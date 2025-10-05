'use client'
import { Card, CardContent } from "@/components/ui/card"

export default function DashboardPage() {
  return (
    <div className="grid grid-cols-3 gap-6">
      <Card>
        <CardContent className="p-6">
          <h3 className="text-gray-600 text-sm">Membres actifs</h3>
          <p className="text-3xl font-bold text-gym-primary">128</p>
        </CardContent>
      </Card>
      <Card>
        <CardContent className="p-6">
          <h3 className="text-gray-600 text-sm">Nouvelles inscriptions</h3>
          <p className="text-3xl font-bold text-gym-primary">24</p>
        </CardContent>
      </Card>
      <Card>
        <CardContent className="p-6">
          <h3 className="text-gray-600 text-sm">Revenus mensuels</h3>
          <p className="text-3xl font-bold text-gym-primary">2,340 DT</p>
        </CardContent>
      </Card>
    </div>
  )
}
