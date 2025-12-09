import * as React from 'react';
import { Check, ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
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
import { COUNTRIES, Country } from '@/lib/countries';

interface CountryPhoneInputProps {
  value?: string;
  countryCode?: string;
  onValueChange?: (phone: string) => void;
  onCountryChange?: (country: Country) => void;
  placeholder?: string;
  disabled?: boolean;
  className?: string;
}

export function CountryPhoneInput({
  value = '',
  countryCode = 'GE',
  onValueChange,
  onCountryChange,
  placeholder = 'Phone number',
  disabled = false,
  className,
}: CountryPhoneInputProps) {
  const [open, setOpen] = React.useState(false);
  const selectedCountry = COUNTRIES.find(c => c.code === countryCode) || COUNTRIES[0];

  const handleCountrySelect = (country: Country) => {
    onCountryChange?.(country);
    setOpen(false);
  };

  return (
    <div className={cn('flex gap-2', className)}>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            disabled={disabled}
            className="w-[120px] justify-between px-3 border-input bg-background"
          >
            <span className="flex items-center gap-2 truncate">
              <span>{selectedCountry.flag}</span>
              <span className="text-sm">{selectedCountry.phoneCode}</span>
            </span>
            <ChevronDown className="ml-1 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[280px] p-0 bg-popover border-border z-50" align="start">
          <Command className="bg-transparent">
            <CommandInput placeholder="Search country..." className="border-0" />
            <CommandList>
              <CommandEmpty>No country found.</CommandEmpty>
              <CommandGroup className="max-h-[300px] overflow-auto">
                {COUNTRIES.map((country) => (
                  <CommandItem
                    key={country.code}
                    value={`${country.name} ${country.phoneCode}`}
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
                    <span className="flex-1">{country.name}</span>
                    <span className="text-muted-foreground text-sm">{country.phoneCode}</span>
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
      <Input
        type="tel"
        value={value}
        onChange={(e) => onValueChange?.(e.target.value)}
        placeholder={placeholder}
        disabled={disabled}
        className="flex-1"
      />
    </div>
  );
}
