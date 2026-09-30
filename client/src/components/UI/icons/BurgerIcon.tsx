export const BurgerIcon = ({
  className = "w-8 h-8 ",
}: {
  className?: string;
}) => {
  return (
    <svg
      viewBox="0 0 24 24"
      className={className}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
      <g
        id="SVGRepo_tracerCarrier"
        stroke-linecap="round"
        stroke-linejoin="round"
      ></g>
      <g id="SVGRepo_iconCarrier">
        {" "}
        <path
          d="M4 18H10"
          stroke="#000000"
          stroke-width="2"
          stroke-linecap="round"
        ></path>{" "}
        <path
          d="M4 12L16 12"
          stroke="#000000"
          stroke-width="2"
          stroke-linecap="round"
        ></path>{" "}
        <path
          d="M4 6L20 6"
          stroke="#000000"
          stroke-width="2"
          stroke-linecap="round"
        ></path>{" "}
      </g>
    </svg>
    // <svg
    //   xmlns="http://www.w3.org/2000/svg"
    //   className={className}
    //   fill="none"
    //   viewBox="0 0 24 24"
    //   stroke="#000000"
    //   strokeWidth="2"
    // >
    //   <path strokeLinecap="round" strokeLinejoin="round" d="M4 8h16M4 16h16" />
    // </svg>
  );
};
