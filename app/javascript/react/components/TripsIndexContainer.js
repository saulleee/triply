import React, { useState } from "react";
import TripSearchContainer from "./TripSearchContainer";
import TripTile from "./TripTile";

const TripsIndexContainer = (props) => {
  const [trips, setTrips] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const newSearch = async (searchPayload) => {
    setError('');
    setLoading(true);
    const body = JSON.stringify(searchPayload);
    try {
      const response = await fetch("/api/v1/yelp/search", {
        method: "POST",
        body: body,
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        }
      });
      if (!response.ok) {
        const errorMessage = `${response.status} (${response.statusText})`;
        throw new Error(errorMessage);
      }
      const responseBody = await response.json();
      setTrips(responseBody);
      setLoading(false);
    } catch (error) {
      setError("Please search a location");
      setTrips([]);
      setLoading(false);
      console.error(`Error in Fetch: ${error.message}`);
    }
  }

  const tripTiles = trips.map((trip) => {
    return (
      <TripTile
        key={trip.id}
        id={trip.id}
        trip={trip.trip}
      />
    );
  });

  return (
    <>
      <div className="trip-search-container">
        <TripSearchContainer newSearch={newSearch} />
        <p id="search-error-location">{error}</p>
      </div>
      <div className="trip-search-results">
        { loading ? <i className="fas fa-map-pin fa-spin" id="search-spinner"></i> : tripTiles }
      </div>
    </>
  );
}

export default TripsIndexContainer;
