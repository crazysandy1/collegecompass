'use client';

import { useState, useEffect, useMemo } from 'react';
import type { College, CollegeFilters as CollegeFiltersType } from '@/types';
import { mockColleges } from '@/lib/data';
import { CollegeCard } from '@/components/colleges/CollegeCard';
import { CollegeFilters } from '@/components/colleges/CollegeFilters';
import { PageTitle } from '@/components/common/PageTitle';
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';

export default function CollegesPage() {
  const [colleges, setColleges] = useState<College[]>([]);
  const [filters, setFilters] = useState<CollegeFiltersType>({});
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    // In a real app, fetch from an API
    setColleges(mockColleges);
  }, []);

  const filteredColleges = useMemo(() => {
    return colleges.filter(college => {
      const matchesState = !filters.state || college.address.state === filters.state;
      const matchesCity = !filters.city || college.address.city === filters.city;
      const matchesCourse = !filters.course || college.coursesOffered.some(course =>
        course.toLowerCase().includes(filters.course!.toLowerCase())
      );
      const matchesSearchTerm = !searchTerm || 
        college.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        college.address.city.toLowerCase().includes(searchTerm.toLowerCase()) ||
        college.address.state.toLowerCase().includes(searchTerm.toLowerCase()) ||
        college.coursesOffered.some(c => c.toLowerCase().includes(searchTerm.toLowerCase()));

      return matchesState && matchesCity && matchesCourse && matchesSearchTerm;
    });
  }, [colleges, filters, searchTerm]);

  return (
    <div>
      <PageTitle title="Explore Colleges" subtitle="Find the perfect institution for your higher studies in India." />
      
      <div className="mb-8 p-4 bg-card rounded-lg shadow">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
          <Input
            type="text"
            placeholder="Search by college name, city, state, or course..."
            className="w-full pl-10 py-3 text-base"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <CollegeFilters onFilterChange={setFilters} initialFilters={filters} />

      {filteredColleges.length > 0 ? (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredColleges.map(college => (
            <CollegeCard key={college.id} college={college} />
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <p className="text-xl text-muted-foreground">No colleges match your current filters or search term.</p>
          <p className="mt-2">Try adjusting your search or filters.</p>
        </div>
      )}
    </div>
  );
}
