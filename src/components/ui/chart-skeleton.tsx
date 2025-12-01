import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export const ChartSkeleton = () => {
  return (
    <Card className="animate-fade-in">
      <CardHeader>
        <Skeleton className="h-6 w-32 mb-2" />
        <Skeleton className="h-4 w-48" />
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          <div className="flex items-end gap-2 h-48">
            {[...Array(7)].map((_, i) => (
              <Skeleton 
                key={i} 
                className="flex-1" 
                style={{ height: `${Math.random() * 60 + 40}%` }}
              />
            ))}
          </div>
          <div className="flex justify-between pt-2">
            {[...Array(7)].map((_, i) => (
              <Skeleton key={i} className="h-3 w-8" />
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export const MiniChartSkeleton = () => {
  return (
    <div className="space-y-2 animate-fade-in">
      <div className="flex items-end gap-1 h-24">
        {[...Array(12)].map((_, i) => (
          <Skeleton 
            key={i} 
            className="flex-1" 
            style={{ height: `${Math.random() * 60 + 40}%` }}
          />
        ))}
      </div>
    </div>
  );
};
