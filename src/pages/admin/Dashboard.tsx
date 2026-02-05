import { AdminLayout } from "@/components/admin/AdminLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ShoppingCart, DollarSign, Package, Clock, Loader2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { useDashboardStats } from "@/hooks/useDashboardStats";
import { useOrders } from "@/hooks/useOrders";

export default function Dashboard() {
  const { data: stats, isLoading: statsLoading } = useDashboardStats();
  const { orders } = useOrders();
  
  const recentOrders = orders.slice(0, 10);

  const statCards = [
    {
      title: "Total Orders",
      value: stats?.totalOrders || 0,
      icon: ShoppingCart,
      color: "text-blue-500",
    },
    {
      title: "Pending Orders",
      value: stats?.pendingOrders || 0,
      icon: Clock,
      color: "text-orange-500",
    },
    {
      title: "Total Revenue",
      value: `$${(stats?.revenue || 0).toFixed(2)}`,
      icon: DollarSign,
      color: "text-green-500",
    },
    {
      title: "Total Products",
      value: stats?.products || 0,
      icon: Package,
      color: "text-purple-500",
    },
  ];

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
          <p className="text-muted-foreground">Welcome to your admin panel</p>
        </div>

        {statsLoading ? (
          <div className="flex justify-center items-center h-64">
            <Loader2 className="h-8 w-8 animate-spin" />
          </div>
        ) : (
          <>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              {statCards.map((stat) => {
                const Icon = stat.icon;
                return (
                  <Card key={stat.title} className="hover-lift">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
                      <Icon className={`h-5 w-5 ${stat.color}`} />
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">{stat.value}</div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Recent Orders</CardTitle>
              </CardHeader>
              <CardContent>
                {recentOrders.length === 0 ? (
                  <p className="text-center text-muted-foreground py-8">No orders yet</p>
                ) : (
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Customer</TableHead>
                        <TableHead>Email</TableHead>
                        <TableHead>Phone</TableHead>
                        <TableHead>Amount</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Date</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {recentOrders.map((order) => (
                        <TableRow key={order.id}>
                          <TableCell className="font-medium">{order.customer_name}</TableCell>
                          <TableCell>{order.customer_email}</TableCell>
                          <TableCell>{order.customer_phone}</TableCell>
                          <TableCell>${Number(order.total_amount).toFixed(2)}</TableCell>
                          <TableCell>
                            <Badge
                              variant={
                                order.status === 'pending' ? 'default' :
                                order.status === 'confirmed' ? 'secondary' :
                                order.status === 'completed' ? 'outline' : 'destructive'
                              }
                            >
                              {order.status}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            {new Date(order.created_at).toLocaleDateString()}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                )}
              </CardContent>
            </Card>
          </>
        )}
      </div>
    </AdminLayout>
  );
}
