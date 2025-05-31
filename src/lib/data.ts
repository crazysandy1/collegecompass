import type { College, Review } from '@/types';

export const mockReviews: Review[] = [
  {
    id: 'review1',
    collegeId: 'college1',
    studentName: 'Rohan Sharma',
    rating: 5,
    reviewText: 'Excellent faculty and great campus life. Placements are also very good.',
    date: '2023-05-15T00:00:00.000Z',
  },
  {
    id: 'review2',
    collegeId: 'college1',
    studentName: 'Priya Singh',
    rating: 4,
    reviewText: 'Good infrastructure and supportive teachers. Could improve on industry connections.',
    date: '2023-04-20T00:00:00.000Z',
  },
  {
    id: 'review3',
    collegeId: 'college2',
    studentName: 'Amit Patel',
    rating: 3,
    reviewText: 'Average college. Decent for the fees but not extraordinary.',
    date: '2023-06-01T00:00:00.000Z',
  },
  {
    id: 'review4',
    collegeId: 'college3',
    studentName: 'Sneha Reddy',
    rating: 5,
    reviewText: 'Top-notch research facilities and experienced professors. Highly recommend for engineering.',
    date: '2023-03-10T00:00:00.000Z',
  },
  {
    id: 'review5',
    collegeId: 'college4',
    studentName: 'Anonymous',
    rating: 2,
    reviewText: 'Management is not responsive and facilities are outdated. Look elsewhere.',
    date: '2023-07-01T00:00:00.000Z',
  },
   {
    id: 'review6',
    collegeId: 'college2',
    studentName: 'Vikram Kumar',
    rating: 4,
    reviewText: 'The arts program is surprisingly good. The professors are passionate.',
    date: '2023-08-11T00:00:00.000Z',
  },
];

export const mockColleges: College[] = [
  {
    id: 'college1',
    name: 'Premier Institute of Technology, Delhi',
    address: {
      city: 'New Delhi',
      state: 'Delhi',
      pincode: '110001',
    },
    coursesOffered: ['Computer Science', 'Mechanical Engineering', 'Electronics Engineering'],
    description:
      'A leading institute known for its strong engineering programs and research focus. Established in 1960, it boasts a sprawling campus and numerous alumni in top positions.',
    imageUrl: 'https://placehold.co/600x400.png',
    averageRating: 4.5,
    reviews: mockReviews.filter(r => r.collegeId === 'college1'),
    resources: {
      applicationPortalUrl: '#',
      financialAidUrl: '#',
      websiteUrl: '#',
    },
    tuitionFees: "₹1,50,000 - ₹2,00,000 per year",
  },
  {
    id: 'college2',
    name: 'City College of Commerce, Mumbai',
    address: {
      city: 'Mumbai',
      state: 'Maharashtra',
      pincode: '400020',
    },
    coursesOffered: ['B.Com', 'BBA', 'Economics (Hons)'],
    description:
      'Located in the heart of Mumbai, this college is renowned for its commerce and management programs. It has a strong industry interface and active student clubs.',
    imageUrl: 'https://placehold.co/600x400.png',
    averageRating: 3.5,
    reviews: mockReviews.filter(r => r.collegeId === 'college2'),
    resources: {
      applicationPortalUrl: '#',
      websiteUrl: '#',
    },
    tuitionFees: "₹50,000 - ₹80,000 per year",
  },
  {
    id: 'college3',
    name: 'Southern Institute of Medical Sciences, Bangalore',
    address: {
      city: 'Bangalore',
      state: 'Karnataka',
      pincode: '560029',
    },
    coursesOffered: ['MBBS', 'BDS', 'Pharmacy'],
    description:
      'A well-respected medical college with state-of-the-art facilities and a teaching hospital. Focuses on practical learning and patient care.',
    imageUrl: 'https://placehold.co/600x400.png',
    averageRating: 4.8,
    reviews: mockReviews.filter(r => r.collegeId === 'college3'),
    resources: {
      applicationPortalUrl: '#',
      financialAidUrl: '#',
      websiteUrl: '#',
    },
    tuitionFees: "₹5,00,000 - ₹10,00,000 per year",
  },
  {
    id: 'college4',
    name: 'Regional College of Arts & Humanities, Jaipur',
    address: {
      city: 'Jaipur',
      state: 'Rajasthan',
      pincode: '302004',
    },
    coursesOffered: ['History', 'Fine Arts', 'Literature'],
    description:
      'Known for its vibrant arts scene and focus on cultural heritage. Offers a creative environment for students interested in humanities and arts.',
    imageUrl: 'https://placehold.co/600x400.png',
    averageRating: 2.0,
    reviews: mockReviews.filter(r => r.collegeId === 'college4'),
    resources: {
      applicationPortalUrl: '#',
      websiteUrl: '#',
    },
    tuitionFees: "₹30,000 - ₹60,000 per year",
  },
];

export const getStates = (): string[] => {
  const states = new Set(mockColleges.map(college => college.address.state));
  return Array.from(states).sort();
};

export const getCitiesByState = (state: string): string[] => {
  const cities = new Set(
    mockColleges
      .filter(college => college.address.state === state)
      .map(college => college.address.city)
  );
  return Array.from(cities).sort();
};

export const getCourses = (): string[] => {
  const courses = new Set(
    mockColleges.flatMap(college => college.coursesOffered)
  );
  return Array.from(courses).sort();
};
