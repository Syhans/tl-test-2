import { cn } from "@/lib/utils";
import { forwardRef } from "react";

const H1 = forwardRef<
  HTMLHeadingElement,
  React.HTMLAttributes<HTMLHeadingElement>
>((props, ref) => {
  return (
    <h1
      {...props}
      ref={ref}
      className={cn(
        "scroll-m-20 text-2xl font-extrabold tracking-tight lg:text-4xl",
        props.className,
      )}
    >
      {props.children}
    </h1>
  );
});
H1.displayName = "H1";

const H2 = forwardRef<
  HTMLHeadingElement,
  React.HTMLAttributes<HTMLHeadingElement>
>((props, ref) => {
  return (
    <h2
      {...props}
      ref={ref}
      className={cn(
        "scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0",
        props.className,
      )}
    >
      {props.children}
    </h2>
  );
});
H2.displayName = "H2";

const H3 = forwardRef<
  HTMLHeadingElement,
  React.HTMLAttributes<HTMLHeadingElement>
>((props, ref) => {
  return (
    <h3
      {...props}
      ref={ref}
      className={cn(
        "scroll-m-20 text-2xl font-semibold tracking-tight",
        props.className,
      )}
    >
      {props.children}
    </h3>
  );
});
H3.displayName = "H3";

const H4 = forwardRef<
  HTMLHeadingElement,
  React.HTMLAttributes<HTMLHeadingElement>
>((props, ref) => {
  return (
    <h4
      {...props}
      ref={ref}
      className={cn(
        "scroll-m-20 text-xl font-semibold tracking-tight",
        props.className,
      )}
    >
      {props.children}
    </h4>
  );
});
H4.displayName = "H4";

const Lead = forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>((props, ref) => {
  return (
    <p
      {...props}
      ref={ref}
      className={cn("text-muted-foreground text-xl", props.className)}
    >
      {props.children}
    </p>
  );
});
Lead.displayName = "Lead";

const P = forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>((props, ref) => {
  return (
    <p {...props} ref={ref} className={cn("leading-7", props.className)}>
      {props.children}
    </p>
  );
});
P.displayName = "P";

const Large = forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  (props, ref) => {
    return (
      <div
        {...props}
        ref={ref}
        className={cn("text-lg font-semibold", props.className)}
      >
        {props.children}
      </div>
    );
  },
);
Large.displayName = "Large";

const Small = forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>((props, ref) => {
  return (
    <p
      {...props}
      ref={ref}
      className={cn("text-sm font-medium leading-none", props.className)}
    >
      {props.children}
    </p>
  );
});
Small.displayName = "Small";

const Muted = forwardRef<
  HTMLSpanElement,
  React.HTMLAttributes<HTMLSpanElement>
>((props, ref) => {
  return (
    <span
      {...props}
      ref={ref}
      className={cn("text-muted-foreground text-sm", props.className)}
    >
      {props.children}
    </span>
  );
});
Muted.displayName = "Muted";

const InlineCode = forwardRef<
  HTMLSpanElement,
  React.HTMLAttributes<HTMLSpanElement>
>((props, ref) => {
  return (
    <code
      {...props}
      ref={ref}
      className={cn(
        "bg-muted relative rounded px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold",
        props.className,
      )}
    >
      {props.children}
    </code>
  );
});
InlineCode.displayName = "InlineCode";

const List = forwardRef<
  HTMLUListElement,
  React.HTMLAttributes<HTMLUListElement>
>((props, ref) => {
  return (
    <ul
      {...props}
      ref={ref}
      className={cn("my-6 ml-6 list-disc [&>li]:mt-2", props.className)}
    >
      {props.children}
    </ul>
  );
});
List.displayName = "List";

const Quote = forwardRef<
  HTMLQuoteElement,
  React.HTMLAttributes<HTMLQuoteElement>
>((props, ref) => {
  return (
    <blockquote
      {...props}
      ref={ref}
      className={cn(
        "text-muted-foreground mt-6 border-l-2 pl-6 italic",
        props.className,
      )}
    >
      {props.children}
    </blockquote>
  );
});
Quote.displayName = "Quote";

export {
  H1,
  H2,
  H3,
  H4,
  InlineCode,
  Large,
  Lead,
  List,
  Muted,
  P,
  Quote,
  Small,
};
