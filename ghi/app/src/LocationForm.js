import React, { useEffect, useState } from "react";

function LocationForm() {
  const [states, setStates] = useState([]);

  const fetchData = async () => {
    const url = "http://localhost:8000/api/states/";

    const response = await fetch(url);

    if (response.ok) {
      const data = await response.json();
      setStates(data.states);
    }
  };

  // Use effect will run once when landing on this page. This is noted by the empty [] depedency list.
  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="row">
      <div className="offset-3 col-6">
        <div className="shadow p-4 mt-4">
          <h1>Create a new location</h1>
          <form id="create-location-form">
            <div className="form-floating mb-3">
              <input
                placeholder="Name"
                required
                type="text"
                name="name"
                id="name"
                className="form-control"
              />
              <label htmlFor="name">Name</label>
            </div>
            <div className="form-floating mb-3">
              <input
                placeholder="Room count"
                required
                type="number"
                name="room_count"
                id="room_count"
                className="form-control"
              />
              <label htmlFor="room_count">Room count</label>
            </div>
            <div className="form-floating mb-3">
              <input
                placeholder="City"
                required
                type="text"
                name="city"
                id="city"
                className="form-control"
              />
              <label htmlFor="city">City</label>
            </div>
            <div className="mb-3">
              <select required name="state" id="state" className="form-select">
                <option value="">Choose a state</option>
                {states.map((state) => {
                  return (
                    <option key={state.abbreviation} value={state.abbreviation}>
                      {state.name}
                    </option>
                  );
                })}
              </select>
            </div>
            <button className="btn btn-primary">Create</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default LocationForm;