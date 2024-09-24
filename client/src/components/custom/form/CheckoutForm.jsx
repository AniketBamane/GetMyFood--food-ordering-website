import { useState } from "react";
import authStore from "@/store/authStore";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";
import orderStore from "@/store/orderStore";

const CheckoutForm = () => {
  const {createOrder,loading:orderLoading} = orderStore()
  const {user,updateProfile,loading} = authStore()
  const [isEditing, setIsEditing] = useState(false);
  const [newAddress, setNewAddress] = useState(user.address);
  const [paymentMethod, setPaymentMethod] = useState("online");

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewAddress((prevAddress) => ({
      ...prevAddress,
      [name]: value,
    }));
  };

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleCheckout = async()=>{
    const toastId = toast.loading("please wait , placing order ...");
    try{
      if(paymentMethod == "online"){
        console.log("in this component",paymentMethod)
       toast.error("online payment is unavailable for now !",{
        id: toastId,
       })
      }else{
        await createOrder()
      }
    }catch(err){
      toast.error(err.message,{
        id: toastId,
      });
    }finally{
      setTimeout(()=>{
        toast.dismiss(toastId)
      },1000)
    }
  }

  const handleSaveClick = async() => {
    const toastId = toast.loading("please wait ,updating address ...");
    try{
      const formData = new FormData()
      formData.append("address",JSON.stringify(newAddress))
      await updateProfile(formData)
    }catch(err){
      toast.error(err.message,{
        id: toastId,
      });
    }finally{
      setTimeout(()=>{
        toast.dismiss(toastId)
      },1000)
    }
    setIsEditing(false);
  };

  return (
    <div className="container mx-auto p-4">
      <Card className="p-6 mb-8">
        <h1 className="text-2xl font-bold mb-4">User Profile</h1>
        <div className="mb-4">
          <strong>Name:</strong> {user.name}
        </div>
        <div className="mb-4">
          <strong>Email:</strong> {user.email}
        </div>

        <div className="mb-4">
          <strong>Address:</strong>
          {!isEditing ? (
            <>
              <p>{user.address.street}, {user.address.building}</p>
              <p>{user.address.city}, {user.address.state}, {user.address.pincode}</p>
              <p>{user.address.country}</p>
            </>
          ) : (
            <div className="space-y-4">
              <Input
                name="street"
                label="Street"
                value={newAddress.street}
                onChange={handleInputChange}
                disabled={loading}
              />
              <Input
                name="landmark"
                label="landmark"
                value={newAddress.landmark}
                onChange={handleInputChange}
                disabled={loading}
              />
              <Input
                name="building"
                label="Building"
                value={newAddress.building}
                onChange={handleInputChange}
                disabled={loading}
              />
              <Input
                name="city"
                label="City"
                value={newAddress.city}
                onChange={handleInputChange}
                disabled={loading}
              />
              <Input
                name="state"
                label="State"
                value={newAddress.state}
                onChange={handleInputChange}
                disabled={loading}
              />
              <Input
                name="pincode"
                label="Pincode"
                value={newAddress.pincode}
                onChange={handleInputChange}
                disabled={loading}
              />
              <Input
                name="country"
                label="Country"
                value={newAddress.country}
                onChange={handleInputChange}
                disabled={loading}
              />
              <Button onClick={handleSaveClick}
              disabled={loading}
              > {loading || orderLoading ? <Loader2 className="w-4 h-4 animate-spin" /> :null}Save</Button>
            </div>
          )}
        </div>

        {!isEditing && (
          <Button onClick={handleEditClick} className="mb-8"
          disabled={orderLoading}
          >
            Edit Address
          </Button>
        )}

        {/* Payment Options */}
        <h2 className="text-xl font-semibold mb-4">Payment Method</h2>
  <RadioGroup defaultValue="online" >
  <div className="flex items-center space-x-2">
    <RadioGroupItem value="online" id="online" onClick={()=>setPaymentMethod("online")} />
    <Label htmlFor="online">Online - (currently unavailable !)</Label>
  </div>
  <div className="flex items-center space-x-2">
    <RadioGroupItem value="cod" id="cod" onClick={()=>setPaymentMethod("cod")} />
    <Label htmlFor="cod">Cash on Delivery</Label>
  </div>
</RadioGroup>
        <Button className="mt-4" onClick={handleCheckout}
        disabled={orderLoading}
        > {orderLoading ? <Loader2 className="w-4 h-4 animate-spin" />:null} Proceed to Make Order</Button>
      </Card>
    </div>
  );
};

export default CheckoutForm;
