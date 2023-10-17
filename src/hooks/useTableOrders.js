import { useState, useEffect } from "react";

const useTableOrders = (search) => {
  const [tableOrders, setTableOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    const timeout = setTimeout(() => {
      try {
        async function getTableOrder() {
          let response = await fetch(
            `http://localhost:9000/api/tableOrders?search=${search}`
          );

          if (response.ok) {
            let data = await response.json();
            setTableOrders(data);
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
  }, [search]);
  return { tableOrders, setTableOrders, isLoading };
};

export default useTableOrders;
