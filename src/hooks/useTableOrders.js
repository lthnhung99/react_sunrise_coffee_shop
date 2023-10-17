import { useState, useEffect } from "react";

const useTableOrders = (page, search) => {
  const [tableOrders, setTableOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [totalPage, setTotalPage] = useState(0);

  useEffect(() => {
    const timeout = setTimeout(() => {
      try {
        async function getTableOrder() {
          let response = await fetch(`http://localhost:9000/api/tableOrders?page=${page}&size=${3}&search=${search}`);
          if (response.ok) {
            let data = await response.json();
            setTableOrders(data.content);
            setTotalPage(data.totalPages);
            setIsLoading(false);
          } else {
            console.error("API request failed with status:", response.status);
            setTableOrders([]);
          }
        }
        getTableOrder();
      } catch (error) {
        console.error("An error occurred:", error);
      }
    }, 1000);

    return () => clearTimeout(timeout);
  }, [page, search]);

  return { tableOrders, setTableOrders, isLoading, setIsLoading, totalPage };
};

export default useTableOrders;
