// The tab-shaped heading that sits on top of each lead detail panel.
export default function PanelTitle({
  id,
  children,
}: {
  id: string;
  children: string;
}) {
  return (
    <h2
      id={id}
      className="relative z-10 -mb-px inline-flex h-10 items-center border border-b-0 border-ink bg-card px-4 text-base font-bold font-stretch-expanded tracking-wide uppercase"
    >
      {children}
    </h2>
  );
}
