import React from 'react';
// Import Carousel component from Shadcn UI
import ReviewCard from './ReviewCard';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"


const reviews = [
  { review: "Amazing food and great service!", name: "Alice" },
  { review: "The pizza was delicious and fresh.", name: "Bob" },
  { review: "Fantastic experience, will definitely come back.", name: "Charlie" },
  { review: "The burgers were juicy and perfectly cooked.", name: "David" },
  { review: "Excellent ambiance and friendly staff.", name: "Emma" },
  { review: "The pasta was to die for, highly recommend.", name: "Fiona" },
  { review: "Quick delivery and tasty food, very satisfied.", name: "George" },
  { review: "Great value for money and generous portions.", name: "Hannah" },
  { review: "The desserts were delightful and beautifully presented.", name: "Isaac" },
  { review: "I love the variety on the menu, something for everyone.", name: "Julia" }
];


const ReviewCarousel = () => (
  <div className="my-8">
    <h2 className="text-2xl font-bold text-gray-900 mb-6">Some Review Of Our Satisfied Customers ...</h2>
    <Carousel>
      <CarouselContent>
      {reviews.map((review, index) => (
        <CarouselItem className="md:basis-1/2 lg:basis-1/4">
        <ReviewCard
        key={index}
        review={review.review}
        name={review.name}
        />
        </CarouselItem>
      ))}
      </CarouselContent>
      <CarouselNext />
      <CarouselPrevious />
    </Carousel>
  </div>
);

export default ReviewCarousel;
