import { ComponentProps } from "react";
import { useAppSelector } from "@/context/redux/hooks";
import { selectAppInfo } from "@/context/redux/app-info/selectors/app-info";
import { Button } from "@/components/ui/button";
import ExternalLink from "@/components/ux/ExternalLink";
import { cn } from "@/lib/utils";

const AppInfoContent = () => {
  const appInfo = useAppSelector(selectAppInfo);

  return (
    <div className="w-full text-foreground overflow-hidden flex flex-col p-2 gap-8">
      {/* Brand */}
      <div className="flex flex-col gap-2">
        <div className="text-2xl font-semibold tracking-tight flex items-center gap-4">
          {appInfo.name}
          <div className="text-sm text-accent-foreground tracking-wider">
            v{appInfo.version}
          </div>
        </div>
        <div className="text-sm text-muted-foreground leading-relaxed">
          {appInfo.description}
        </div>
      </div>

      <div className="flex flex-col gap-4">
        {/* Developer */}
        <Section heading="Developer">
          <div className="flex flex-col gap-2">
            <div className="text-sm mb-2">{appInfo.developerName}</div>
            <div className="flex items-center gap-1">
              <ExternalLink to={appInfo.developer}>
                <Button variant={"link"}>Website</Button>
              </ExternalLink>
              <ExternalLink to={appInfo.developerGithub}>
                <Button variant={"link"}>GitHub</Button>
              </ExternalLink>
              <Button
                variant={"link"}
                onClick={() =>
                  navigator.clipboard.writeText(appInfo.supportEmail)
                }
              >
                Copy Email
              </Button>
            </div>
          </div>
        </Section>

        {/* Links */}
        <Section heading="Links">
          <div className="space-y-1 text-sm text-blue-400">
            <ExternalLink to={appInfo.website}>
              <Button variant={"link"}>Website</Button>
            </ExternalLink>

            <ExternalLink to={appInfo.docs}>
              <Button variant={"link"}>Docs</Button>
            </ExternalLink>

            <ExternalLink to={appInfo.githubRepo}></ExternalLink>
            <Button variant={"link"}>GitHub Repo</Button>
          </div>
        </Section>
      </div>
    </div>
  );
};

export default AppInfoContent;

interface SectionProps extends ComponentProps<"section"> {
  heading?: string;
}

const Section = ({ heading, children, className, ...props }: SectionProps) => {
  return (
    <section className={cn("flex flex-col gap-3", className)} {...props}>
      {Boolean(heading) && <h3 className="border-l-4 pl-4">{heading}</h3>}
      <div className="pl-8">{children}</div>
    </section>
  );
};
