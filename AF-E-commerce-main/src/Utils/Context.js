import axios from "axios";
import { createContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import useFetch from "../Hooks/useState";
import { fetchDataFromAPI, handleCalculate } from "./api";




export const Context = createContext()

const cartFromLocalStorage = JSON.parse(localStorage.getItem('cart') || '[]');

const AppContext = ({ children }) => {

    const [categories, setCategories] = useState();
    const [products, setProducts] = useState();
    const [subCat, setSubCat] = useState();
    const [featuredProducts, setFeaturedProducts] = useState();
    const [showCart, setShowCart] = useState(false);
    const [cartItems, setCartItems] = useState(cartFromLocalStorage);
    const [cartCount, setCartCount] = useState(0);
    const [cartSubTotal, setCartSubTotal] = useState(0);
    const [favouriteProducts, setFavouriteProducts] = useState([]);
    const [isFavourite, setIsFavourite] = useState(false);
    const [isClicked, setIsClicked] = useState(false);
    const [gstAmount, setGstAmount] = useState(0);
    const [deliveryCharge, setDeliveryCharge] = useState(0);
    const [remainingAmount, setRemainingAmount] = useState(0);
    const [selected, setSelected] = useState([]);
    const [checkedItems, setCheckedItems] = useState({});
    const [inStock, setInStock] = useState(true);
    const [calculatedAmountResponse, setCalculatedAmountResponse] = useState(null)


    const updateInStock = (value) => {
        setInStock(value);
    };


    useEffect(() => {
        getProductsForBreadcrumbs();
    }, [])


    const getProductsForBreadcrumbs = async () => {
        fetchDataFromAPI("/api/products*")
            .then((res) => {
                setProducts(res);
                console.log(products)
            })
            .catch((error) => {
                console.log("Error fetching products:", error);
            });
    };

    useEffect(() => {
        localStorage.setItem('cart', JSON.stringify(cartItems))
    }, [cartItems])

    console.log(selected)

    useEffect(() => {

        //create api for calculation
        const storedCartItems = localStorage.getItem('cartItems');
        const initialCartItems = storedCartItems ? JSON.parse(storedCartItems) : [];
        const productCount = cartItems?.length || 0; // Get the total number of products in the cart

        let totalAmount = 0;
        cartItems.map(
            (item) =>
                (totalAmount += item.attributes.price * item.attributes.quantity)
        );



         axios
        .get(`http://localhost:8080/payment/calculate?totalAmount=${totalAmount}`)
        .then((res) => {
          // Process the response and set the state variables inside the `then` block
          setGstAmount(res.data.gstAmount);
          setCartSubTotal(res.data.subTotal);
          setRemainingAmount(res.data.remainingAmount);
          setDeliveryCharge(res.data.deliveryCharge);
          setCartCount(productCount);
          // Assuming that the response contains the properties 'gstAmount', 'subTotal', 'remainingAmount', and 'deliveryCharge'
    
          // After setting the state, save the cart items to localStorage
          localStorage.setItem('cartItems', JSON.stringify(initialCartItems));
        })
        .catch((error) => {
          console.error('Error fetching data:', error);
        });

        //         handleCalculate(totalAmount).then((res) => {
        //             setCalculatedAmountResponse(res)
        //         })
        //             .catch((error) => {
        //                 console.log(error)
        //             })
        //    console.log("reponse",calculatedAmountResponse)
        //     axios.post('http://localhost:8080/calculateTotal', { subTotal })
        //   .then(response => {
        //     // Assuming the response contains the "gstAmount", "variable1", and "variable2" properties
        //     const { gstAmount, totalAmount, remainingAmount } = response.data;

        //     setGstAmount(gstAmount);
        //     setCartSubTotal(totalAmount);
        //     setRemainingAmount(remainingAmount);
        // })
        // .catch(error => {
        //   // Handle errors, if any
        //   console.error('Error calculating GST:', error);
        // });

        // setGstAmount(calculatedAmountResponse.gstAmount)
        // setCartSubTotal(calculatedAmountResponse.subTotal)
        // setRemainingAmount(calculatedAmountResponse.remainingAmount)
        // setDeliveryCharge(calculatedAmountResponse.deliveryCharge);
        setCartCount(productCount);


        // localStorage.setItem('cartItems', JSON.stringify(initialCartItems)); //saves updated cartitmes to localstorage

    }, [cartItems])



    const handleAddToCart = (product, quantity, size) => {
        if (size) {
            let items = [...cartItems];
            let index = items?.findIndex((p) => p.id === product?.id);

            if (index !== -1) {
                items[index].attributes.quantity += quantity;
                items[index].attributes.size = size;
            } else {
                product.attributes.quantity = quantity;
                product.attributes.size = size;
                items = [...items, product];
            }

            setCartItems(items);
            toast.success("Added to cart!", {
                position: "bottom-center",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",


            });
        } else {
            // Display an error or provide feedback to the user that a size must be selected
            toast.error("Please select atleast one  size.", {
                position: "bottom-center",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
        }
    };




    const handleAddToFavourites = (product) => {

        if (!favouriteProducts.some((p) => p.id === product.id)) {
            setFavouriteProducts((prevProducts) => [...prevProducts, product]);

        }
    }
    console.log("context : ", favouriteProducts)




    const handleRemoveFromCart = (product) => {
        let items = [...cartItems];
        items = items?.filter((p) => p.id !== product?.id);
        setCartItems(items);
        toast.error("Item removed from cart!", {
            position: "bottom-center",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
        });
    };

    const handleRemoveFromFavourite = (product) => {

        let items = [...favouriteProducts];
        items = items?.filter((p) => p.id !== product?.id);
        setFavouriteProducts(items)

    }
    const handleCartProductQuantity = (type, product) => {
        let items = [...cartItems];
        let index = items?.findIndex((p) => p.id === product?.id);
        if (type === "inc") {
            items[index].attributes.quantity += 1;
        } else if (type === "dec") {
            if (items[index].attributes.quantity === 1) return;
            items[index].attributes.quantity -= 1;
        }
        setCartItems(items);
    };
    const handleIconClick = (product, event) => {
        console.log("f", favouriteProducts)
        if (!favouriteProducts.some((p) => p.id === product.id)) {
            handleAddToFavourites(product);
            setIsFavourite(true);
            toast.success("Added to favourites!", {
                position: "bottom-center",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
        } else {
            handleRemoveFromFavourite(product);
            setIsFavourite(false);
            toast.error("removed from favourites!", {
                position: "bottom-center",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
        }
        setIsClicked(true);
        setTimeout(() => setIsClicked(false), 300);

    };


    return <Context.Provider value={{
        featuredProducts,
        setFeaturedProducts,
        categories,
        setCategories,
        products,
        setProducts,
        subCat,
        setSubCat,
        cartItems,
        setCartItems,
        handleAddToCart,
        cartCount,
        handleRemoveFromCart,
        showCart,
        setShowCart,
        handleCartProductQuantity,
        cartSubTotal,
        handleAddToFavourites,
        favouriteProducts,
        setFavouriteProducts,
        handleRemoveFromFavourite,
        handleIconClick,
        isFavourite,
        setIsFavourite,
        isClicked,
        gstAmount,
        deliveryCharge,
        remainingAmount,
        selected, setSelected,
        checkedItems,
        setCheckedItems,
        inStock,
        updateInStock
    }}>
        {children}

    </Context.Provider>
};

export default AppContext;