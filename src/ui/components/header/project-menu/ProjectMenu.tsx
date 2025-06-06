import { memo, useCallback } from "react";
import { ChevronsUpDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { ScrollArea } from "@/components/ui/scroll-area";
import ViewAllProjects from "@/components/header/project-menu/ViewAllProjects";
import ProjectMenuTop from "@/components/header/project-menu/ProjectMenuTop";
import Empty from "@/components/ui/empty";
import { useProjectMenu } from "@/context/redux/project-menu/ProjectMenuProvider";
import ProjectMenuItem from "@/components/header/project-menu/ProjectMenuItem";

const frameworks = [
  {
    value: "next.js",
    label: "Next.js",
  },
  {
    value: "sveltekit",
    label: "SvelteKit",
  },
  {
    value: "nuxt.js",
    label: "Nuxt.js",
  },
  {
    value: "remix",
    label: "Remix",
  },
  {
    value: "astro",
    label: "Astro",
  },
  {
    value: "next.js2",
    label: "Next.js",
  },
  {
    value: "sveltekit2",
    label: "SvelteKit",
  },
  {
    value: "nuxt.js2",
    label: "Nuxt.js",
  },
  {
    value: "remix2",
    label: "Remix",
  },
  {
    value: "astro2",
    label: "Astro",
  },
  {
    value: "next.js2",
    label: "Next.js",
  },
  {
    value: "sveltekit2",
    label: "SvelteKit",
  },
  {
    value: "nuxt.js2",
    label: "Nuxt.js",
  },
  {
    value: "remix2",
    label: "Remix",
  },
  {
    value: "astro2",
    label: "Astro",
  },
  {
    value: "next.js3",
    label: "Next.js",
  },
  {
    value: "sveltekit3",
    label: "SvelteKit",
  },
  {
    value: "nuxt.js3",
    label: "Nuxt.js",
  },
  {
    value: "remix3",
    label: "Remix",
  },
  {
    value: "astro3",
    label: "Astro",
  },
  {
    value: "next.js4",
    label: "Next.js",
  },
  {
    value: "sveltekit4",
    label: "SvelteKit",
  },
  {
    value: "nuxt.js4",
    label: "Nuxt.js",
  },
  {
    value: "remix4",
    label: "Remix",
  },
  {
    value: "astro4",
    label: "Astro",
  },
  {
    value: "next.js5",
    label: "Next.js",
  },
  {
    value: "sveltekit5",
    label: "SvelteKit",
  },
  {
    value: "nuxt.js5",
    label: "Nuxt.js",
  },
  {
    value: "remix5",
    label: "Remix",
  },
  {
    value: "astro5",
    label: "Astro",
  },
  {
    value: "next.js6",
    label: "Next.js",
  },
  {
    value: "sveltekit6",
    label: "SvelteKit",
  },
  {
    value: "nuxt.js6",
    label: "Nuxt.js",
  },
  {
    value: "remix6",
    label: "Remix",
  },
  {
    value: "astro6",
    label: "Astro",
  },
  {
    value: "next.js7",
    label: "Next.js",
  },
  {
    value: "sveltekit7",
    label: "SvelteKit",
  },
  {
    value: "nuxt.js7",
    label: "Nuxt.js",
  },
  {
    value: "remix7",
    label: "Remix",
  },
  {
    value: "astro7",
    label: "Astro",
  },
  {
    value: "next.js8",
    label: "Next.js",
  },
  {
    value: "sveltekit8",
    label: "SvelteKit",
  },
  {
    value: "nuxt.js8",
    label: "Nuxt.js",
  },
  {
    value: "remix8",
    label: "Remix",
  },
  {
    value: "astro8",
    label: "Astro",
  },
  {
    value: "next.js8",
    label: "Next.js",
  },
  {
    value: "sveltekit8",
    label: "SvelteKit",
  },
  {
    value: "nuxt.js8",
    label: "Nuxt.js",
  },
  {
    value: "remix8",
    label: "Remix",
  },
  {
    value: "astro8",
    label: "Astro",
  },
  {
    value: "next.js9",
    label: "Next.js",
  },
  {
    value: "sveltekit9",
    label: "SvelteKit",
  },
  {
    value: "nuxt.js9",
    label: "Nuxt.js",
  },
  {
    value: "remix9",
    label: "Remix",
  },
  {
    value: "astro9",
    label: "Astro",
  },
  {
    value: "next.js9",
    label: "Next.js",
  },
  {
    value: "sveltekit9",
    label: "SvelteKit",
  },
  {
    value: "nuxt.js9",
    label: "Nuxt.js",
  },
  {
    value: "remix9",
    label: "Remix",
  },
  {
    value: "astro9",
    label: "Astro",
  },
  {
    value: "next.js10",
    label: "Next.js",
  },
  {
    value: "sveltekit10",
    label: "SvelteKit",
  },
  {
    value: "nuxt.js10",
    label: "Nuxt.js",
  },
  {
    value: "remix10",
    label: "Remix",
  },
  {
    value: "astro10",
    label: "Astro",
  },
  {
    value: "next.js11",
    label: "Next.js",
  },
  {
    value: "sveltekit11",
    label: "SvelteKit",
  },
  {
    value: "nuxt.js11",
    label: "Nuxt.js",
  },
  {
    value: "remix11",
    label: "Remix",
  },
  {
    value: "astro11",
    label: "Astro",
  },
];

const ProjectMenu = memo(() => {
  const {
    isMenuOpen,
    handleChangeMenuOpen,
    activeProject,
    handleChangeActiveProject,
  } = useProjectMenu();

  const handleChangeProject = useCallback(
    (value: string) => {
      handleChangeActiveProject(value);
    },
    [handleChangeActiveProject]
  );

  return (
    <Popover open={isMenuOpen} onOpenChange={handleChangeMenuOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={isMenuOpen}
          className="w-[200px] justify-between"
        >
          {activeProject
            ? frameworks.find((framework) => framework.value === activeProject)
                ?.label
            : "Select Projects"}
          <ChevronsUpDown className="opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0 flex flex-col gap-3">
        <ProjectMenuTop />
        <div>
          <p className="text-muted-foreground pb-1.5 px-4">Projects list:</p>
          <ScrollArea className="w-full h-full max-h-80 flex flex-col">
            {Boolean(!frameworks.length) && <Empty label="No project exist" />}
            {frameworks.map((item) => (
              <ProjectMenuItem
                key={item.value}
                {...item}
                activeValue={activeProject}
                onChange={handleChangeProject}
              />
            ))}
          </ScrollArea>
        </div>
        <ViewAllProjects />
      </PopoverContent>
    </Popover>
  );
});

export default ProjectMenu;
