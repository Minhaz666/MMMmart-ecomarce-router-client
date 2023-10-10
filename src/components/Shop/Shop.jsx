import React, { useEffect, useState } from 'react';
import { addToDb, deleteShoppingCart, getShoppingCart } from '../../utilities/fakedb';
import Cart from '../Cart/Cart';
import Product from '../Product/Product';
import './Shop.css';
import { Link, useLoaderData } from 'react-router-dom';
import YouTube from 'react-youtube';
import onlinebuy from '../../assets/onlinebuy.jpg'
import offer from '../../assets/offer.jpg'

const Shop = () => {
    document.title ='MMM mart-home'
    const [products, setProducts] = useState([]);
    const [cart, setCart] = useState([])
    const [currentPage, setCurrentPage] = useState(0);
    const [iteamsPerPage, setIteamsPerPage] = useState(10)
    const { totalProduct } = useLoaderData()

    const totalPage = Math.ceil(totalProduct / iteamsPerPage)

    // const pageNumbers = []
    // for (let i = 0; i <= totalPage; i++) {
    //     pageNumbers.push(i);
    // }

    // another way
    const pageNumbers = [...Array(totalPage).keys()]
    console.log(pageNumbers)

    //previously for all data
    // useEffect(() => {
    //     fetch('http://localhost:5000/products?')
    //         .then(res => res.json())
    //         .then(data => setProducts(data))
    // }, []);

    // after pagination
    useEffect(() => {
        async function fetchData() {
            const response = await fetch(`http://localhost:5000/products?page=${currentPage}&limit=${iteamsPerPage}`)
            const data = await response.json()
            console.log(data)
            setProducts(data)
        }
        fetchData()
    }, [currentPage, iteamsPerPage]
    )

    useEffect(() => {
        const storedCart = getShoppingCart();
        const savedCart = [];
        // step 1: get id of the addedProduct
        for (const id in storedCart) {
            // step 2: get product from products state by using id
            const addedProduct = products.find(product => product._id === id)
            if (addedProduct) {
                // step 3: add quantity
                const quantity = storedCart[id];
                addedProduct.quantity = quantity;
                // step 4: add the added product to the saved cart
                savedCart.push(addedProduct);
            }
            // console.log('added Product', addedProduct)
        }
        // step 5: set the cart
        setCart(savedCart);
    }, [products])

    const handleAddToCart = (product) => {
        // cart.push(product); '
        let newCart = [];
        // const newCart = [...cart, product];
        // if product doesn't exist in the cart, then set quantity = 1
        // if exist update quantity by 1
        const exists = cart.find(pd => pd._id === product._id);
        if (!exists) {
            product.quantity = 1;
            newCart = [...cart, product]
        }
        else {
            exists.quantity = exists.quantity + 1;
            const remaining = cart.filter(pd => pd._id !== product._id);
            newCart = [...remaining, exists];
        }

        setCart(newCart);
        addToDb(product._id)
    }

    const handleClearCart = () => {
        setCart([]);
        deleteShoppingCart();
    }

    const options = [5, 10, 15, 20];
    const hndleSelectChange = (event) => {
        setIteamsPerPage(parseInt(event.target.value));
        setCurrentPage(0);
    }

    const videoId = 'https://www.youtube.com/watch?v=upI_sBXMkGQ'; 
    const videoOptions = {
        width: '600', // Adjust the width as needed
        height: '400', // Adjust the height as needed
      };

    return (
        <>
            <div className='shop-container'>
                <div className="products-container grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {
                        products.map(product => <Product
                            key={product._id}
                            product={product}
                            handleAddToCart={handleAddToCart}
                        ></Product>)
                    }

                </div>
                <div className="cart-container">
                    <Cart
                        cart={cart}
                        handleClearCart={handleClearCart}
                    >
                        <Link className='proceed-link' to="/orders">
                            <button className='btn-proceed'>Review Order</button>
                        </Link>
                    </Cart>
                </div>
            </div>
       
            {/* pagination */}
            <div className="pagination">
                <p>currentPage:{currentPage} <br /> item per page: {iteamsPerPage}</p>
                {
                    pageNumbers.map(number => {
                        return <button key={number} className={currentPage === number ? 'selected' : ''} onClick={() => { setCurrentPage(number) }}>{number}</button>
                    })
                }
                <select name="" value={iteamsPerPage} onChange={hndleSelectChange} id="">
                    {
                        options.map(option => <option key={option} value={option}>
                            {option}
                        </option>)
                    }
                </select>

            </div>

                {/* yt demo */}
                <div className='products-container flex justify-between items-center'>
                <div>
                <h1>Our service Model </h1>
                    <YouTube videoId={videoId} opts={videoOptions} />
                </div>
                <div>
                    <img src={offer} alt="" />
                </div>
                </div>

                {/* banner img */}
                <div className='products-container banner flex justify-center items-center '>
                    <img className='center' src={onlinebuy} alt="" />
                </div>
        </>
    );
};

export default Shop;