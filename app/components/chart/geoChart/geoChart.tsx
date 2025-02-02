import { Chart } from "react-google-charts";
import { useEffect, useRef, useState } from "react";

export type CountryProps = {
  allCountry: any[];
};

export default function GeoChart(props: CountryProps) {
  const chartRef = useRef<HTMLDivElement>(null);
  const [region, setRegion] = useState("world");
  const { allCountry } = props;
  console.log(allCountry);
  const test = allCountry.map((item) => [item.country, item.totalCount]);
  console.log(test);
  const data = [["Country", "Attacks"], ...test];
  const isoRegion = [
                    { "world": "All Regions" },
                    { "021": "North America" },
                    { "005": "South America" },
                    { "002": "Africa" },
                    { "150": "Europe" },
                    { "142": "Asia" },
                    { "009": "Oceania" },
                    ];

  const options = {
    region: region,
    displayMode: "regions",
    resolution: "countries",
    colorAxis: { colors: ["#FFF4B7", "#006A67"] },
    backgroundColor: "#222833",
    enableRegionInteractivity: true,
    magnifyingGlass: { enable: true, zoomFactor: 4.0 },
  };

  return (
    <div className="w-full bg-[#222833] border-[2px] border-gray-900">
      <div className="p-10">
        <Chart
          chartType="GeoChart"
          data={data}
          options={options}
          width="100%"
          height="500px"
        />
        <div className="flex justify-between pt-6 text-white text-sm lg:px-8 lg:text-base">
          {isoRegion.map((i) => {
            const regionKey = Object.keys(i)[0]; // ดึง key ออกมา
            return (
              <button
                key={regionKey}
                className="relative text-white bg-gray-800 rounded-md transition-transform duration-300 hover:scale-105 hover:text-[#FFF4B7] group"
                onClick={() => setRegion(regionKey)}
              >
                {Object.values(i)}
                <span className="absolute left-0 bottom-0 w-full h-[2px] bg-white opacity-0 transform scale-x-0 transition-all duration-300 ease-in-out group-hover:opacity-100 group-hover:scale-x-100 hover:bg-[#FFF4B7] group-hover:translate-y-1 " />
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
