import axios from "axios";
import { useEffect, useState } from "react";

type StatusDetail = {
  reason: string;
  description: string;
};

const useHttpStatusDetail = (code: number) => {
  const [data, setData] = useState<Record<string, StatusDetail> | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<null | string>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get("/data/http_status_details.json");
        setData(res.data);
      } catch (err: any) {
        setError(err.message || "Failed to load status data");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const detail = data?.[code];

  return { detail, loading, error };
};

export default useHttpStatusDetail;
