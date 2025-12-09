import * as React from 'react';
import { Check, ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { COUNTRIES, Country, getRegionsByCountryCode } from '@/lib/countries';

interface CountryRegionSelectProps {
  countryCode?: string;
  region?: string;
  onCountryChange?: (country: Country) => void;
  onRegionChange?: (region: string) => void;
  countryLabel?: string;
  regionLabel?: string;
  countryPlaceholder?: string;
  regionPlaceholder?: string;
  disabled?: boolean;
  showRegion?: boolean;
  className?: string;
}

export function CountryRegionSelect({
  countryCode = '',
  region = '',
  onCountryChange,
  onRegionChange,
  countryLabel,
  regionLabel,
  countryPlaceholder = 'Select country',
  regionPlaceholder = 'Select region',
  disabled = false,
  showRegion = true,
  className,
}: CountryRegionSelectProps) {
  const [countryOpen, setCountryOpen] = React.useState(false);
  const selectedCountry = COUNTRIES.find(c => c.code === countryCode);
  const regions = countryCode ? getRegionsByCountryCode(countryCode) : [];

  const handleCountrySelect = (country: Country) => {
    onCountryChange?.(country);
    onRegionChange?.(''); // Reset region when country changes
    setCountryOpen(false);
  };

  return (
    <div className={cn('space-y-4', className)}>
      <div className="space-y-2">
        {countryLabel && (
          <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
            {countryLabel}
          </label>
        )}
        <Popover open={countryOpen} onOpenChange={setCountryOpen}>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              role="combobox"
              aria-expanded={countryOpen}
              disabled={disabled}
              className="w-full justify-between border-input bg-background font-normal"
            >
              {selectedCountry ? (
                <span className="flex items-center gap-2">
                  <span>{selectedCountry.flag}</span>
                  <span>{selectedCountry.name}</span>
                </span>
              ) : (
                <span className="text-muted-foreground">{countryPlaceholder}</span>
              )}
              <ChevronDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-full min-w-[280px] p-0 bg-popover border-border z-50" align="start">
            <Command className="bg-transparent">
              <CommandInput placeholder="Search country..." className="border-0" />
              <CommandList>
                <CommandEmpty>No country found.</CommandEmpty>
                <CommandGroup className="max-h-[300px] overflow-auto">
                  {COUNTRIES.map((country) => (
                    <CommandItem
                      key={country.code}
                      value={`${country.name} ${country.code}`}
                      onSelect={() => handleCountrySelect(country)}
                      className="cursor-pointer hover:bg-accent"
                    >
                      <Check
                        className={cn(
                          'mr-2 h-4 w-4',
                          countryCode === country.code ? 'opacity-100' : 'opacity-0'
                        )}
                      />
                      <span className="mr-2">{country.flag}</span>
                      <span>{country.name}</span>
                    </CommandItem>
                  ))}
                </CommandGroup>
              </CommandList>
            </Command>
          </PopoverContent>
        </Popover>
      </div>

      {showRegion && regions.length > 0 && (
        <div className="space-y-2">
          {regionLabel && (
            <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
              {regionLabel}
            </label>
          )}
          <Select
            value={region}
            onValueChange={onRegionChange}
            disabled={disabled || !countryCode}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder={regionPlaceholder} />
            </SelectTrigger>
            <SelectContent className="max-h-[300px]">
              {regions.map((reg) => (
                <SelectItem key={reg} value={reg}>
                  {reg}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      )}
    </div>
  );
}
