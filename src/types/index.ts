
export interface Review {
  id: string;
  collegeId: string;
  studentName: string; // Or 'Anonymous'
  rating: number; // 1-5
  reviewText: string;
  date: string; // ISO date string
}

export interface CollegeResource {
  applicationPortalUrl?: string;
  financialAidUrl?: string;
  websiteUrl?: string;
}

export interface College {
  id: string;
  name: string;
  address: {
    street?: string;
    city: string;
    state: string;
    pincode?: string;
  };
  coursesOffered: string[];
  description: string;
  averageRating: number;
  reviews: Review[];
  resources: CollegeResource;
  tuitionFees?: string; // e.g., "₹50,000 - ₹2,00,000 per year"
}

export interface CollegeFilters {
  state?: string;
  city?: string;
  course?: string;
}

export interface ChartData {
  name: string;
  value: number;
}
