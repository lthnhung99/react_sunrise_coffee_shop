import { useEffect, useState } from 'react';

const useProducts = (page, search) => {
    const [product, setProduct] = useState([]);
    // const [isLoading, setIsLoading] = useState(true);
    const [totalPage, setTotalPage] = useState(0);

    // useEffect(() => {
    //     const timeout = setTimeout(() => {
    //         try {
    //             async function getProductByTitle() {
    //                 let response = await fetch(`http://localhost:9000/api/products?page=${page}&size=${8}&search=${search}`);
    //                 if (response.ok) {
    //                     let data = await response.json();
    //                     setProduct(data.content);
    //                     setTotalPage(data.totalPages);
    //                     setIsLoading(false);
    //                 } else {
    //                     console.error("API request failed with status:", response.status);
    //                     setProduct([]);
    //                 }
    //             }
    //             getProductByTitle();
    //         } catch (error) {
    //             console.error("An error occurred:", error);
    //         }
    //     }, 1000)
    //     return () => clearTimeout(timeout);
    // }, [page, search]);

    return { product, setProduct, totalPage };
};

export default useProducts;