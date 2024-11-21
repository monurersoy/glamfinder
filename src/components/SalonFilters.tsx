import { Input } from "./ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";

interface SalonFiltersProps {
  onFilterChange: (filters: { search: string; rating: string; }) => void;
}

const SalonFilters = ({ onFilterChange }: SalonFiltersProps) => {
  return (
    <div className="flex flex-col md:flex-row gap-4 mb-6">
      <div className="flex-1">
        <Input
          placeholder="Search by name or location..."
          onChange={(e) => onFilterChange({ search: e.target.value, rating: '' })}
        />
      </div>
      <div className="w-full md:w-48">
        <Select onValueChange={(value) => onFilterChange({ search: '', rating: value })}>
          <SelectTrigger>
            <SelectValue placeholder="Filter by rating" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="4">4+ Stars</SelectItem>
            <SelectItem value="3">3+ Stars</SelectItem>
            <SelectItem value="2">2+ Stars</SelectItem>
            <SelectItem value="1">1+ Stars</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};

export default SalonFilters;