"use client";
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogClose } from "@/components/ui/dialog";
import { Loader2, Inbox, Star, ArrowLeft, CheckCircle, Truck, Clock, Package } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useToast } from "@/hooks/use-toast";

const initialOrders = [
  {
    id: "#12345",
    product: "Smart Watch Pro",
    price: 279.99,
    status: "delivered",
    date: "2024-01-15",
    image: "/placeholder.svg?height=80&width=80",
    rating: 5,
  },
  {
    id: "#12346",
    product: "Wireless Gaming Headset",
    price: 139.99,
    status: "shipped",
    date: "2024-01-18",
    image: "/placeholder.svg?height=80&width=80",
    rating: null,
  },
  {
    id: "#12347",
    product: "Smart Home Hub",
    price: 199.99,
    status: "processing",
    date: "2024-01-20",
    image: "/placeholder.svg?height=80&width=80",
    rating: null,
  },
];

export default function OrdersPage() {
  const [orders, setOrders] = useState(initialOrders);
  const [orderSearch, setOrderSearch] = useState("");
  const [orderStatusFilter, setOrderStatusFilter] = useState("all");
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [isOrderDialogOpen, setIsOrderDialogOpen] = useState(false);
  const [isRatingDialogOpen, setIsRatingDialogOpen] = useState(false);
  const [ratingOrder, setRatingOrder] = useState(null);
  const [ratingValue, setRatingValue] = useState(0);
  const [ratingComment, setRatingComment] = useState("");
  const { toast } = useToast();

  const [ordersLoading, setOrdersLoading] = useState(false);
  const [ordersError, setOrdersError] = useState("");
  useEffect(() => {
    setOrdersLoading(true);
    setTimeout(() => {
      if (Math.random() < 0.1) setOrdersError("Failed to load orders. Please try again.");
      setOrdersLoading(false);
    }, 800);
  }, []);

  const filteredOrders = orders.filter(order => {
    const matchesSearch =
      order.product.toLowerCase().includes(orderSearch.toLowerCase()) ||
      order.id.toLowerCase().includes(orderSearch.toLowerCase());
    const matchesStatus =
      orderStatusFilter === "all" || order.status.toLowerCase() === orderStatusFilter;
    return matchesSearch && matchesStatus;
  });

  // Order summary analytics
  const totalOrders = orders.length;
  const deliveredOrders = orders.filter(o => o.status.toLowerCase() === "delivered").length;
  const shippedOrders = orders.filter(o => o.status.toLowerCase() === "shipped").length;
  const processingOrders = orders.filter(o => o.status.toLowerCase() === "processing").length;
  const summary = [
    { label: "Total", value: totalOrders, color: "bg-orange-500" },
    { label: "Delivered", value: deliveredOrders, color: "bg-emerald-500" },
    { label: "Shipped", value: shippedOrders, color: "bg-blue-500" },
    { label: "Processing", value: processingOrders, color: "bg-yellow-400" },
  ];
  const statusPills = [
    { key: "all", label: "All" },
    { key: "delivered", label: "Delivered" },
    { key: "shipped", label: "Shipped" },
    { key: "processing", label: "Processing" },
  ];

  // Pagination state
  const ORDERS_PER_PAGE = 5;
  const [page, setPage] = useState(1);
  const totalPages = Math.ceil(filteredOrders.length / ORDERS_PER_PAGE);
  // Sorting state
  const [sortKey, setSortKey] = useState("date");
  const [sortDir, setSortDir] = useState("desc");
  // Order notes state
  const [orderNotes, setOrderNotes] = useState({});
  const [noteInput, setNoteInput] = useState("");
  const [isInvoiceOpen, setIsInvoiceOpen] = useState(false);
  const [invoiceOrder, setInvoiceOrder] = useState(null);
  // Status badge icons
  const statusIcon = status => {
    switch (status.toLowerCase()) {
      case "delivered": return <CheckCircle className="w-4 h-4 mr-1 text-emerald-500" />;
      case "shipped": return <Truck className="w-4 h-4 mr-1 text-blue-500" />;
      case "processing": return <Clock className="w-4 h-4 mr-1 text-yellow-500" />;
      default: return <Package className="w-4 h-4 mr-1 text-gray-400" />;
    }
  };

  // Sorting logic
  const sortedOrders = [...filteredOrders].sort((a, b) => {
    if (sortKey === "date") {
      return sortDir === "desc"
        ? new Date(b.date).getTime() - new Date(a.date).getTime()
        : new Date(a.date).getTime() - new Date(b.date).getTime();
    }
    if (sortKey === "price") {
      return sortDir === "desc" ? b.price - a.price : a.price - b.price;
    }
    return 0;
  });
  const paginatedOrders = sortedOrders.slice((page - 1) * ORDERS_PER_PAGE, page * ORDERS_PER_PAGE);

  // Add state for PDF export loading:
  const [isExportingPDF, setIsExportingPDF] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-primary py-8">
      <div className="container-responsive max-w-5xl mx-auto">
        {/* Header with Back Button */}
        <div className="flex items-center justify-between mb-8 flex-wrap gap-4">
          <div className="flex items-center gap-4">
            <Link href="/customer/dashboard">
              <Button variant="ghost" size="icon" className="rounded-full border border-orange-200 shadow hover:bg-orange-50">
                <ArrowLeft className="w-5 h-5 text-orange-600" />
                <span className="sr-only">Back to Dashboard</span>
              </Button>
            </Link>
            <h1 className="text-3xl font-extrabold text-orange-700 tracking-tight">My Orders</h1>
          </div>
          <div className="flex flex-col md:flex-row md:items-center gap-2">
            {/* Filter Pills */}
            <div className="flex gap-2 mb-2 md:mb-0">
              {statusPills.map(pill => (
                <Button
                  key={pill.key}
                  variant={orderStatusFilter === pill.key ? "default" : "outline"}
                  className={`rounded-full px-4 py-1 text-sm ${orderStatusFilter === pill.key ? "bg-orange-500 text-white" : ""}`}
                  onClick={() => { setOrderStatusFilter(pill.key); setPage(1); }}
                >
                  {pill.label}
                </Button>
              ))}
            </div>
            <Input
              placeholder="Search orders..."
              className="w-64 input-enhanced"
              value={orderSearch}
              onChange={e => { setOrderSearch(e.target.value); setPage(1); }}
            />
          </div>
        </div>
        {/* Order Summary Analytics Bar */}
        <div className="flex gap-4 mb-6 flex-wrap">
          {summary.map(s => (
            <div key={s.label} className={`flex flex-col items-center px-4 py-2 rounded-lg shadow-sm ${s.color} text-white min-w-[90px]`}>
              <span className="text-lg font-bold">{s.value}</span>
              <span className="text-xs uppercase tracking-wider">{s.label}</span>
            </div>
          ))}
        </div>
        <Card className="bg-white/95 dark:bg-gray-800/95 shadow-2xl border-0">
          <CardContent className="p-0">
            {ordersLoading ? (
              <div className="flex flex-col items-center justify-center py-12 text-gray-400">
                <Loader2 className="w-8 h-8 animate-spin mb-2" />
                <div>Loading orders...</div>
              </div>
            ) : ordersError ? (
              <div className="flex flex-col items-center justify-center py-12 text-red-400">
                <Inbox className="w-12 h-12 mb-2" />
                <div className="font-semibold text-lg">{ordersError}</div>
                <div className="text-sm">Please refresh the page or try again later.</div>
              </div>
            ) : filteredOrders.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-12 text-gray-400">
                <Inbox className="w-12 h-12 mb-2" />
                <div className="font-semibold text-lg">No orders found</div>
                <div className="text-sm">Try adjusting your search or filter.</div>
              </div>
            ) : (
              <div className="overflow-x-auto">
                {/* Sorting controls */}
                <div className="flex gap-2 items-center mb-4">
                  <span className="text-sm font-medium">Sort by:</span>
                  <Button size="sm" variant={sortKey === "date" ? "default" : "outline"} onClick={() => setSortKey("date")}>Date</Button>
                  <Button size="sm" variant={sortKey === "price" ? "default" : "outline"} onClick={() => setSortKey("price")}>Price</Button>
                  <Button size="sm" variant="ghost" onClick={() => setSortDir(d => d === "desc" ? "asc" : "desc")}>{sortDir === "desc" ? "↓" : "↑"}</Button>
                </div>
                <table className="min-w-full divide-y divide-orange-100 dark:divide-gray-700">
                  <thead className="bg-orange-50 dark:bg-gray-800">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-bold text-orange-700 dark:text-orange-200 uppercase tracking-wider">Product</th>
                      <th className="px-6 py-3 text-left text-xs font-bold text-orange-700 dark:text-orange-200 uppercase tracking-wider">Price</th>
                      <th className="px-6 py-3 text-left text-xs font-bold text-orange-700 dark:text-orange-200 uppercase tracking-wider">Date</th>
                      <th className="px-6 py-3 text-left text-xs font-bold text-orange-700 dark:text-orange-200 uppercase tracking-wider">Status</th>
                      <th className="px-6 py-3 text-right text-xs font-bold text-orange-700 dark:text-orange-200 uppercase tracking-wider">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white dark:bg-gray-800 divide-y divide-orange-100 dark:divide-gray-700">
                    {paginatedOrders.map((order) => (
                      <tr key={order.id} className="hover:bg-orange-50 dark:hover:bg-orange-900/10 transition">
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white font-semibold flex items-center gap-2">
                          <Image src={order.image} alt={order.product} width={40} height={40} className="rounded object-cover border border-orange-100" />
                          {order.product}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">${order.price}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 dark:text-gray-300">{order.date}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                          <Badge variant={order.status === "delivered" ? "default" : order.status === "shipped" ? "secondary" : "outline"} className="capitalize flex items-center gap-2">
                            {statusIcon(order.status)}
                            {order.status}
                          </Badge>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                          <Button variant="outline" size="sm" className="mr-2" onClick={() => { setSelectedOrder(order); setIsOrderDialogOpen(true); }}>View Order</Button>
                          <Button
                            variant="outline"
                            size="sm"
                            className="mr-2"
                            onClick={() => {
                              setInvoiceOrder(order);
                              setIsInvoiceOpen(true);
                            }}
                          >
                            Invoice
                          </Button>
                          {order.rating ? (
                            <div className="flex items-center justify-end text-amber-500">
                              {[...Array(order.rating)].map((_, i) => <Star key={i} className="w-4 h-4 fill-current" />)}
                            </div>
                          ) : order.status.toLowerCase() === "delivered" ? (
                            <Button variant="default" size="sm" className="btn-primary" onClick={() => { setRatingOrder(order); setIsRatingDialogOpen(true); }}>Rate</Button>
                          ) : null}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
            {/* Pagination controls below table */}
            {totalPages > 1 && (
              <div className="flex justify-center items-center gap-2 py-4">
                <Button size="sm" variant="outline" disabled={page === 1} onClick={() => setPage(page - 1)}>Previous</Button>
                <span className="text-sm font-medium">Page {page} of {totalPages}</span>
                <Button size="sm" variant="outline" disabled={page === totalPages} onClick={() => setPage(page + 1)}>Next</Button>
              </div>
            )}
            {/* Order Details Dialog with stepper */}
            <Dialog open={isOrderDialogOpen} onOpenChange={setIsOrderDialogOpen}>
              <DialogContent className="max-w-lg">
                <DialogHeader>
                  <DialogTitle>Order Details</DialogTitle>
                  <DialogDescription>
                    {selectedOrder ? (
                      <div className="space-y-2 mt-2">
                        <div className="flex items-center gap-4">
                          <Image src={selectedOrder.image} alt={selectedOrder.product} width={60} height={60} className="rounded-lg object-cover" />
                          <div>
                            <div className="font-semibold text-lg">{selectedOrder.product}</div>
                            <div className="text-sm text-gray-500">Order ID: {selectedOrder.id}</div>
                          </div>
                        </div>
                        {/* Order Tracking Stepper */}
                        <div className="flex flex-col gap-4 mt-4">
                          <div className="border-l-2 border-orange-300 pl-6 relative">
                            {['Ordered', 'Shipped', 'Out for Delivery', 'Delivered'].map((step, idx) => {
                              const statusIdx = ['ordered', 'shipped', 'out for delivery', 'delivered'].indexOf(selectedOrder.status.toLowerCase());
                              const isActive = idx <= statusIdx;
                              return (
                                <div key={step} className="mb-6 last:mb-0 flex items-center gap-2 relative">
                                  <div className={`absolute -left-7 w-5 h-5 rounded-full flex items-center justify-center font-bold text-white ${isActive ? 'bg-orange-500' : 'bg-gray-300 dark:bg-gray-700'}`}>{idx + 1}</div>
                                  <div>
                                    <div className={`text-sm font-semibold ${isActive ? 'text-orange-600' : 'text-gray-400'}`}>{step}</div>
                                    <div className="text-xs text-gray-400">{isActive ? `2024-01-1${idx + 5}` : ""}</div>
                                  </div>
                                </div>
                              );
                            })}
                          </div>
                        </div>
                        <div className="flex gap-4 mt-2">
                          <div className="text-sm">Price: <span className="font-bold">${selectedOrder.price}</span></div>
                          <div className="text-sm">Status: <Badge variant={selectedOrder.status === "delivered" ? "default" : selectedOrder.status === "shipped" ? "secondary" : "outline"}>{selectedOrder.status}</Badge></div>
                        </div>
                        <div className="text-sm text-gray-500">Order Date: {selectedOrder.date}</div>
                        <div className="text-sm text-gray-500">Shipping Address: 123 Smart St, Accra</div>
                        <div className="text-sm text-gray-500">Payment Method: Credit Card</div>
                        <div className="flex gap-2 mt-4">
                          <Button className="btn-primary flex-1" onClick={() => toast({ title: "Reorder", description: `Reordered ${selectedOrder.product} (Simulated)` })}>Reorder</Button>
                          <Button variant="outline" className="flex-1" onClick={() => toast({ title: "Support Contacted", description: `Support contacted for ${selectedOrder.product} (Simulated)` })}>Contact Support</Button>
                        </div>
                        {/* Order Notes */}
                        <div className="mt-6">
                          <h4 className="font-semibold mb-2">Order Notes</h4>
                          <div className="flex gap-2 mb-2">
                            <Input
                              placeholder="Add a note..."
                              value={noteInput}
                              onChange={e => setNoteInput(e.target.value)}
                              className="flex-1"
                            />
                            <Button
                              size="sm"
                              onClick={() => {
                                if (!selectedOrder) return;
                                setOrderNotes(notes => ({ ...notes, [selectedOrder.id]: [...(notes[selectedOrder.id] || []), noteInput] }));
                                setNoteInput("");
                              }}
                              disabled={!noteInput.trim()}
                            >Add</Button>
                          </div>
                          <ul className="list-disc pl-6 text-sm text-gray-700 dark:text-gray-300">
                            {(orderNotes[selectedOrder?.id] || []).map((note, idx) => (
                              <li key={idx}>{note}</li>
                            ))}
                            {!(orderNotes[selectedOrder?.id] || []).length && <li className="text-gray-400 italic">No notes yet.</li>}
                          </ul>
                        </div>
                      </div>
                    ) : (
                      <span>No order selected.</span>
                    )}
                  </DialogDescription>
                </DialogHeader>
                <DialogClose asChild>
                  <Button variant="outline" className="mt-4 w-full">Close</Button>
                </DialogClose>
              </DialogContent>
            </Dialog>
            {/* Rating Modal */}
            <Dialog open={isRatingDialogOpen} onOpenChange={setIsRatingDialogOpen}>
              <DialogContent className="max-w-md">
                <DialogHeader>
                  <DialogTitle>Rate Your Order</DialogTitle>
                  <DialogDescription>
                    {ratingOrder && (
                      <div className="space-y-2 mt-2">
                        <div className="font-semibold">{ratingOrder.product}</div>
                        <div className="flex gap-1 mt-2">
                          {[1,2,3,4,5].map(star => (
                            <Star
                              key={star}
                              className={`w-6 h-6 cursor-pointer ${star <= ratingValue ? 'fill-amber-400 text-amber-400' : 'text-gray-300'}`}
                              onClick={() => setRatingValue(star)}
                              fill={star <= ratingValue ? 'currentColor' : 'none'}
                            />
                          ))}
                        </div>
                        <textarea
                          className="w-full mt-3 p-2 border rounded text-sm"
                          rows={3}
                          placeholder="Leave a comment (optional)"
                          value={ratingComment}
                          onChange={e => setRatingComment(e.target.value)}
                        />
                      </div>
                    )}
                  </DialogDescription>
                </DialogHeader>
                <div className="flex gap-2 mt-4">
                  <Button
                    className="btn-primary flex-1"
                    disabled={ratingValue === 0}
                    onClick={() => {
                      if (!ratingOrder) return;
                      setOrders(orders => orders.map(o => o.id === ratingOrder.id ? { ...o, rating: ratingValue, ratingComment } : o));
                      setIsRatingDialogOpen(false);
                      setRatingValue(0);
                      setRatingComment("");
                      toast({
                        title: "Thank you for your feedback!",
                        description: `You rated ${ratingOrder.product} ${ratingValue} star${ratingValue > 1 ? 's' : ''}.`,
                      });
                    }}
                  >Submit</Button>
                  <DialogClose asChild>
                    <Button variant="outline" className="flex-1">Cancel</Button>
                  </DialogClose>
                </div>
              </DialogContent>
            </Dialog>
            {/* Invoice Modal */}
            <Dialog open={isInvoiceOpen} onOpenChange={setIsInvoiceOpen}>
              <DialogContent className="max-w-2xl p-0 overflow-hidden">
                <div id="invoice-content" className="bg-white dark:bg-gray-900 p-8 print:p-0 rounded-xl shadow-lg border border-orange-100">
                  {/* Header */}
                  <div className="flex items-center justify-between border-b pb-4 mb-6">
                    <div className="flex items-center gap-3">
                      <Image src="/placeholder-logo.svg" alt="SmartShop Logo" width={48} height={48} className="rounded" />
                      <div>
                        <div className="text-2xl font-extrabold text-orange-600 tracking-tight">SmartShop</div>
                        <div className="text-xs text-gray-400">www.smartshop.com</div>
                      </div>
                    </div>
                    <div className="text-right text-xs text-gray-500">
                      <div className="font-bold text-lg text-orange-700">INVOICE</div>
                      <div>Date: {new Date().toLocaleDateString()}</div>
                      <div>Invoice #: {invoiceOrder?.id}</div>
                    </div>
                  </div>
                  {/* Info Row */}
                  <div className="flex flex-col md:flex-row md:justify-between gap-8 mb-8">
                    <div>
                      <div className="font-semibold mb-1 text-gray-800 dark:text-gray-200">Billed To:</div>
                      <div className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
                        John Doe<br />123 Smart St<br />Accra<br />johndoe@email.com
                      </div>
                    </div>
                    <div>
                      <div className="font-semibold mb-1 text-gray-800 dark:text-gray-200">Order Info:</div>
                      <div className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
                        <div>Order ID: <span className="font-mono">{invoiceOrder?.id}</span></div>
                        <div>Status: <span className="capitalize font-semibold">{invoiceOrder?.status}</span></div>
                        <div>Order Date: {invoiceOrder?.date}</div>
                        <div>Payment: Credit Card</div>
                      </div>
                    </div>
                  </div>
                  {/* Product Table */}
                  <div className="mb-6">
                    <table className="w-full text-sm border-t border-b border-gray-200 dark:border-gray-700 mb-4">
                      <thead>
                        <tr className="bg-orange-50 dark:bg-orange-900/10">
                          <th className="py-3 px-4 text-left font-bold text-orange-700">Item</th>
                          <th className="py-3 px-4 text-left font-bold text-orange-700">Image</th>
                          <th className="py-3 px-4 text-right font-bold text-orange-700">Price</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td className="py-3 px-4 font-semibold">{invoiceOrder?.product}</td>
                          <td className="py-3 px-4">
                            {invoiceOrder?.image ? (
                              <Image src={invoiceOrder.image} alt={invoiceOrder.product || "Product"} width={60} height={60} className="rounded border" />
                            ) : (
                              <div className="w-[60px] h-[60px] bg-gray-100 flex items-center justify-center text-gray-400">No Image</div>
                            )}
                          </td>
                          <td className="py-3 px-4 text-right font-bold text-gray-900 dark:text-white">${invoiceOrder?.price}</td>
                        </tr>
                      </tbody>
                    </table>
                    <div className="flex justify-end">
                      <div className="w-full md:w-1/2">
                        <div className="flex justify-between py-1">
                          <span className="font-semibold">Subtotal:</span>
                          <span>${invoiceOrder?.price}</span>
                        </div>
                        <div className="flex justify-between py-1">
                          <span className="font-semibold">Shipping:</span>
                          <span>$0.00</span>
                        </div>
                        <div className="flex justify-between py-1 border-t mt-2 pt-2">
                          <span className="font-bold text-orange-600">Total:</span>
                          <span className="font-bold text-orange-600">${invoiceOrder?.price}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* Footer */}
                  <div className="mt-8 border-t pt-4 text-xs text-gray-400 flex flex-col md:flex-row md:justify-between gap-2">
                    <div>Thank you for shopping with <span className="font-bold text-orange-600">SmartShop</span>!</div>
                    <div>Contact: support@smartshop.com | +233 123 456 789</div>
                  </div>
                </div>
                <div className="flex gap-2 mt-6 print:hidden">
                  <Button className="btn-primary flex-1" disabled={isExportingPDF} onClick={async () => {
                    setIsExportingPDF(true);
                    try {
                      const html2pdf = (await import("html2pdf.js")).default;
                      const element = document.getElementById("invoice-content");
                      if (!element) throw new Error("Invoice content not found");
                      await html2pdf().set({
                        margin: 0.5,
                        filename: `Invoice_${invoiceOrder?.id || "order"}.pdf`,
                        html2canvas: { scale: 2 },
                        jsPDF: { unit: "in", format: "a4", orientation: "portrait" }
                      }).from(element).save();
                    } catch (err) {
                      alert("Failed to export PDF. Please try again.");
                    } finally {
                      setIsExportingPDF(false);
                    }
                  }}>
                    {isExportingPDF ? "Exporting..." : "Download PDF"}
                  </Button>
                  <DialogClose asChild>
                    <Button variant="outline" className="flex-1">Close</Button>
                  </DialogClose>
                </div>
              </DialogContent>
            </Dialog>
          </CardContent>
        </Card>
      </div>
    </div>
  );
} 