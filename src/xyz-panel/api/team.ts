import { logout, withAuthHeaders } from "@/xyz-panel/utils/auth";
import { API_URL } from "@/constant";
import { type SchemaTeamRequest, type SchemaTeamResponse } from "@/xyz-panel/types/team";

export async function getTeam(): Promise<SchemaTeamResponse> {
    try {
        const response = await fetch(`${API_URL}/core/teams`, withAuthHeaders());
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

export async function createTeam(request: SchemaTeamRequest): Promise<SchemaTeamResponse> {
    try {
        const response = await fetch(`${API_URL}/core/teams`, withAuthHeaders({
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

export async function updateTeam(guid: string, request: SchemaTeamRequest): Promise<SchemaTeamResponse> {
    try {
        const response = await fetch(`${API_URL}/core/teams/${guid}`, withAuthHeaders({
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

export async function deleteTeam(guid: string): Promise<boolean> {
    try {
        const response = await fetch(`${API_URL}/core/teams/${guid}`, withAuthHeaders({
            method: "DELETE"
        }));
        if (!response.ok) {
            if (response.status == 401) logout()
            throw new Error("Gagal menghapus data team");
        }
        return true;
    } catch (error) {
        throw error;
    }
}