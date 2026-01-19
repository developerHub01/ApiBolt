import { ComponentProps } from "react";

interface Props extends Omit<ComponentProps<"section">, "title"> {
  title?: React.ReactNode;
}

const ThemeDetailsSectionWrapper = ({ children, title, ...props }: Props) => {
  return (
    <section className="flex flex-col gap-2" {...props}>
      {Boolean(title) && (
        <>
          {typeof title === "string" ? (
            <h3 className="text-lg font-bold">{title}</h3>
          ) : (
            title
          )}
        </>
      )}
      {children}
    </section>
  );
};

export default ThemeDetailsSectionWrapper;
