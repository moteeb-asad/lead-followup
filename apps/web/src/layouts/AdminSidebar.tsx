import { Link, NavLink } from "react-router";

const links = [
  {
    to: "/admin",
    label: "Dashboard",
    end: true,
    icon: "M4 4h7v7H4zM13 4h7v4h-7zM13 10h7v10h-7zM4 13h7v7H4z",
  },
  {
    to: "/admin/leads",
    label: "Leads",
    end: false,
    icon: "M4 13 6.5 5h11L20 13v6H4zM4 13h5l1 2h4l1-2h5",
  },
  {
    to: "/admin/settings",
    label: "Settings",
    end: false,
    icon: "M4 7h9M17 7h3M4 17h3M11 17h9M13 5h4v4h-4zM7 15h4v4H7z",
  },
  // TODO(week 5): a Templates link, if templates get their own page. For now
  // they live in the Templates panel on the settings page.
];

const linkClass =
  "flex h-11 items-center gap-3 px-3 text-sm font-semibold focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-signal";

export default function AdminSidebar() {
  return (
    <aside className="flex flex-[1_1_240px] flex-col gap-8 bg-ink p-5 text-paper">
      <Link to="/admin" className="flex items-center gap-3">
        <span
          className="inline-flex size-9 items-center justify-center bg-signal text-ink"
          aria-hidden="true"
        >
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.25"
            strokeLinecap="square"
            className="size-5"
          >
            <path d="M10 6 4 12l6 6" />
            <path d="M4 12h9a7 7 0 0 1 7 7v1" />
          </svg>
        </span>
        <span className="text-sm leading-none font-extrabold font-stretch-expanded tracking-tight uppercase">
          Lead
          <br />
          Follow-up
        </span>
      </Link>

      <nav
        aria-label="Main"
        className="flex flex-row flex-wrap gap-1 lg:flex-col"
      >
        {links.map((link) => (
          <NavLink
            key={link.to}
            to={link.to}
            end={link.end}
            className={({ isActive }) =>
              `${linkClass} ${isActive ? "bg-signal text-ink" : "text-paper hover:bg-ink-soft"}`
            }
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              className="size-4"
              aria-hidden="true"
            >
              <path d={link.icon} />
            </svg>
            {link.label}
          </NavLink>
        ))}
      </nav>
      {/* TODO(week 3): worker status box (running, last poll, queued), once the worker reports it. */}
    </aside>
  );
}
