import { logout, withAuthHeaders } from "@/xyz-panel/utils/auth";
import { API_URL } from "@/constant";
import { type SchemaSocialMediaRequest, type SchemaSocialMediaResponse } from "@/xyz-panel/types/social-media";

export async function getSocialMedia(): Promise<SchemaSocialMediaResponse> {
    try {
        const response = await fetch(`${API_URL}/core/social-media`, withAuthHeaders());
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

export async function createSocialMedia(request: SchemaSocialMediaRequest): Promise<SchemaSocialMediaResponse> {
    try {
        const response = await fetch(`${API_URL}/core/social-media`, withAuthHeaders({
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

export async function updateSocialMedia(guid: string, request: SchemaSocialMediaRequest): Promise<SchemaSocialMediaResponse> {
    try {
        const response = await fetch(`${API_URL}/core/social-media/${guid}`, withAuthHeaders({
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

export async function deleteSocialMedia(guid: string): Promise<boolean> {
    try {
        const response = await fetch(`${API_URL}/core/social-media/${guid}`, withAuthHeaders({
            method: "DELETE"
        }));
        if (!response.ok) {
            if (response.status == 401) logout()
            throw new Error("Gagal menghapus data social media");
        }
        return true;
    } catch (error) {
        throw error;
    }
}