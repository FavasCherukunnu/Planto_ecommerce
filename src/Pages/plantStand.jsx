import React, { useRef, useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react'; // Assuming you're using lucide-react for icons

export default function PlantStands() {
  const stands = [
    {
      src: 'https://www.puresweetjoy.co.za/wp-content/uploads/2016/04/Raised-Copper-Pipe-Pot-Plant-Stand-7-600x900.jpg',
      name: 'Chair Cup Stand',
    },
    {
      src: 'https://img.freepik.com/premium-photo/minimalist-plant-stand-interior_961875-146893.jpg',
      name: 'Gold Circle',
    },
    {
      src: 'https://images-cdn.ubuy.com.sa/65fb4475c0e3c2224044749e-riseon-boho-metal-plant-hanger-metal.jpg',
      name: 'Hanger Circle',
    },
  ];

  const scrollRef = useRef(null);
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(false);

  // Handle scroll event to toggle arrow visibility
  const handleScroll = () => {
    const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
    setShowLeftArrow(scrollLeft > 0);
    setShowRightArrow(scrollLeft + clientWidth < scrollWidth);
  };

  // Check if overflow is present (to show/hide arrows)
  const checkOverflow = () => {
    if (scrollRef.current) {
      const { scrollWidth, clientWidth } = scrollRef.current;
      setShowRightArrow(scrollWidth > clientWidth);
    }
  };

  // Check for overflow on mount and when window is resized
  useEffect(() => {
    checkOverflow();
    window.addEventListener('resize', checkOverflow);
    return () => window.removeEventListener('resize', checkOverflow);
  }, []);

  // Scroll smoothly by the container's width
  const scroll = (direction) => {
    if (scrollRef.current) {
      const scrollAmount = scrollRef.current.clientWidth;
      scrollRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth',
      });
    }
  };

  return (
    <>
      <div className="bg-[#f3fff3] py-20 pt-20 font-dm">
        {/* Header */}
        <div className="text-[#004F44] flex justify-between w-full md:px-20 py-5">
          <h1 className="text-3xl">Plant Stands</h1>
          <h6>View all</h6>
        </div>

        {/* Carousel Section */}
        <div className="relative">
          {/* Left Arrow */}
          {showLeftArrow && (
            <button
              className="absolute left-0 top-1/2 transform -translate-y-1/2 z-10 bg-white p-2 rounded-full shadow-lg"
              onClick={() => scroll('left')}
            >
              <ChevronLeft className="h-6 w-6 text-[#004F44]" />
            </button>
          )}

          {/* Right Arrow */}
          {showRightArrow && (
            <button
              className="absolute right-0 top-1/2 transform -translate-y-1/2 z-10 bg-white p-2 rounded-full shadow-lg"
              onClick={() => scroll('right')}
            >
              <ChevronRight className="h-6 w-6 text-[#004F44]" />
            </button>
          )}

          {/* Card Container */}
          <div
            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6 px-4 md:px-20 mt-10"
            ref={scrollRef}
            onScroll={handleScroll}
          >
            {/* Map over stands array and render cards */}
            {stands.map((stand, index) => (
              <div
                key={index}
                className="bg-white p-4 shadow-xl h-[350px]"
              >
                <div className="h-[250px]">
                  <img
                    src={stand.src}
                    alt={stand.name}
                    className="object-cover h-full w-full rounded"
                  />
                </div>
                <div className="mt-4 font-dm text-[#004F44]">
                  <h1 className="text-xl">{stand.name}</h1>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Custom CSS to hide the scrollbar */}
      <style jsx>{`
        .scrollbar-hide {
          -ms-overflow-style: none; /* IE and Edge */
          scrollbar-width: none; /* Firefox */
        }
        .scrollbar-hide::-webkit-scrollbar {
          display: none; /* Chrome, Safari, and Opera */
        }
      `}</style>
    </>
  );
}