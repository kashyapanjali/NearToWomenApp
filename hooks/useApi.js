// src/hooks/useApi.js
import { useState, useCallback } from "react";
import { apiService } from "../api/apiService";

export const useApi = () => {
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(null);
	const [data, setData] = useState(null);

	const execute = useCallback(async (apiCall, ...params) => {
		try {
			setLoading(true);
			setError(null);
			const response = await apiCall(...params);
			setData(response.data);
			return response.data;
		} catch (err) {
			setError(err.response?.data?.message || "Something went wrong");
			throw err;
		} finally {
			setLoading(false);
		}
	}, []);

	return {
		loading,
		error,
		data,
		execute,
	};
};
