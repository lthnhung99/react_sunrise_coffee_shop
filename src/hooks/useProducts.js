import { useEffect, useState } from 'react';

const useProducts = (search) => {
    const [product, setProduct] = useState([]);

    useEffect(() => {
        const timeout = setTimeout(() => {
            try {
                async function getProductByTitle() {
                    let response = await fetch(`http://localhost:9000/api/products?search=${search}`);
                    if (response.ok) {
                        let data = await response.json();
                        setProduct(data);
                    } else {
                        console.error("API request failed with status:", response.status);
                        setProduct([]);
                    }
                }
                getProductByTitle();
            } catch (error) {
                console.error("An error occurred:", error);
            }
        }, 1000)
        return () => clearTimeout(timeout);
    }, [search]);

    return { product, setProduct };
};

export default useProducts;