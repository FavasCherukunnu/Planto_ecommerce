import React, { useRef } from 'react';

export function Product() {
  const products = [
    {
      src: 'https://momentz.in/cdn/shop/products/MZ8854_b_1200x.jpg?v=1663244979',
      name: 'Peporomia',
      price: '$25',
    },
    {
      src: 'https://img.freepik.com/premium-photo/flower-pot-with-pink-flowers-it_863013-13058.jpg?w=740',
      name: 'ChenduMalli',
      price: '$30',
    },
    {
      src: 'https://img.freepik.com/premium-photo/flower-pot-with-white-background_863013-13061.jpg',
      name: 'Gray Mank',
      price: '$10',
    },
    {
      src: 'https://img.freepik.com/premium-photo/white-pot-with-flowers-it-that-are-pink-yellow-pink_1089151-194448.jpg?w=360',
      name: 'Blue Semtone',
      price: '$15',
    },
    {
      src: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTUcfZxzr3e5HpK6IZRem5KQZ4aUIzTj35pG53sIjbtFWq4qUQesLcoKu-fHAUEGmKQqX0&usqp=CAU',
      name: 'Pinker Zero',
      price: '$13',
    },
    {
      src: 'https://img.freepik.com/premium-photo/photo-violet-flower-pot-as-houseplant-home-decoration-isolated-white-background_847439-1981.jpg',
      name: 'Violet SW',
      price: '$23',
    },
    {
      src: 'https://img.freepik.com/premium-photo/front-view-decorative-potted-plant-interior-home-decor-minimalist-white-background_655090-519884.jpg',
      name: 'Sea Malasia',
      price: '$19',
    },
    {
        src: 'https://img.freepik.com/premium-photo/white-pot-with-flowers-it-that-are-pink-yellow-pink_1089151-194448.jpg?w=360',
        name: 'Blue Semtone',
        price: '$15',
      },
      {
        src: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTUcfZxzr3e5HpK6IZRem5KQZ4aUIzTj35pG53sIjbtFWq4qUQesLcoKu-fHAUEGmKQqX0&usqp=CAU',
        name: 'Pinker Zero',
        price: '$13',
      },
      {
        src: 'https://img.freepik.com/premium-photo/photo-violet-flower-pot-as-houseplant-home-decoration-isolated-white-background_847439-1981.jpg',
        name: 'Violet SW',
        price: '$23',
      },
  ];

  const scrollRef = useRef(null);
//   const [showLeftArrow, setShowLeftArrow] = useState(false);
//   const [showRightArrow, setShowRightArrow] = useState(true);

  // Handle scroll event to toggle arrow visibility
//   const handleScroll = () => {
//     const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
//     setShowLeftArrow(scrollLeft > 0);
//     setShowRightArrow(scrollLeft + clientWidth < scrollWidth);
//   };

  // Scroll smoothly by the width of one card
//   const scroll = (direction) => {
//     if (scrollRef.current) {
//       const cardWidth = scrollRef.current.firstChild.clientWidth + 24; // 24px for the gap between cards
//       scrollRef.current.scrollBy({
//         left: direction === 'left' ? -cardWidth : cardWidth,
//         behavior: 'smooth',
//       });
//     }
//   };

  return (
    <>
      <div className="bg-white pt-20 font-dm">
        {/* Header Section */}
        <div className="text-[#004F44] w-full md:px-20 px-10 py-5">
          <h1 className="md:text-4xl text-2xl">All Products</h1>
        </div>

        <div className="relative">
          {/* Left Arrow */}
          {/* {showLeftArrow && (
            <button
              className="absolute left-0 top-1/2 transform -translate-y-1/2 z-10 bg-white p-2 rounded-full shadow-lg"
              onClick={() => scroll('left')}
            >
              <ChevronLeft className="h-6 w-6 text-[#004F44]" />
            </button>
          )} */}

          {/* Right Arrow */}
          {/* {showRightArrow && (
            <button
              className="absolute right-0 top-1/2 transform -translate-y-1/2 z-10 bg-white p-2 rounded-full shadow-lg"
              onClick={() => scroll('right')}
            >
              <ChevronRight className="h-6 w-6 text-[#004F44]" />
            </button>
          )} */}

          {/* Card Container */}
          <div
            className="cardContainer w-full md:px-10 px-5 py-5 overflow-x-auto scrollbar-hide"
            ref={scrollRef}
            // onScroll={handleScroll}
          >
            {/* Grid Layout with Responsive Columns */}
            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 sm:gap-6 gap-4">
              {/* Map over products array and render cards */}
              {products.map((product, index) => (
                <div
                  key={index}
                  className="card bg-white sm:p-4 p-3 shadow-xl"
                >
                  {/* Image Container */}
                  <div className="h-[120px] sm:h-[220px] md:h-[240px] lg:h-[280px] xl:h-[300px]">
                    <img
                      src={product.src}
                      alt={product.name}
                      className="object-cover h-full w-full rounded"
                    />
                  </div>
                  <div className="data mt-4 font-dm flex justify-between text-[#004F44]">
                    <h1 className="sm:text-xl text-sm">{product.name}</h1>
                    <h4 className="sm:text-lg text-sm">{product.price}</h4>
                  </div>

                  <div className="colors flex flex-wrap md:flex-nowrap space-y-3 justify-between sm:mt-4 mt-2 items-center">
                    <div className="color flex space-x-2 justify-center items-center">
                      <p className="sm:text-sm text-xs">Sizes</p>
                      <div className="flex justify-center items-center space-x-2">
                        <div className="border-black border h-[15px] w-[15px] rounded-full flex justify-center items-center" style={{ fontSize: '10px' }}>
                          S
                        </div>
                        <div className="border border-black h-[15px] w-[15px] rounded-full flex justify-center items-center" style={{ fontSize: '10px' }}>
                          M
                        </div>
                        <div className="border border-black h-[15px] w-[15px] rounded-full flex justify-center items-center" style={{ fontSize: '10px' }}>
                          L
                        </div>
                      </div>
                    </div>
                    <button className="bg-[#004F44] w-full sm:w-auto text-white text-base sm:text-lg px-4 sm:py-2 py-1 rounded">Buy</button>
                  </div>
                </div>
              ))}
            </div>
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