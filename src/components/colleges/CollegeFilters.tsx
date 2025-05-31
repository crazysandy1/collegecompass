'use client';

import { useState, useEffect } from 'react';
import type { CollegeFilters as CollegeFiltersType } from '@/types';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { getStates, getCitiesByState, getCourses } from '@/lib/data'; // Assuming these functions exist

interface CollegeFiltersProps {
  onFilterChange: (filters: CollegeFiltersType) => void;
  initialFilters?: CollegeFiltersType;
}

export function CollegeFilters({ onFilterChange, initialFilters = {} }: CollegeFiltersProps) {
  const [states, setStates] = useState<string[]>([]);
  const [cities, setCities] = useState<string[]>([]);
  const [courses, setCourses] = useState<string[]>([]);
  
  const [selectedState, setSelectedState] = useState<string | undefined>(initialFilters.state);
  const [selectedCity, setSelectedCity] = useState<string | undefined>(initialFilters.city);
  const [courseQuery, setCourseQuery] = useState<string | undefined>(initialFilters.course);

  useEffect(() => {
    setStates(getStates());
    setCourses(getCourses());
  }, []);

  useEffect(() => {
    if (selectedState) {
      setCities(getCitiesByState(selectedState));
      setSelectedCity(undefined); // Reset city when state changes
    } else {
      setCities([]);
    }
  }, [selectedState]);

  const handleApplyFilters = () => {
    onFilterChange({
      state: selectedState,
      city: selectedCity,
      course: courseQuery,
    });
  };

  const handleResetFilters = () => {
    setSelectedState(undefined);
    setSelectedCity(undefined);
    setCourseQuery('');
    onFilterChange({});
  };

  return (
    <div className="p-6 bg-card rounded-lg shadow-md mb-8 space-y-4 md:space-y-0 md:flex md:gap-4 md:items-end">
      <div className="flex-1">
        <label htmlFor="state-filter" className="block text-sm font-medium text-foreground mb-1">State</label>
        <Select value={selectedState} onValueChange={setSelectedState}>
          <SelectTrigger id="state-filter">
            <SelectValue placeholder="Select State" />
          </SelectTrigger>
          <SelectContent>
            {states.map(state => (
              <SelectItem key={state} value={state}>{state}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="flex-1">
        <label htmlFor="city-filter" className="block text-sm font-medium text-foreground mb-1">City</label>
        <Select value={selectedCity} onValueChange={setSelectedCity} disabled={!selectedState}>
          <SelectTrigger id="city-filter">
            <SelectValue placeholder="Select City" />
          </SelectTrigger>
          <SelectContent>
            {cities.map(city => (
              <SelectItem key={city} value={city}>{city}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      
      <div className="flex-1">
        <label htmlFor="course-filter" className="block text-sm font-medium text-foreground mb-1">Course</label>
        <Input 
          id="course-filter"
          placeholder="e.g., Computer Science" 
          value={courseQuery} 
          onChange={(e) => setCourseQuery(e.target.value)} 
        />
      </div>

      <div className="flex gap-2 pt-2 md:pt-0">
        <Button onClick={handleApplyFilters} className="bg-accent hover:bg-accent/90 text-accent-foreground w-full md:w-auto">Apply Filters</Button>
        <Button onClick={handleResetFilters} variant="outline" className="w-full md:w-auto">Reset</Button>
      </div>
    </div>
  );
}
