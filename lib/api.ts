import axios from "axios";
import type {
  Camper,
  CamperFilters,
  CampersResponse,
  CamperReview,
} from "@/app/types/camper";

const api = axios.create({
  baseURL: "https://campers-api.goit.study",
});

type GetCampersParams = {
  page?: number;
  perPage?: number;
  filters?: CamperFilters;
};

export async function getCampers({
  page = 1,
  perPage = 14,
  filters,
}: GetCampersParams): Promise<CampersResponse> {
  const response = await api.get<CampersResponse>("/campers", {
    params: {
      page,
      perPage,
      location: filters?.location.trim() || undefined,
      form: filters?.form || undefined,
      engine: filters?.engine || undefined,
      transmission: filters?.transmission || undefined,
    },
  });

  return response.data;
}

export async function getCamperById(id: string): Promise<Camper | null> {
  try {
    const response = await api.get<Camper>(`/campers/${id}`);

    return response.data;
  } catch (error) {
    console.error("Failed to load camper:", error);
    return null;
  }
}

export async function getCamperReviews(
  camperId: string,
): Promise<CamperReview[]> {
  try {
    const response = await api.get<CamperReview[]>(
      `/campers/${camperId}/reviews`,
    );

    return response.data;
  } catch (error) {
    console.error("Failed to load camper reviews:", error);
    return [];
  }
}

export default api;


type CreateBookingPayload = {
  name: string;
  email: string;
};

export async function createBookingRequest(
  camperId: string,
  payload: CreateBookingPayload,
) {
  const response = await api.post(
    `/campers/${camperId}/booking-requests`,
    payload,
  );

  return response.data;
}