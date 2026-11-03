import type { ReactNode } from "react";

type KpiCellProps = {
  label: string;
  index: string;
  value: ReactNode;
  valueClassName?: string;
  className?: string;
  children: ReactNode;
};

// One number in the "Key numbers" strip. children is the line under the number.
export default function KpiCell({
  label,
  index,
  value,
  valueClassName = "",
  className = "",
  children,
}: KpiCellProps) {
  return (
    <div className={`flex flex-col gap-4 p-6 ${className}`}>
      <p className="flex items-center justify-between font-mono text-label text-muted uppercase">
        <span>{label}</span>
        <span>{index}</span>
      </p>
      <p
        className={`text-7xl leading-none font-extrabold font-stretch-expanded tabular-nums ${valueClassName}`}
      >
        {value}
      </p>
      {children}
    </div>
  );
}
