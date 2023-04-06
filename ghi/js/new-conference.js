window.addEventListener("DOMContentLoaded", async () => {
  const url = "http://localhost:8000/api/locations/";

  try {
    const response = await fetch(url);

    if (!response.ok) {
      console.log("It is not okay");
    } else {
      // de-structure data object. e.g. data.locations
      const { locations } = await response.json();
      const selectTag = document.getElementById("location");
      for (let location of locations) {
        const option = document.createElement("option");
        // parse id from href
        const id = parseInt(location.href.split("/")[3]);
        option.value = id;
        option.innerHTML = location.name;
        selectTag.appendChild(option);
      }

      const formTag = document.getElementById("create-conference-form");
      formTag.addEventListener("submit", async (event) => {
        event.preventDefault();

        const formData = new FormData(formTag);
        const json = JSON.stringify(Object.fromEntries(formData));

        const conferenceUrl = "http://localhost:8000/api/conferences/";
        const fetchConfig = {
          method: "post",
          body: json,
          locations,
          headers: {
            "Content-Type": "application/json",
          },
        };

        const newResponse = await fetch(conferenceUrl, fetchConfig);

        if (newResponse.ok) {
          formTag.reset();
          const newConference = await newResponse.json();
        }
      });
    }
  } catch (e) {
    console.log("Problem is:", e);
  }
});
