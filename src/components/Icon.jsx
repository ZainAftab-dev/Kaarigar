// Simple SVG icon set (stroke icons, Lucide-style).
const paths = {
  search: <><circle cx="11" cy="11" r="7" /><path d="M21 21l-4.6-4.6" /></>,
  cart: <><path d="M2 3h3l1 3m0 0h15l-1.8 9H7.5L6 6z" /><circle cx="9" cy="20" r="1.4" /><circle cx="18" cy="20" r="1.4" /></>,
  heart: <path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1-1.1a5.5 5.5 0 0 0-7.8 7.8l1 1.1L12 21l7.8-7.6 1-1.1a5.5 5.5 0 0 0 0-7.7z" />,
  user: <><circle cx="12" cy="8" r="4" /><path d="M4 21c0-4 4-6 8-6s8 2 8 6" /></>,
  star: <path d="M12 2.5l2.9 6.2 6.6.6-5 4.5 1.5 6.6L12 17l-6 3.4 1.5-6.6-5-4.5 6.6-.6z" />,
  shoe: <><path d="M2 17c3 0 6-1 8.5-4.5L12 10c1.5 2 3.5 3 6 3 2.4 0 4 1.3 4 3.2V18H2z" /><path d="M2 17v1M12 10c-.5-1.5.5-3 2-3" /></>,
  vase: <><path d="M9 3h6M10 3c0 3-4.5 5-4.5 10a6.5 6.5 0 0 0 13 0C18.5 8 14 6 14 3" /><path d="M6.5 13h11" /></>,
  gem: <><path d="M6 3h12l4 6-10 12L2 9z" /><path d="M2 9h20M9 3l3 18 3-18" /></>,
  scarf: <path d="M8 3l4 3 4-3 5 4-3 4h-2v10H8V11H6L3 7z" />,
  lamp: <><path d="M8 3h8l3 9H5z" /><path d="M12 12v7M8 21h8" /></>,
  gift: <><rect x="3" y="8" width="18" height="4" /><rect x="5" y="12" width="14" height="9" /><path d="M12 8v13M12 8C10 4 6 4 6.5 6.5S12 8 12 8s4-5 5.5-1.5S12 8 12 8" /></>,
  leaf: <><path d="M5 19C5 10 11 5 20 5c0 9-5 15-14 15z" /><path d="M5 19l7-7" /></>,
  frame: <><rect x="3" y="3" width="18" height="18" rx="1" /><path d="M3 16l5-5 4 4 3-3 6 6" /><circle cx="16" cy="8" r="1.5" /></>,
  bag: <><path d="M5 8h14l-1 13H6z" /><path d="M9 8V6a3 3 0 0 1 6 0v2" /></>,
  truck: <><rect x="1" y="6" width="13" height="10" /><path d="M14 9h4l3 4v3h-7" /><circle cx="5.5" cy="18" r="1.8" /><circle cx="17.5" cy="18" r="1.8" /></>,
  shield: <><path d="M12 2l8 3v6c0 5-3.5 9-8 11-4.5-2-8-6-8-11V5z" /><path d="M8.5 12l2.5 2.5 4.5-5" /></>,
  cash: <><rect x="2" y="6" width="20" height="12" rx="1" /><circle cx="12" cy="12" r="3" /><path d="M6 9v.01M18 15v.01" /></>,
  pin: <><path d="M12 21s-7-6-7-12a7 7 0 0 1 14 0c0 6-7 12-7 12z" /><circle cx="12" cy="9" r="2.5" /></>,
  arrow: <path d="M5 12h14M13 6l6 6-6 6" />,
  back: <path d="M19 12H5M11 6l-6 6 6 6" />,
  menu: <path d="M3 6h18M3 12h18M3 18h18" />,
  close: <path d="M6 6l12 12M18 6L6 18" />,
  store: <><path d="M3 9l2-5h14l2 5M3 9h18v2a3 3 0 0 1-6 0 3 3 0 0 1-6 0 3 3 0 0 1-6 0zM5 13v8h14v-8" /><path d="M10 21v-5h4v5" /></>,
  plus: <path d="M12 5v14M5 12h14" />,
  minus: <path d="M5 12h14" />,
  trash: <><path d="M4 7h16M9 7V4h6v3M6 7l1 14h10l1-14" /></>,
  edit: <><path d="M4 20h4L19 9l-4-4L4 16z" /><path d="M14 6l4 4" /></>,
  check: <path d="M5 12l5 5L20 7" />,
  filter: <path d="M3 5h18l-7 8v6l-4 2v-8z" />,
  box: <><path d="M3 7l9-4 9 4v10l-9 4-9-4z" /><path d="M3 7l9 4 9-4M12 11v10" /></>,
  chart: <path d="M4 20V10M10 20V4M16 20v-7M22 20H2" />,
  logout: <><path d="M15 4h4v16h-4" /><path d="M10 8l-4 4 4 4M6 12h11" /></>,
  grid: <><rect x="3" y="3" width="7" height="7" /><rect x="14" y="3" width="7" height="7" /><rect x="3" y="14" width="7" height="7" /><rect x="14" y="14" width="7" height="7" /></>,
  users: <><circle cx="9" cy="8" r="3.5" /><path d="M2 20c0-3.5 3-5.5 7-5.5s7 2 7 5.5" /><path d="M16 4.5a3.5 3.5 0 0 1 0 7M18 14.5c2.5.5 4 2.5 4 5.5" /></>,
  settings: <><circle cx="12" cy="12" r="3" /><path d="M19.4 15a1.7 1.7 0 0 0 .3 1.8l.1.1a2 2 0 1 1-2.8 2.8l-.1-.1a1.7 1.7 0 0 0-1.8-.3 1.7 1.7 0 0 0-1 1.5V21a2 2 0 1 1-4 0v-.1a1.7 1.7 0 0 0-1.1-1.5 1.7 1.7 0 0 0-1.8.3l-.1.1a2 2 0 1 1-2.8-2.8l.1-.1a1.7 1.7 0 0 0 .3-1.8 1.7 1.7 0 0 0-1.5-1H3a2 2 0 1 1 0-4h.1a1.7 1.7 0 0 0 1.5-1.1 1.7 1.7 0 0 0-.3-1.8l-.1-.1a2 2 0 1 1 2.8-2.8l.1.1a1.7 1.7 0 0 0 1.8.3H9a1.7 1.7 0 0 0 1-1.5V3a2 2 0 1 1 4 0v.1a1.7 1.7 0 0 0 1 1.5 1.7 1.7 0 0 0 1.8-.3l.1-.1a2 2 0 1 1 2.8 2.8l-.1.1a1.7 1.7 0 0 0-.3 1.8V9a1.7 1.7 0 0 0 1.5 1H21a2 2 0 1 1 0 4h-.1a1.7 1.7 0 0 0-1.5 1z" /></>,
  upload: <><path d="M12 16V4M7 9l5-5 5 5" /><path d="M4 16v4h16v-4" /></>,
  chevron: <path d="M6 9l6 6 6-6" />,
  bolt: <path d="M13 2L4 14h7l-1 8 9-12h-7z" />,
}

export default function Icon({ name, size = 20, className = '', filled = false }) {
  return (
    <svg
      className={'icon ' + className}
      width={size} height={size} viewBox="0 0 24 24"
      fill={filled ? 'currentColor' : 'none'} stroke="currentColor"
      strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"
      aria-hidden="true"
    >
      {paths[name] || paths.gift}
    </svg>
  )
}
