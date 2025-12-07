import { API_URL } from "@/constant";
import type { SchemaLogUserDeviceResponse, SchemaLogApiResponse, SchemaLogUserDeviceGroupResponse } from "@/xyz-panel/types/log";
import { logout, withAuthHeaders } from "@/xyz-panel/utils/auth";

export async function getLogUserDevice(page: number, limit: number): Promise<SchemaLogUserDeviceResponse> {
    try {
        let url = `core/logs/user-device`
        if (page && limit) {
            url += `?page=${page}&limit=${limit}`
        }
        const response = await fetch(`${API_URL}/${url}`, withAuthHeaders());
        const data = await response.json();
        if (!response.ok) {
            if (response.status == 401) logout()
            throw new Error(data.message);
        }
        return data;
    } catch (error) {
        throw error;
    }
}

export async function getLogUserDeviceGroup(): Promise<SchemaLogUserDeviceGroupResponse> {
    try {
        let url = `core/logs/user-device-group`
        const response = await fetch(`${API_URL}/${url}`, withAuthHeaders());
        const data = await response.json();
        if (!response.ok) {
            if (response.status == 401) logout()
            throw new Error(data.message);
        }
        return data;
    } catch (error) {
        throw error;
    }
}

export async function getLogApi(page: number, limit: number): Promise<SchemaLogApiResponse> {
    try {
        let url = `core/logs/api`
        if (page && limit) {
            url += `?page=${page}&limit=${limit}`
        }
        const response = await fetch(`${API_URL}/${url}`, withAuthHeaders());
        const data = await response.json();
        if (!response.ok) {
            if (response.status == 401) logout()
            throw new Error(data.message);
        }
        return data;
    } catch (error) {
        throw error;
    }
}