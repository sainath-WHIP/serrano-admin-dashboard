function Loading() {
  return (
    <>
      <div className="">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          xmlnsXlink="http://www.w3.org/1999/xlink"
          style={{ display: "block", height: "65vh", margin: "auto" }}
          width="100px"
          height="100px"
          viewBox="0 0 100 100"
          preserveAspectRatio="xMidYMid"
        >
          <g transform="translate(68,50)">
            <g transform="rotate(0)">
              <circle cx={0} cy={0} r={4} fill="#000000" fillOpacity={1}>
                <animateTransform
                  attributeName="transform"
                  type="scale"
                  begin="-0.875s"
                  values="0.6900000000000001 0.6900000000000001;1 1"
                  keyTimes="0;1"
                  dur="1s"
                  repeatCount="indefinite"
                />
                <animate
                  attributeName="fill-opacity"
                  keyTimes="0;1"
                  dur="1s"
                  repeatCount="indefinite"
                  values="1;0"
                  begin="-0.875s"
                />
              </circle>
            </g>
          </g>
          <g transform="translate(62.72792206135786,62.72792206135786)">
            <g transform="rotate(45)">
              <circle cx={0} cy={0} r={4} fill="#000000" fillOpacity="0.875">
                <animateTransform
                  attributeName="transform"
                  type="scale"
                  begin="-0.75s"
                  values="0.6900000000000001 0.6900000000000001;1 1"
                  keyTimes="0;1"
                  dur="1s"
                  repeatCount="indefinite"
                />
                <animate
                  attributeName="fill-opacity"
                  keyTimes="0;1"
                  dur="1s"
                  repeatCount="indefinite"
                  values="1;0"
                  begin="-0.75s"
                />
              </circle>
            </g>
          </g>
          <g transform="translate(50,68)">
            <g transform="rotate(90)">
              <circle cx={0} cy={0} r={4} fill="#000000" fillOpacity="0.75">
                <animateTransform
                  attributeName="transform"
                  type="scale"
                  begin="-0.625s"
                  values="0.6900000000000001 0.6900000000000001;1 1"
                  keyTimes="0;1"
                  dur="1s"
                  repeatCount="indefinite"
                />
                <animate
                  attributeName="fill-opacity"
                  keyTimes="0;1"
                  dur="1s"
                  repeatCount="indefinite"
                  values="1;0"
                  begin="-0.625s"
                />
              </circle>
            </g>
          </g>
          <g transform="translate(37.27207793864214,62.72792206135786)">
            <g transform="rotate(135)">
              <circle cx={0} cy={0} r={4} fill="#000000" fillOpacity="0.625">
                <animateTransform
                  attributeName="transform"
                  type="scale"
                  begin="-0.5s"
                  values="0.6900000000000001 0.6900000000000001;1 1"
                  keyTimes="0;1"
                  dur="1s"
                  repeatCount="indefinite"
                />
                <animate
                  attributeName="fill-opacity"
                  keyTimes="0;1"
                  dur="1s"
                  repeatCount="indefinite"
                  values="1;0"
                  begin="-0.5s"
                />
              </circle>
            </g>
          </g>
          <g transform="translate(32,50)">
            <g transform="rotate(180)">
              <circle cx={0} cy={0} r={4} fill="#000000" fillOpacity="0.5">
                <animateTransform
                  attributeName="transform"
                  type="scale"
                  begin="-0.375s"
                  values="0.6900000000000001 0.6900000000000001;1 1"
                  keyTimes="0;1"
                  dur="1s"
                  repeatCount="indefinite"
                />
                <animate
                  attributeName="fill-opacity"
                  keyTimes="0;1"
                  dur="1s"
                  repeatCount="indefinite"
                  values="1;0"
                  begin="-0.375s"
                />
              </circle>
            </g>
          </g>
          <g transform="translate(37.27207793864214,37.27207793864214)">
            <g transform="rotate(225)">
              <circle cx={0} cy={0} r={4} fill="#000000" fillOpacity="0.375">
                <animateTransform
                  attributeName="transform"
                  type="scale"
                  begin="-0.25s"
                  values="0.6900000000000001 0.6900000000000001;1 1"
                  keyTimes="0;1"
                  dur="1s"
                  repeatCount="indefinite"
                />
                <animate
                  attributeName="fill-opacity"
                  keyTimes="0;1"
                  dur="1s"
                  repeatCount="indefinite"
                  values="1;0"
                  begin="-0.25s"
                />
              </circle>
            </g>
          </g>
          <g transform="translate(50,32)">
            <g transform="rotate(270)">
              <circle cx={0} cy={0} r={4} fill="#000000" fillOpacity="0.25">
                <animateTransform
                  attributeName="transform"
                  type="scale"
                  begin="-0.125s"
                  values="0.6900000000000001 0.6900000000000001;1 1"
                  keyTimes="0;1"
                  dur="1s"
                  repeatCount="indefinite"
                />
                <animate
                  attributeName="fill-opacity"
                  keyTimes="0;1"
                  dur="1s"
                  repeatCount="indefinite"
                  values="1;0"
                  begin="-0.125s"
                />
              </circle>
            </g>
          </g>
          <g transform="translate(62.72792206135785,37.27207793864214)">
            <g transform="rotate(315)">
              <circle cx={0} cy={0} r={4} fill="#000000" fillOpacity="0.125">
                <animateTransform
                  attributeName="transform"
                  type="scale"
                  begin="0s"
                  values="0.6900000000000001 0.6900000000000001;1 1"
                  keyTimes="0;1"
                  dur="1s"
                  repeatCount="indefinite"
                />
                <animate
                  attributeName="fill-opacity"
                  keyTimes="0;1"
                  dur="1s"
                  repeatCount="indefinite"
                  values="1;0"
                  begin="0s"
                />
              </circle>
            </g>
          </g>
        </svg>
      </div>
    </>
  );
}

export default Loading;
