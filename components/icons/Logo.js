const Logo = ({ className = '', ...props }) => (
  <svg
    width="32"
    height="32"
    viewBox="0 0 32 32"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    {...props}
  >
    <rect width="100%" height="100%" rx="16" fill="var(--secondary)" />
    <svg x="6" y="6">
      <path
        fill="var(--primary)"
        fillRule="evenodd"
        clipRule="evenodd"
        d="M2 5a2 2 0 012-2h7a2 2 0 012 2v4a2 2 0 01-2 2H9l-3 3v-3H4a2 2 0 01-2-2V5z"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        fill="var(--primary)"
        d="M15 7v2a4 4 0 01-4 4H9.828l-1.766 1.767c.28.149.599.233.938.233h2l3 3v-3h2a2 2 0 002-2V9a2 2 0 00-2-2h-1z"
      />
    </svg>
  </svg>
);

export default Logo;
