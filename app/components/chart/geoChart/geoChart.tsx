import { Chart } from "react-google-charts";
import { useEffect, useRef } from "react";

export type CountryProps = {
  allCountry: any[];
};

export default function GeoChart(props: CountryProps)  {
  const chartRef = useRef<HTMLDivElement>(null);
  
    const { allCountry } = props;
    console.log(allCountry);
    const test = allCountry.map((item) => [item.country, item.totalCount]);
    console.log(test)
  const data = [
    ["Country", "Attacks"],
    ...test
  ];

  const options = {
    region: "world",
    displayMode: "regions",
    colorAxis: { colors: ["#FFF4B7", "#006A67"] },
    backgroundColor: "#222833",
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
      </div>
    </div>
  );
};
