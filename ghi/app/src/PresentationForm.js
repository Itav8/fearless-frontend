import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function PresentationForm() {
  const navigate = useNavigate();
  // for the dropdown list of conferences
  const [conferences, setConferences] = useState([]);
  const [conference, setConference] = useState("");
  const [formData, setFormData] = useState({
    presenterName: "",
    presenterEmail: "",
    companyName: "",
    title: "",
    synopsis: "",
  });

  const fetchData = async () => {
    const url = "http://localhost:8000/api/conferences/";
    const response = await fetch(url);
    if (response.ok) {
      const data = await response.json();
      setConferences(data.conferences);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    // Check to make sure we have all the formData from State.
    // Check backend API endpoint and see what fields the API endpoint is looking for and map them here.
    const form = {
      presenter_name: formData.presenterName,
      presenter_email: formData.presenterEmail,
      company_name: formData.companyName,
      title: formData.title,
      synopsis: formData.synopsis,
    };
    // Stringify FormData to be put in the body and double check to make sure it looks good before sending back.
    const json = JSON.stringify(form);
    // Check to make sure this is an actual ID???
    const conferenceSplit = conference.split("/");
    const conferenceId = conferenceSplit[3];
    const locationUrl = `http://localhost:8000/api/conferences/${conferenceId}/presentations/`;
    const fetchOptions = {
      method: "post",
      body: json,
      headers: {
        "Content-Type": "application/json",
      },
    };

    const response = await fetch(locationUrl, fetchOptions);
    if (response.ok) {
      const data = await response.json();

      setFormData({
        presenterName: "",
        presenterEmail: "",
        companyName: "",
        title: "",
        synopsis: "",
      });

      window.location.reload();
      navigate("/presentation/new")
    }
  };

  const handleFormChange = (event) => {
    const value = event.target.value;
    const inputName = event.target.name;
    // UPDATES STATE FORMDATA
    setFormData({
      ...formData,
      [inputName]: value,
    });
  };

  const handleConferenceChange = (event) => {
    const value = event.target.value;
    setConference(value);
  };

  return (
    <div className="row">
      <div className="offset-3 col-6">
        <div className="shadow p-4 mt-4">
          <h1>Create a new presentation</h1>
          <form onSubmit={handleSubmit} id="create-presentation-form">
            <div className="form-floating mb-3">
              <input
                onChange={handleFormChange}
                placeholder="Presenter name"
                required
                type="text"
                name="presenterName"
                id="presenter_name"
                className="form-control"
              />
              <label htmlFor="presenter_name">Presenter name</label>
            </div>
            <div className="form-floating mb-3">
              <input
                onChange={handleFormChange}
                placeholder="Presenter email"
                required
                type="email"
                name="presenterEmail"
                id="presenter_email"
                className="form-control"
              />
              <label htmlFor="presenter_email">Presenter email</label>
            </div>
            <div className="form-floating mb-3">
              <input
                onChange={handleFormChange}
                placeholder="Company name"
                type="text"
                name="companyName"
                id="companyame"
                className="form-control"
              />
              <label htmlFor="company_name">Company name</label>
            </div>
            <div className="form-floating mb-3">
              <input
                onChange={handleFormChange}
                placeholder="Title"
                required
                type="text"
                name="title"
                id="title"
                className="form-control"
              />
              <label htmlFor="title">Title</label>
            </div>
            <div className="mb-3">
              <label htmlFor="synopsis">Synopsis</label>
              <textarea
                onChange={handleFormChange}
                id="synopsis"
                rows="3"
                name="synopsis"
                className="form-control"
              ></textarea>
            </div>
            <div className="mb-3">
              <select
                onChange={handleConferenceChange}
                required
                name="conference"
                id="conference"
                className="form-select"
              >
                <option value="">Choose a conference</option>
                {conferences.map((conference, i) => {
                  return (
                    <option key={i} value={conference.href}>
                      {conference.name}
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
export default PresentationForm;
