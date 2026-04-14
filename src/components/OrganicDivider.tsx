const OrganicDivider = ({ className = "" }: { className?: string }) => {
  return (
    <div className={`flex items-center justify-center py-4 ${className}`}>
      <svg viewBox="0 0 300 40" width="240" height="32" className="text-warm-brown">
        <path
          d="M10,20 C30,8 50,28 70,15 C90,5 110,25 130,18 C150,10 170,28 190,15 C210,5 230,22 250,18 C270,14 285,20 290,20"
          fill="none"
          stroke="currentColor"
          strokeWidth="1"
          opacity="0.35"
        />
        {/* Small leaf/branch */}
        <g transform="translate(140, 8)" opacity="0.4">
          <path
            d="M0,12 C3,6 8,2 12,0 C8,4 6,8 5,12 C8,8 12,6 16,5 C12,7 8,10 5,14Z"
            fill="currentColor"
          />
          <line x1="5" y1="14" x2="5" y2="22" stroke="currentColor" strokeWidth="0.7" />
        </g>
      </svg>
    </div>
  );
};

export default OrganicDivider;
