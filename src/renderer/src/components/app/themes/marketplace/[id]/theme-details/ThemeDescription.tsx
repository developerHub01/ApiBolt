import { memo } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import ImageWithFallback from "@/components/ui/image-with-fallback";

const ThemeDescription = memo(() => {
  return (
    <ScrollArea className="w-full flex-1 min-h-0 h-full [&>div>div]:h-full">
      <div className="w-full h-full flex flex-col gap-2 pr-2">
        <section className="w-full aspect-video overflow-hidden rounded-lg shadow-2xs">
          <ImageWithFallback
            src="https://images.unsplash.com/photo-1763063462165-94125cccf210?q=80&w=936&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            fallback="./default-background-placeholder.jpg"
            className="w-full h-full object-cover"
          />
        </section>
        {Array.from({ length: 10 }, (_, index) => (
          <p key={index} className="text-sm text-accent-foreground">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Nostrum
            iusto accusamus odio quam atque impedit eius dicta vero ullam
            consequatur sint libero, ratione quasi fugiat dolore nihil itaque
            repudiandae possimus!
          </p>
        ))}
      </div>
    </ScrollArea>
  );
});

export default ThemeDescription;
