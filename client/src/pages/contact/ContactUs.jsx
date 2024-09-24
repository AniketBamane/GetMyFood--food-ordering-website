import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import React, { useState } from 'react';

const ContactUs = () => {
  const [form, setForm] = useState({
    name: '',
    email: '',
    message: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here
    alert('Form submitted');
  };

  return (
    <div className=" text-gray-900 min-h-screen">


      <main className="container mx-auto px-4 py-8">
        <section className="flex flex-col md:flex-row items-center md:justify-between">
          <div className="md:w-1/2 mb-8 md:mb-0">
            <img
              src="https://snowmaster.com.au/wp-content/uploads/2019/11/Own-a-Restaurent.jpg"
              alt="Contact Us"
              className="w-full h-auto rounded-lg shadow-md"
            />
          </div>
          <div className="md:w-1/2 md:pl-8">
            <h2 className="text-3xl font-bold mb-4">Contact Us</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-sm font-semibold mb-1">Name</label>
                <Input
                  id="name"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  placeholder="Your Name"
                  className="w-full"
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-semibold mb-1">Email</label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="Your Email"
                  className="w-full"
                />
              </div>
              <div>
                <label htmlFor="message" className="block text-sm font-semibold mb-1">Message</label>
                <Textarea
                  id="message"
                  name="message"
                  value={form.message}
                  onChange={handleChange}
                  placeholder="Your Message"
                  rows="4"
                  className="w-full"
                />
              </div>
              <Button type="submit" className="bg-gray-900 text-white hover:bg-gray-800">
                Send Message
              </Button>
            </form>
          </div>
        </section>
      </main>

     
    </div>
  );
};

export default ContactUs;
