import { API_URL } from "@/constant";
import type {
  LandingPageAppResponse,
  LandingPageOrgProfileResponse,
  LandingPageTeamResponse,
  LandingPageTermAppResponse,
  LandingPageStoreResponse,
} from "./type";

export async function getDataOrgProfile() {
  const res = await fetch(
    `${API_URL}/public/organization-profile/COMPANY_NAME`
  );
  const data: LandingPageOrgProfileResponse = await res.json();
  if (!res.ok) {
    throw new Error(data.message);
  }
  return data.data;
}

export async function getDataApp() {
  const res = await fetch(`${API_URL}/public/apps`);
  const data: LandingPageAppResponse = await res.json();
  if (!res.ok) {
    throw new Error(data.message);
  }
  return data.data;
}

export async function getDataTeam() {
  const res = await fetch(`${API_URL}/public/teams`);
  const data: LandingPageTeamResponse = await res.json();
  if (!res.ok) {
    throw new Error(data.message);
  }
  return data.data;
}

export async function getDataTermApp(slug: string) {
  const res = await fetch(`${API_URL}/public/term-app/${slug}`);
  const data: LandingPageTermAppResponse = await res.json();
  if (!res.ok) {
    throw new Error(data.message);
  }
  return data.data;
}

export async function getDataStore() {
  const res = await fetch(`${API_URL}/public/stores`);
  const data: LandingPageStoreResponse = await res.json();
  if (!res.ok) {
    throw new Error(data.message);
  }
  return data.data;
}

export async function getDataStoreByName(storeName: string) {
  const res = await fetch(`${API_URL}/public/stores/${storeName}`);
  const data: LandingPageStoreResponse = await res.json();
  if (!res.ok) {
    throw new Error(data.message);
  }
  return data.data;
}
