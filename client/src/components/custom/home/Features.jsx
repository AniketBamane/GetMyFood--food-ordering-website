import React from 'react';
import { Package, ShieldCheck, Truck, Clock } from 'lucide-react';

const Features = () => {
  const features = [
    {
      icon: <Clock size={40} className="text-orange-600" />,
      title: 'Delivery in 1 Hour',
    },
    {
      icon: <ShieldCheck size={40} className="text-orange-600" />,
      title: 'Clean Hygiene',
    },
    {
      icon: <Truck size={40} className="text-orange-600" />,
      title: 'Fast & Safe Delivery',
    },
    {
      icon: <Package size={40} className="text-orange-600" />,
      title: 'Fresh Packaging',
    },
  ];

  return (
    <div className="bg-white py-12">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-3xl font-bold text-center text-orange-600 mb-8">
          Why Choose Us?
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-orange-50 shadow-lg p-6 flex flex-col items-center text-center rounded-lg"
            >
              {/* Icon */}
              <div className="mb-4">{feature.icon}</div>

              {/* Feature Title */}
              <h3 className="text-lg font-semibold text-gray-800">
                {feature.title}
              </h3>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Features;
