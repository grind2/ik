import * as React from "react";

import { Card, CardContent } from "app/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "app/components/ui/carousel";
import { RotateCcw } from "lucide-react";
import { Badge } from "./ui/badge";

export function CarouselDApiDemo({ flashcard_data }) {
  const [api, setApi] = React.useState<CarouselApi>();
  const [current, setCurrent] = React.useState(0);
  const [count, setCount] = React.useState(0);
  const [backSide, setBackSide] = React.useState(false);

  React.useEffect(() => {
    if (!api) {
      return;
    }

    setCount(api.scrollSnapList().length);
    setCurrent(api.selectedScrollSnap() + 1);

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap() + 1);
      setBackSide(false);
    });
  }, [api]);

  return (
    <div className="mx-auto max-w-xs">
      <Carousel setApi={setApi} className="w-full max-w-xs">
        <CarouselContent>
          {flashcard_data.map((element, index) => (
            <CarouselItem key={index}>
              <Card>
                <CardContent className="grid place-items-center grid-rows-5 gap-4 aspect-square p-6 h-[400px]">
                  <Badge variant="outline">{element.difficulty}</Badge>
                  <div className="row-span-3 content-center items-center justify-center">
                    <span className="text-xl font-semibold">
                      {backSide ? element.back : element.front}
                    </span>
                  </div>
                  <button onClick={() => setBackSide(!backSide)}>
                    <RotateCcw />
                  </button>
                </CardContent>
              </Card>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
      <div className="py-2 text-center text-sm text-muted-foreground">
        Tanulókártya {current} / {count}
      </div>
    </div>
  );
}
