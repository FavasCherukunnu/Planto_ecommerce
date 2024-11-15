import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";

export function SingleProduct() {
  const { id } = useParams();
  const [productData, setProductData] = useState(null);
  const [mainImage, setMainImage] = useState("");
  const [inCart, setInCart] = useState(false);
  const [variations, setVariations] = useState([]);
  const [skusWithVariations, setskusWithVariations] = useState([])
  const [selectedVariations, setSelectedVariations] = useState({});
  const [selectedSkuId, setSelectedSkuId] = useState(id);

  const loadVariations = async (id) => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/customer/variation-by-product-id/${id}`
      );
      const { data } = response;
      if (data.success) {
        setVariations(data.data);
        return data.data
      }
    } catch (error) {
      console.error("Error fetching product variations:", error);
    }
  };


  const loadSkusWithVariations = async (id) => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/customer/skus-variation-by-product-id/${id}`
      );
      const { data } = response;
      if (data.success) {
        setskusWithVariations(data.data);
        return data.data
      }
    } catch (error) {
      console.error(
        "Error fetching product skus with variations:",
        error
      );
    }
  };


  //fetch all the product details including varition and skusvariations
  const fetchProductData = async (id) => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/customer/product-sku/${id}`
      );
      const data = response.data.data;
      setProductData(data);

      // Set main image to the first image in the Images array
      setMainImage(data.Images[0]?.M07_image_path || data.M06_thumbnail_image);

      // Check if the product is already in local storage
      const storedProducts = JSON.parse(localStorage.getItem("purchasedProducts")) || [];
      setInCart(storedProducts.some((product) => product.id === data._id));

      // Fetch product data from the API
      const [variations, skusWithVariations] = await Promise.all([loadVariations(response.data.data.M06_M05_product_id), loadSkusWithVariations(response.data.data.M06_M05_product_id)]);

      if (variations && skusWithVariations) {
        const selectedVariations= initializeSelectedVariations(data,variations);
        const selectedSkuId = findSkuId(skusWithVariations,selectedVariations)
        console.log(selectedSkuId)
        setSelectedSkuId(selectedSkuId);}

    } catch (error) {
      console.error("Error fetching product data:", error);
    }
  };

  const handleVariationChange = (variationId, optionId) => {

    const selectedVariationsI = {
      ...selectedVariations,
      [variationId]: optionId,
    };
    setSelectedVariations(selectedVariationsI);
    const skuId = findSkuId(skusWithVariations, selectedVariationsI);
    setSelectedSkuId(skuId);
  };


  //find sku id from variations
  const findSkuId = (skusWithVariations,selectedVariations) => {
    const matchingSku = skusWithVariations.find((sku) =>
      sku.variations.every(
        (v) =>
          selectedVariations[v._id] &&
          selectedVariations[v._id] === v.options._id
      )
    );
    return matchingSku ? matchingSku.skuId : null;
  };

  const initializeSelectedVariations = (productData, variations) => {
    const defaultSelections = {};
  
    // Use variations from the productData first
    if (productData?.Variations?.length > 0) {
      productData.Variations.forEach((productVariation) => {
        defaultSelections[productVariation.M10_M08_product_variation_id] =
          productVariation.M10_M09_variation_option_id; // Set the selected option for each variation
      });
    }
  
    // Fill in any missing variations with the first available option from the variations array
    variations.forEach((variation) => {
      if (!defaultSelections[variation._id] && variation.options?.length > 0) {
        defaultSelections[variation._id] = variation.options[0]._id; // Select the first option by default
      }
    });
  
    setSelectedVariations(defaultSelections);
    return defaultSelections;
  };





  

  useEffect(() => {
    fetchProductData(selectedSkuId)

  }, [selectedSkuId]);

  const handleAddToCart = () => {
    const storedProducts =
      JSON.parse(localStorage.getItem("purchasedProducts")) || [];

    const newProduct = {
      id: productData._id,
      name: productData.M06_product_sku_name,
      price: productData.M06_price,
      src: productData.M06_thumbnail_image,
      quantity: 1,
      variations: productData.Variations || [], // Add variations here
    };

    // Add new product to storage
    localStorage.setItem(
      "purchasedProducts",
      JSON.stringify([...storedProducts, newProduct])
    );
    setInCart(true);
    toast.success(`${productData.M06_product_sku_name} added to cart!`);
  };

  const handleRemoveFromCart = () => {
    let storedProducts =
      JSON.parse(localStorage.getItem("purchasedProducts")) || [];
    storedProducts = storedProducts.filter(
      (product) => product.id !== productData._id
    );
    localStorage.setItem("purchasedProducts", JSON.stringify(storedProducts));
    setInCart(false);
    toast.success(`${productData.M06_product_sku_name} removed from cart.`);
  };

  if (!productData) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto px-5 pt-24 font-dm">
      <Toaster position="top-center" reverseOrder={false} />
      <div className="grid md:grid-cols-2 gap-4">
        {/* Image and Thumbnails Section */}
        <div className="space-y-4">
          {/* Main Image with Fixed Sizing */}
          <div className="max-w-[400px] max-h-[400px] h-[300px]">
            <img
              src={mainImage}
              alt="Main product"
              className="object-cover w-full h-full transition-all duration-500 ease-in-out transform hover:scale-105"
              key={mainImage}
            />
          </div>

          {/* Thumbnails */}
          <div className="flex space-x-4 justify-center items-center overflow-x-auto">
            {productData.Images.map((image, index) => (
              <img
                key={image._id}
                src={image.M07_image_path}
                alt={`Thumbnail ${index + 1}`}
                className={`w-16 h-16 object-cover cursor-pointer ${mainImage === image.M07_image_path
                  ? "ring-1 ring-[#004F44]"
                  : ""
                  }`}
                onClick={() => setMainImage(image.M07_image_path)}
              />
            ))}
          </div>
        </div>

        {/* Product Details Section */}
        <div className="space-y-4 py-4">
          <div>
            <h2 className="text-xl font-bold text-[#004F44]">
              {productData.M06_product_sku_name}
            </h2>
            <div className="text-lg text-gray-500 line-through">
              £{productData.M06_MRP}
            </div>
            <div className="text-xl font-bold text-red-500">
              £{productData.M06_price}
            </div>
            <div className="text-sm text-gray-600">
              {productData.M06_quantity} Sold
            </div>
            <div className="flex items-center space-x-1 text-yellow-500">
              <span>★</span>
              <span className="text-lg font-semibold">4.5</span>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold">Description:</h3>
            <p className="text-gray-600">
              {productData.M06_description}
              <span className="text-blue-600 cursor-pointer"> See More</span>
            </p>
          </div>

          {/* Variations */}
          {/* <div className="space-y-2">
            <h4 className="text-lg font-semibold">Color:</h4>
            <div className="flex space-x-2">
              {productData.Variations.filter(
                (variation) => variation.M08_name === "Color"
              ).map((variation) => (
                
                <span
                  key={variation._id}
                  className="w-8 h-8 rounded-full border border-gray-300"
                  style={{ backgroundColor: variation.M09_name.toLowerCase() }}
                />
              ))}
            </div>
          </div> */}

          <div className="space-y-2">
            {/* <h4 className="text-lg font-semibold">Size:</h4> */}
            <div className="flex space-x-2">
              {/* {productData.Variations.filter(
                (variation) => variation.M08_name === "Size"
              ).map((variation) => (
                <button
                  key={variation._id}
                  className="w-10 h-10 border border-gray-300 rounded"
                >
                  {variation.M09_name}
                </button>
              ))} */}

              {variations.map((variation) => (
                <div key={variation._id}>
                  <h3>{variation.M08_name}</h3>
                  <div className="flex space-x-2">
                    {variation.options.map((option) => (
                      <button
                        key={option._id}
                        className={`
                          w-10 h-10 border border-gray-300 rounded
                          ${selectedVariations[variation._id] === option._id ? "bg-[#004F44] text-white" : ""}
                          `}

                        onClick={() => handleVariationChange(variation._id, option._id)}
                      >
                        {option.M09_name}
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="flex flex-col space-y-2">
            {/* Conditionally Render Button Based on Cart Status */}
            {inCart ? (
              <button
                onClick={handleRemoveFromCart}
                className="w-full bg-red-500 text-white py-2 rounded"
              >
                Remove from Cart
              </button>
            ) : (
              <button
                onClick={handleAddToCart}
                className="w-full bg-[#004F44] text-white py-2 rounded"
              >
                Add to Cart
              </button>
            )}
            <button className="w-full border border-[#004F44] text-[#004F44] py-2 rounded">
              Checkout Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
