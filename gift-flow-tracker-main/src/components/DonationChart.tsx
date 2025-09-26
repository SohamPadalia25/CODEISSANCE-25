import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const monthlyData = [
  { month: 'Jan', donations: 2, impact: 8 },
  { month: 'Feb', donations: 3, impact: 12 },
  { month: 'Mar', donations: 1, impact: 4 },
  { month: 'Apr', donations: 4, impact: 16 },
  { month: 'May', donations: 2, impact: 8 },
  { month: 'Jun', donations: 3, impact: 12 },
];

export function DonationChart() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Donation Impact</CardTitle>
        <CardDescription>
          Your monthly donation history and lives impacted
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={monthlyData}>
              <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
              <XAxis 
                dataKey="month" 
                tick={{ fontSize: 12 }}
                className="fill-muted-foreground"
              />
              <YAxis 
                tick={{ fontSize: 12 }}
                className="fill-muted-foreground"
              />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'hsl(var(--card))',
                  border: '1px solid hsl(var(--border))',
                  borderRadius: '8px'
                }}
              />
              <Bar 
                dataKey="donations" 
                fill="hsl(var(--primary))"
                name="Donations"
                radius={[4, 4, 0, 0]}
              />
              <Bar 
                dataKey="impact" 
                fill="hsl(var(--success))"
                name="Lives Impacted"
                radius={[4, 4, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}