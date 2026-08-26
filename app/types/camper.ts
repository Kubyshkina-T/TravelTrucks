export type CamperForm =
  | "alcove"
  | "panel_van"
  | "integrated"
  | "semi_integrated";

export type Transmission = "automatic" | "manual";

export type Engine =
  | "diesel"
  | "petrol"
  | "hybrid"
  | "electric";

export type Amenity =
  | "ac"
  | "bathroom"
  | "kitchen"
  | "tv"
  | "radio"
  | "refrigerator"
  | "microwave"
  | "gas"
  | "water";

export interface CamperGalleryImage {
  id: string;
  camperId: string;
  thumb: string;
  original: string;
  order: number;
}

export interface Camper {
  id: string;
  name: string;
  price: number;
  rating: number;
  totalReviews: number;
  location: string;
  description: string;
  form: CamperForm;
  length: string;
  width: string;
  height: string;
  tank: string;
  consumption: string;
  transmission: Transmission;
  engine: Engine;
  amenities: Amenity[];
  gallery: CamperGalleryImage[];
  coverImage?: string;
}

export interface CampersResponse {
  page: number;
  perPage: number;
  total: number;
  totalPages: number;
  campers: Camper[];
}

export interface CamperFilters {
  location: string;
  form: CamperForm | "";
  engine: Engine | "";
  transmission: Transmission | "";
}

export interface CamperReview {
  id: string;
  camperId: string;
  reviewer_name: string;
  reviewer_rating: number;
  comment: string;
  createdAt: string;
}