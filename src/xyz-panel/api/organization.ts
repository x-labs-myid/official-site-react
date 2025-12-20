import { logout, withAuthHeaders } from "@/xyz-panel/utils/auth";
import { API_URL } from "@/constant";
import { type SchemaOrgRequest, type SchemaOrgResponse } from "@/xyz-panel/types/organization";

export async function getOrg(): Promise<SchemaOrgResponse> {
    try {
        const response = await fetch(`${API_URL}/core/organization-profile`, withAuthHeaders());
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

export async function createOrg(request: SchemaOrgRequest): Promise<SchemaOrgResponse> {
    try {
        const response = await fetch(`${API_URL}/core/organization-profile`, withAuthHeaders({
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(request)
        }));
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

export async function updateOrg(guid: string, request: SchemaOrgRequest): Promise<SchemaOrgResponse> {
    try {
        const response = await fetch(`${API_URL}/core/organization-profile/${guid}`, withAuthHeaders({
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(request)
        }));
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

export async function deleteOrg(guid: string): Promise<boolean> {
    try {
        const response = await fetch(`${API_URL}/core/organization-profile/${guid}`, withAuthHeaders({
            method: "DELETE"
        }));
        if (!response.ok) {
            if (response.status == 401) logout()
            throw new Error("Gagal menghapus data organization");
        }
        return true;
    } catch (error) {
        throw error;
    }
}