import { useEffect, useState } from 'react';

const useProducts = (search) => {
    const [product, setProduct] = useState([]);

    useEffect(() => {
        try {
            async function getPost() {
                let response = await fetch("http://localhost:9000/api/products");
                if (response.ok) {
                    let data = await response.json();
                    setProduct(data);
                } else {
                    console.error("API request failed with status:", response.status);
                }
            }
            getPost();
        } catch (error) {
            console.error("An error occurred:", error);
        }
    }, []);

    useEffect(() => {
        try {
            async function getProductByTitle() {
                let response = await fetch(`http://localhost:9000/api/products/search-title/${search}`);
                if (response.ok) {
                    let data = await response.json();
                    setProduct(data);
                } else {
                    console.error("API request failed with status:", response.status);
                }
            }
            getProductByTitle();
        } catch (error) {
            console.error("An error occurred:", error);
        }
    }, [search]);

    return { product, setProduct };
};

export default useProducts;