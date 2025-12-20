import { logout, withAuthHeaders } from "@/xyz-panel/utils/auth";
import { API_URL } from "@/constant";
import { type SchemaLinkSocialMediaRequest, type SchemaLinkSocialMediaResponse } from "@/xyz-panel/types/link-social-media";

export async function getLinkSocialMedia(): Promise<SchemaLinkSocialMediaResponse> {
    try {
        const response = await fetch(`${API_URL}/core/links`, withAuthHeaders());
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

export async function createLinkSocialMedia(request: SchemaLinkSocialMediaRequest): Promise<SchemaLinkSocialMediaResponse> {
    try {
        const response = await fetch(`${API_URL}/core/links`, withAuthHeaders({
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

export async function updateLinkSocialMedia(guid: string, request: SchemaLinkSocialMediaRequest): Promise<SchemaLinkSocialMediaResponse> {
    try {
        const response = await fetch(`${API_URL}/core/links/${guid}`, withAuthHeaders({
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

export async function deleteLinkSocialMedia(guid: string): Promise<boolean> {
    try {
        const response = await fetch(`${API_URL}/core/links/${guid}`, withAuthHeaders({
            method: "DELETE"
        }));
        if (!response.ok) {
            if (response.status == 401) logout()
            throw new Error("Gagal menghapus data link social media");
        }
        return true;
    } catch (error) {
        throw error;
    }
}