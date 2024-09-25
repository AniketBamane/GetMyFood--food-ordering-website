import Progressing from '@/components/custom/home/Progressing';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import adminStore from '@/store/adminStore';
import { CheckCircle, Edit, Loader2, XCircle, Check } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import { toast } from 'sonner';

const AdminOrder = () => {
  const { getOrders, loading, orders ,updateOrder} = adminStore();
  const [editStatus, setEditingStatus] = useState(false);
  const [editPayment, setEditingPayment] = useState(false);
  const [editingOrder, setEditingOrder] = useState(null); // To track the order being edited
  const [statusEdit, setStatusEdit] = useState("select order status");
  const [paymentEdit, setPaymentEdit] = useState("select payment status");

  const fetchAdminOrders = async () => {
    try {
      await getOrders();
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    fetchAdminOrders();
  }, []);

  // Save changes function
  const handleStatusSave = async(orderId) => {
    const toastId = toast.loading("please wait, updating order status ...")
    try{
      const formData = new FormData()
      formData.append("status",statusEdit)
      await updateOrder(orderId, formData)
    }catch(err){
      toast.error(err.message,{
        id: toastId,
      });
    }finally{
      setTimeout(()=>{
        toast.dismiss(toastId)
      },1000)
      setEditingStatus(false); // Exit edit mode after saving
    }
  };

  const handlePaymentStatus = async(orderId) => {
    const toastId = toast.loading("please wait, updating payment status ...")
    try{
      const formData = new FormData()
      formData.append("payment",paymentEdit)
      await updateOrder(orderId, formData)
    }catch(err){
      toast.error(err.message,{
        id: toastId,
      });
    }finally{
      setTimeout(()=>{
        toast.dismiss(toastId)
      },1000)
      setEditingPayment(false); // Exit edit mode after saving
    }
  };

  return (
    <div className="text-gray-900 min-h-screen">
      <main className="container mx-auto px-4 py-8">
        <section>
          <h2 className="text-3xl font-bold mb-6">My Orders</h2>
          {loading ? (
           <Progressing />
          ) : null}
          {orders.length === 0 ? (
            <Card className="p-6 bg-white shadow-md rounded-lg">
              <p className="text-center">You have no orders yet.</p>
            </Card>
          ) : (
            <div className="space-y-6">
              {orders.map((order) => (
                <Card key={order._id} className="p-6 bg-white shadow-md rounded-lg">
                  <div className="mb-4">
                    <strong>Order ID:</strong> {order._id}
                  </div>

                  {/* Status */}
                  <div className="mb-4 flex space-x-2 items-center">
                    <p><strong>Status:</strong></p>
                    {editingOrder === order._id && editStatus ? (
                      <>
                        <select
                          value={statusEdit}
                          onChange={(e) => setStatusEdit(e.target.value)}
                          className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                          <option value="pending">Pending</option>
                          <option value="in-delivery">In Delivery</option>
                          <option value="completed">Completed</option>
                          <option value="rejected">Rejected</option>
                        </select>
                        <Check className="cursor-pointer" onClick={() => handleStatusSave(order._id)} />
                      </>
                    ) : (
                      <>
                        {order.status === 'completed' ? (
                          <span className="text-green-500"><CheckCircle className="inline" /> {order.status}</span>
                        ) : (
                          <span className="text-red-500"><XCircle className="inline" /> {order.status}</span>
                        )}
                        <Edit className="cursor-pointer" onClick={() => {
                          setEditingOrder(order._id);
                          setEditingStatus(true);
                          setStatusEdit(order.status); // Pre-fill with the current status
                        }}
                        disabled={loading}
                        />
                      </>
                    )}
                  </div>

                  {/* Payment Status */}
                  <div className="mb-4 flex space-x-2 items-center">
                    <p><strong>Payment Status:</strong></p>
                    {editingOrder === order._id && editPayment ? (
                      <>
                        <select
                          value={paymentEdit}
                          onChange={(e) => setPaymentEdit(e.target.value)}
                          className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                          <option value="pending">Pending</option>
                          <option value="paid">Paid</option>
                          <option value="cancelled">Cancelled</option>
                        </select>
                        <Check className="cursor-pointer" onClick={() => handlePaymentStatus(order._id)} />
                      </>
                    ) : (
                      <>
                        <span>{order.payment}</span>
                        <Edit className="cursor-pointer" onClick={() => {
                          setEditingOrder(order._id);
                          setEditingPayment(true);
                          setPaymentEdit(order.payment); // Pre-fill with the current payment status
                        }} 
                        disabled={loading}
                        
                        />
                      </>
                    )}
                  </div>

                  <div className="mb-4">
                    <strong>Delivery Date:</strong> {new Date(order.deliveryDate).toLocaleDateString()}
                  </div>

                  {/* Ordered Items */}
                  <div className="mt-6">
                    <strong>Ordered Items:</strong>
                    <div className="mt-4">
                      {order.items.map((item, index) => (
                        <div key={index} className="flex items-center mb-4">
                          <img
                            src={item.dish.imageUrl}
                            alt={item.dish.name}
                            className="w-16 h-16 object-cover rounded-md mr-4"
                          />
                          <div>
                            <div className="font-semibold">{item.dish.name}</div>
                            <div>Quantity: {item.quantity}</div>
                            <div>Price: ${item.dish.price.toFixed(2)}</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          )}
        </section>
      </main>
    </div>
  );
};

export default AdminOrder;
