import { useEffect, useState } from "react";
import axios from "axios";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

const useFetchOHLCV = (exchange: string, market: string, symbol: string, interval: string, page: number, pageSize: number) => {
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    axios.get(`${API_URL}/${exchange}/${market}?symbol=${symbol}&interval=${interval}&page=${page}&pageSize=${pageSize}`)
      .then((response) => {
        setData(response.data.data);
        setLoading(false);
      })
      .catch((error) => {
        setError(error.message);
        setLoading(false);
      });
  }, [exchange, market, symbol, interval, page, pageSize]);

  return { data, loading, error };
};

export default useFetchOHLCV;
