import React from "react";
import { useQuery } from "react-query";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { Line } from "react-chartjs-2";
import Chart from "chart.js/auto";
import { CategoryScale } from "chart.js";

Chart.register(CategoryScale);

const Dashboard = () => {
  const { data: worldwideData } = useQuery("worldwideData", async () => {
    const response = await fetch("https://disease.sh/v3/covid-19/all");
    return response.json();
  });

  const { data: countriesData } = useQuery("countriesData", async () => {
    const response = await fetch("https://disease.sh/v3/covid-19/countries");
    return response.json();
  });

  const { data: graphData } = useQuery("graphData", async () => {
    const response = await fetch(
      "https://disease.sh/v3/covid-19/historical/all?lastdays=all"
    );
    return response.json();
  });

  if (!worldwideData || !countriesData || !graphData) {
    return <div>Loading...</div>;
  }

  // Transform the graph data for line chart
  const graphDataKeys = Object.keys(graphData.cases);
  const graphDataValues = Object.values(graphData.cases);
  const chartData = {
    labels: graphDataKeys,
    datasets: [
      {
        label: "COVID-19 Cases",
        data: graphDataValues,
        fill: false,
        borderColor: "#3182CE",
      },
    ],
  };

  const chartOptions = {
    scales: {
      x: {
        title: {
          display: true,
          text: "Date",
        },
      },
      y: {
        title: {
          display: true,
          text: "Number of Cases",
        },
      },
    },
  };
  console.log("countries", countriesData);
  return (
    <div className="container mx-auto px-4">
      <h1 className="text-2xl font-bold mt-4 mb-8">COVID-19 Dashboard</h1>

      {/* Line Graph */}
      <div className="mb-8">
        <h2 className="text-lg font-semibold mb-2">Worldwide COVID-19 Cases</h2>
        <Line data={chartData} options={chartOptions} />
      </div>

      {/* Map */}
      <MapContainer
        center={[51.505, -0.09]}
        style={{ height: "400px", width: "100%" }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.mapbox.com/about/maps/">Mapbox</a>'
          url="https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}"
          id="mapbox/streets-v11"
          accessToken="YOUR_MAPBOX_ACCESS_TOKEN"
        />

        {countriesData.map((country) => (
          <Marker
            key={country.countryInfo._id}
            position={[country.countryInfo.lat, country.countryInfo.long]}
          >
            <Popup>
              <div>
                <h2>{country.country}</h2>
                <p>Total Active Cases: {country.active}</p>
                <p>Total Recovered Cases: {country.recovered}</p>
                <p>Total Deaths: {country.deaths}</p>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
};

export default Dashboard;
