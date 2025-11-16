import React, { useState } from "react";
import { motion } from "framer-motion";

const testimonials = [
  {
    id: 1,
    quote: "Helping one person might not change the whole world, but it could change the world for one person.",
    author: "Mother Teresa",
    role: "Humanitarian",
    image: "https://i.ibb.co.com/hJMK8k16/mother-teresa.jpg",
  },
  {
    id: 2,
    quote: "If you can't feed a hundred people, then feed just one.",
    author: "Audrey Hepburn",
    role: "Actress & Philanthropist",
    image: "https://i.ibb.co.com/Wpdzgrq3/Audrey-Hepburn-in-Ethiopia-for-UNICEF-missionaries.jpg",
  },
  {
    id: 3,
    quote: "No one has ever become poor by giving.",
    author: "Anne Frank",
    role: "Writer",
    image: "https://i.ibb.co.com/3mzS4btk/Anne-Frank.jpg",
  },
  {
    id: 4,
    quote: "Food is symbolic of love when words are inadequate.",
    author: "Alan D. Wolfelt",
    role: "Author",
    image: "https://images.unsplash.com/photo-1511367461989-f85a21fda167",
  },
  {
    id: 5,
    quote: "The greatest gift you can give someone is your time and food.",
    author: "Jamie Oliver",
    role: "Chef",
    image: "https://i.ibb.co.com/GQX45HRC/We-tested-Jamie-Oliver-s-new-cookbook-and-here-s-our-honest-review.jpg",
  },
  {
    id: 6,
    quote: "Sharing food is sharing love.",
    author: "Marcus Samuelsson",
    role: "Chef & Author",
    image: "https://i.ibb.co.com/7xb0Nfph/Chef-Marcus-Samuelson.jpg",
  },
];

const FoodSlider = () => {
  const [index, setIndex] = useState(0);


  const t = testimonials[index];

  return (
    <div className="w-full flex flex-col items-center py-10 px-4">
      {/* Card */}
      <div className="w-full max-w-4xl p-6 rounded-2xl shadow-xl bg-white relative overflow-hidden grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Quote Section */}
        <div className="col-span-2 flex flex-col justify-center px-6">
          <motion.p
            key={t.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-xl md:text-2xl font-semibold text-gray-700 mb-4"
          >
            "{t.quote}"
          </motion.p>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-gray-500"
          >
            {t.author} — <span className="text-gray-400">{t.role}</span>
          </motion.p>
        </div>

        {/* Image Section */}
        <motion.img
          key={t.image}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          src={t.image}
          alt={t.author}
          className="w-full h-64 object-cover rounded-2xl shadow-md"
          onError={(e) => e.target.src = 'https://via.placeholder.com/150'}
        />
      </div>

      {/* Dots Navigation */}
      <div className="flex mt-4 gap-2">
        {testimonials.map((_, i) => (
          <div
            key={i}
            onClick={() => setIndex(i)}
            className={`w-3 h-3 rounded-full transition-all cursor-pointer ${i === index ? "bg-blue-600 scale-110" : "bg-gray-300"}`}
          />
        ))}
      </div>
    </div>
  );
};

export default FoodSlider;
