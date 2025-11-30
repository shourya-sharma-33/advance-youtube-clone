"use client";

import {
    Carousel,
    CarouselApi,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel";
import { Badge } from "./ui/badge";
import { Skeleton } from "./ui/skeleton";

interface FilterCarouselProps {
    value?: string | null;
    isLoading?: boolean;
    onSelect: (value: string | null) => void;
    data?: {
        value: string;
        label: string;
    }[];
}

export const FilterCarousel = ({
    value,
    data,
    isLoading,
    onSelect,
}: FilterCarouselProps) => {
    return (
        <div className="relative w-full">
            <Carousel
                opts={{
                    align: "start",
                    dragFree: true,
                }}
                className="w-full px-12"
            >
                <CarouselContent className="-ml-3">
                    {!isLoading && (
                        <CarouselItem className="pl-3 basis-auto">
                            <Badge
                                variant={value === null ? "default" : "secondary"}
                                className="rounded-lg px-3 py-1 cursor-pointer whitespace-nowrap text-sm"
                                onClick={() => onSelect?.(null)}
                            >
                                All
                            </Badge>
                        </CarouselItem>
                    )}
                    {isLoading &&
                        Array.from({ length: 14 }).map((_, index) => (
                            <CarouselItem key={index} className="pl-3 basis-auto">
                                <Skeleton className="rounded-lg px-3 py-1 h-full text-sm w-[100px] font-semibold">
                                    &nbsp;
                                </Skeleton>
                            </CarouselItem>
                        ))}
                    {!isLoading &&
                        data?.map((item) => (
                            <CarouselItem
                                key={item.value}
                                className="pl-3 basis-auto"
                            >
                                <Badge
                                    variant={
                                        value === item.value ? "default" : "secondary"
                                    }
                                    className="rounded-lg px-3 py-1 cursor-pointer whitespace-nowrap text-sm"
                                    onClick={() => onSelect?.(item.value)}
                                >
                                    {item.label}
                                </Badge>
                            </CarouselItem>
                        ))}
                </CarouselContent>
            </Carousel>
        </div>
    );
};
