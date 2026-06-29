import React, { useState, useEffect, useRef } from 'react';
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"

export function SearchSelect({ options, placeholder, value, onChange, icon, subtitle }: any) {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Safe Extraction Helper: handles both lowercase and uppercase keys seamlessly
  const extractLabel = (option: any) => {
    if (!option) return "";
    if (typeof option === 'string') return option;
    return option.label || option.from || option.From || option.location || option.Location || option.city || option.flightName || option.FlightName || "";
  };

  const filteredOptions = (options || []).filter((option: any) => {
    const text = extractLabel(option);
    return String(text).toLowerCase().includes(searchTerm.toLowerCase());
  });

  const getDisplayLabel = (val: string) => {
    if (!val) return '';
    const found = (options || []).find((opt: any) => {
      if (typeof opt === 'string') return opt === val;
      const optVal = opt.value || opt.from || opt.From || opt.location || opt.Location;
      return optVal === val;
    });
    if (!found) return val;
    return extractLabel(found);
  };

  return (
    <div ref={wrapperRef} className="relative">
      <div
        className="border rounded-lg p-3 hover:border-blue-500 cursor-pointer"
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="flex items-center space-x-2">
          {icon}
          <div className="flex-1 min-w-0">
            <div className="text-sm text-gray-500 truncate">{placeholder}</div>
            <Input
              type="text"
              value={isOpen ? searchTerm : (getDisplayLabel(value) || searchTerm)}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                if (!isOpen) setIsOpen(true);
              }}
              className="font-semibold w-full bg-transparent border-none p-0 focus-visible:ring-0 focus-visible:ring-offset-0 text-black"
              placeholder={placeholder}
            />
            <div className="text-xs text-gray-400 truncate">{subtitle}</div>
          </div>
        </div>
      </div>
      {isOpen && (
        <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg">
          <ScrollArea className="h-64">
            {filteredOptions.length === 0 ? (
              <div className="p-3 text-sm text-gray-500 text-center">No cities found</div>
            ) : (
              filteredOptions.map((option: any, index: number) => {
                const itemLabel = extractLabel(option);
                const itemValue = typeof option === 'string' ? option : (option.value || itemLabel || index);

                return (
                  <Button
                    key={index}
                    className="w-full justify-start font-normal text-black hover:bg-gray-100"
                    variant="ghost"
                    onClick={() => {
                      onChange(itemValue);
                      setSearchTerm('');
                      setIsOpen(false);
                    }}
                  >
                    {itemLabel}
                  </Button>
                );
              })
            )}
          </ScrollArea>
        </div>
      )}
    </div>
  );
}
