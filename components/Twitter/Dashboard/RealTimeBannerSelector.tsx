import Image from "next/image";
import { Dispatch, useState } from "react";

export const RealTimeBannerSelector = ({
  title,
  src,
  setSelectedBanner,
  cloudinaryImage,
}: {
  title: string;
  src: string;
  setSelectedBanner: Dispatch<any>;
  cloudinaryImage: string;
}) => {
  const [style, setStyle] = useState(styles[10]);

  return (
    <div className="card bg-base-300">
      <div className="card-body">
        <div className="flex-shrink-0">
          <Image
            src={src}
            alt=""
            height={500}
            width={1500}
            style={{
              width: "100%",
              background: style.background,
              aspectRatio: "3 / 1",
            }}
          />
        </div>
        <div className="flex-1 w-full min-w-0 mt-3">
          <div className="flex items-center justify-between w-full">
            <div className="text-base font-medium">
              <div>{title}</div>
            </div>
            <div className="w-40">
              {styles.map((s, i) => (
                <div
                  tabIndex={-1}
                  key={i}
                  className={`inline-block w-4 h-4 mx-1 border border-gray-400 rounded-full cursor-pointer border-1 ${
                    styles[i] === style ? "ring-4" : ""
                  }`}
                  style={styles[i]}
                  onClick={() => setStyle(styles[i])}
                />
              ))}
            </div>
            <button
              type="button"
              className="inline-flex items-center px-3 py-2 text-sm font-medium leading-4 text-white bg-indigo-600 border border-transparent rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              onClick={() =>
                setSelectedBanner({
                  cloudinaryImage,
                  style,
                })
              }
            >
              Select
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const styles = [
  { background: "rgb(79, 128, 238)" },
  { background: "rgb(222, 61, 99)" },
  { background: "rgb(67, 150, 42)" },
  { background: "rgb(183, 107, 75)" },
  { background: "rgb(17, 17, 17)" },
  { background: "rgb(143, 55, 246)" },
  {
    background:
      "linear-gradient(135deg, rgb(0, 198, 255), rgb(0, 192, 255), rgb(0, 185, 255), rgb(0, 179, 255), rgb(0, 172, 255), rgb(0, 165, 255), rgb(0, 157, 255), rgb(0, 149, 255), rgb(0, 141, 255), rgb(0, 133, 255), rgb(0, 124, 255), rgb(0, 114, 255))",
  },
  {
    background:
      "linear-gradient(135deg, rgb(22, 160, 133), rgb(43, 167, 128), rgb(62, 173, 123), rgb(80, 179, 116), rgb(99, 185, 108), rgb(117, 190, 100), rgb(137, 194, 92), rgb(157, 199, 84), rgb(178, 202, 76), rgb(199, 205, 70), rgb(221, 207, 65), rgb(244, 208, 63))",
  },
  {
    background: "linear-gradient(135deg, rgb(211, 131, 18), rgb(168, 50, 121))",
  },
  {
    background:
      "linear-gradient(135deg, rgb(123, 67, 151), rgb(138, 62, 148), rgb(151, 56, 143), rgb(164, 49, 137), rgb(176, 42, 129), rgb(187, 34, 120), rgb(196, 25, 110), rgb(204, 17, 99), rgb(211, 12, 88), rgb(216, 16, 75), rgb(219, 25, 62), rgb(220, 36, 48))",
  },
  {
    background:
      "linear-gradient(135deg, rgb(222, 97, 97), rgb(224, 87, 105), rgb(224, 77, 115), rgb(222, 68, 126), rgb(218, 61, 138), rgb(211, 56, 152), rgb(201, 56, 166), rgb(186, 59, 181), rgb(167, 64, 196), rgb(142, 71, 210), rgb(107, 79, 223), rgb(38, 87, 235))",
  },
  {
    background:
      "linear-gradient(135deg, rgb(36, 198, 220), rgb(0, 188, 219), rgb(0, 178, 218), rgb(0, 167, 216), rgb(0, 157, 213), rgb(0, 146, 209), rgb(0, 134, 204), rgb(0, 123, 197), rgb(36, 111, 190), rgb(56, 99, 180), rgb(70, 87, 169), rgb(81, 74, 157))",
  },
];
