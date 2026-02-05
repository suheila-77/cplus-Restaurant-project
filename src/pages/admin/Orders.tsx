import { useEffect, useState } from "react";
import { AdminLayout } from "@/components/admin/AdminLayout";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Phone, Mail, Eye } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useOrders } from "@/hooks/useOrders";

export default function Orders() {
  const { orders, isLoading, updateOrderStatus } = useOrders();
  const [filteredOrders, setFilteredOrders] = useState<any[]>([]);
  const [statusFilter, setStatusFilter] = useState("all");
  const [selectedOrder, setSelectedOrder] = useState<any>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  useEffect(() => {
    filterOrders();
  }, [orders, statusFilter]);

  const filterOrders = () => {
    if (statusFilter === "all") {
      setFilteredOrders(orders);
    } else {
      setFilteredOrders(orders.filter(o => o.status === statusFilter));
    }
  };

  const handleStatusUpdate = (orderId: string, newStatus: string) => {
    updateOrderStatus.mutate({ id: orderId, status: newStatus });
  };

  const viewOrderDetails = (order: any) => {
    setSelectedOrder(order);
    setIsDialogOpen(true);
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Orders</h1>
            <p className="text-muted-foreground">Manage customer orders</p>
          </div>
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-[180px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Orders</SelectItem>
              <SelectItem value="pending">Pending</SelectItem>
              <SelectItem value="confirmed">Confirmed</SelectItem>
              <SelectItem value="completed">Completed</SelectItem>
              <SelectItem value="cancelled">Cancelled</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="border rounded-lg">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Customer</TableHead>
                <TableHead>Contact</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Date</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {isLoading ? (
                <TableRow>
                  <TableCell colSpan={6} className="text-center py-8">
                    Loading...
                  </TableCell>
                </TableRow>
              ) : filteredOrders.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} className="text-center py-8">
                    No orders found
                  </TableCell>
                </TableRow>
              ) : (
                filteredOrders.map((order) => (
                  <TableRow key={order.id}>
                    <TableCell className="font-medium">{order.customer_name}</TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                        <a href={`tel:${order.customer_phone}`}>
                          <Button variant="ghost" size="sm">
                            <Phone className="h-4 w-4" />
                          </Button>
                        </a>
                        <a href={`mailto:${order.customer_email}`}>
                          <Button variant="ghost" size="sm">
                            <Mail className="h-4 w-4" />
                          </Button>
                        </a>
                      </div>
                    </TableCell>
                    <TableCell>${Number(order.total_amount).toFixed(2)}</TableCell>
                    <TableCell>
                      <Select
                        value={order.status}
                        onValueChange={(value) => handleStatusUpdate(order.id, value)}
                      >
                        <SelectTrigger className="w-[130px]">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="pending">Pending</SelectItem>
                          <SelectItem value="confirmed">Confirmed</SelectItem>
                          <SelectItem value="completed">Completed</SelectItem>
                          <SelectItem value="cancelled">Cancelled</SelectItem>
                        </SelectContent>
                      </Select>
                    </TableCell>
                    <TableCell>
                      {new Date(order.created_at).toLocaleDateString()}
                    </TableCell>
                    <TableCell className="text-right">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => viewOrderDetails(order)}
                      >
                        <Eye className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </div>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Order Details</DialogTitle>
            <DialogDescription>
              View complete order information
            </DialogDescription>
          </DialogHeader>
          {selectedOrder && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm font-medium">Customer Name</p>
                  <p className="text-sm text-muted-foreground">{selectedOrder.customer_name}</p>
                </div>
                <div>
                  <p className="text-sm font-medium">Email</p>
                  <p className="text-sm text-muted-foreground">{selectedOrder.customer_email}</p>
                </div>
                <div>
                  <p className="text-sm font-medium">Phone</p>
                  <p className="text-sm text-muted-foreground">{selectedOrder.customer_phone}</p>
                </div>
                <div>
                  <p className="text-sm font-medium">Status</p>
                  <Badge>{selectedOrder.status}</Badge>
                </div>
              </div>
              <div>
                <p className="text-sm font-medium mb-2">Order Items</p>
                <div className="border rounded-lg p-4 space-y-2">
                  {Array.isArray(selectedOrder.items) && selectedOrder.items.map((item: any, index: number) => (
                    <div key={index} className="flex justify-between">
                      <span>{item.name} x {item.quantity}</span>
                      <span>${(item.price * item.quantity).toFixed(2)}</span>
                    </div>
                  ))}
                  <div className="border-t pt-2 flex justify-between font-bold">
                    <span>Total</span>
                    <span>${Number(selectedOrder.total_amount).toFixed(2)}</span>
                  </div>
                </div>
              </div>
              {selectedOrder.notes && (
                <div>
                  <p className="text-sm font-medium">Notes</p>
                  <p className="text-sm text-muted-foreground">{selectedOrder.notes}</p>
                </div>
              )}
            </div>
          )}
        </DialogContent>
      </Dialog>
    </AdminLayout>
  );
}
