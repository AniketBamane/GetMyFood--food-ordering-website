import React from 'react';


const AboutUs = () => (
  <div className=" text-gray-900 min-h-screen">
    <main className="container mx-auto px-4 py-8">
      <section className="flex flex-col md:flex-row items-center md:justify-between">
        <div className="md:w-1/2 mb-8 md:mb-0">
          <img
            src="https://luxebook.in/wp-content/uploads/2023/12/Home-Delivery-The-Oberoi-Gurgaon-850x560.jpg"
            alt="Food Delivery Service"
            className="w-full h-auto rounded-lg shadow-md"
          />
        </div>
        <div className="md:w-1/2 md:pl-8">
          <h2 className="text-3xl font-bold mb-4">About Us</h2>
          <p className="mb-4">
            Welcome to FoodDelivery, where we bring delicious meals right to your doorsteps. Our mission is to provide you with an exceptional dining experience through our fast and reliable delivery service. We take pride in offering a diverse menu that caters to all tastes and preferences.
          </p>
          <p className="mb-4">
            Our team is dedicated to ensuring that every meal is prepared with the highest quality ingredients and delivered with care. Whether you're craving a hearty meal or a light snack, FoodDelivery is here to satisfy your appetite.
          </p>
          <p>
            Thank you for choosing us, and we look forward to serving you again and again. If you have any questions or feedback, feel free to <a href="mailto:support@fooddelivery.com" className="text-blue-500 hover:underline">contact us</a>.
          </p>
        </div>
      </section>
    </main>
  </div>
);

export default AboutUs;
