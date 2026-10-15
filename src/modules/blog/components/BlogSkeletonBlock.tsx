interface BlogSkeletonBlockProps {
  className: string;
}

export function BlogSkeletonBlock({ className }: BlogSkeletonBlockProps) {
  return <div className={`bg-(--bg-sunken) ${className}`} aria-hidden="true" />;
}
