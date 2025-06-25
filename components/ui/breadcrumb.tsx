import * as React from "react";
import { ChevronRight } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

interface BreadcrumbProps {
  className?: string;
  children: React.ReactNode;
}

interface BreadcrumbListProps {
  className?: string;
  children: React.ReactNode;
}

interface BreadcrumbItemProps {
  className?: string;
  children: React.ReactNode;
}

interface BreadcrumbLinkProps {
  href: string;
  className?: string;
  children: React.ReactNode;
}

interface BreadcrumbPageProps {
  className?: string;
  children: React.ReactNode;
}

interface BreadcrumbSeparatorProps {
  className?: string;
  children?: React.ReactNode;
}

const Breadcrumb = React.forwardRef<HTMLElement, BreadcrumbProps>(
  ({ className, ...props }, ref) => (
    <nav
      ref={ref}
      aria-label="breadcrumb"
      className={cn("flex", className)}
      {...props}
    />
  )
);
Breadcrumb.displayName = "Breadcrumb";

const BreadcrumbList = React.forwardRef<HTMLOListElement, BreadcrumbListProps>(
  ({ className, ...props }, ref) => (
    <ol
      ref={ref}
      className={cn(
        "flex flex-wrap items-center gap-1.5 break-words text-sm text-muted-foreground sm:gap-2.5",
        className
      )}
      {...props}
    />
  )
);
BreadcrumbList.displayName = "BreadcrumbList";

const BreadcrumbItem = React.forwardRef<HTMLLIElement, BreadcrumbItemProps>(
  ({ className, ...props }, ref) => (
    <li
      ref={ref}
      className={cn("inline-flex items-center gap-1.5", className)}
      {...props}
    />
  )
);
BreadcrumbItem.displayName = "BreadcrumbItem";

const BreadcrumbLink = React.forwardRef<HTMLAnchorElement, BreadcrumbLinkProps>(
  ({ href, className, children, ...props }, ref) => (
    <Link
      ref={ref}
      href={href}
      className={cn(
        "inline-flex items-center gap-1.5 hover:text-foreground transition-colors",
        className
      )}
      {...props}
    >
      {children}
    </Link>
  )
);
BreadcrumbLink.displayName = "BreadcrumbLink";

const BreadcrumbPage = React.forwardRef<HTMLSpanElement, BreadcrumbPageProps>(
  ({ className, ...props }, ref) => (
    <span
      ref={ref}
      role="link"
      aria-disabled="true"
      aria-current="page"
      className={cn("font-normal text-foreground", className)}
      {...props}
    />
  )
);
BreadcrumbPage.displayName = "BreadcrumbPage";

const BreadcrumbSeparator = ({
  children,
  className,
  ...props
}: BreadcrumbSeparatorProps) => (
  <li
    role="presentation"
    aria-hidden="true"
    className={cn("[&>svg]:size-3.5", className)}
    {...props}
  >
    {children ?? <ChevronRight />}
  </li>
);
BreadcrumbSeparator.displayName = "BreadcrumbSeparator";

export {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator,
};
