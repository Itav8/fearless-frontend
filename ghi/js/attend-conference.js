window.addEventListener("DOMContentLoaded", async () => {
  const selectTag = document.getElementById("conference");

  try {
    const url = "http://localhost:8000/api/conferences/";
    const response = await fetch(url);

    if (response.ok) {
      const data = await response.json();
      console.log(data);
      for (let conference of data.conferences) {
        const option = document.createElement("option");
        // option.value to href
        option.value = conference.href;
        option.innerHTML = conference.name;
        selectTag.appendChild(option);
      }

      const loadingIconTag = document.getElementById(
        "loading-conference-spinner"
      );
      // Here, add the 'd-none' class to the loading icon
      loadingIconTag.classList.add("d-none");
      // Here, remove the 'd-none' class from the select tag
      selectTag.classList.remove("d-none");

      const formTag = document.getElementById("create-attendee-form");
      formTag.addEventListener("submit", async (event) => {
        event.preventDefault();

        const formData = new FormData(formTag);
        const json = JSON.stringify(Object.fromEntries(formData));

        const attendeeUrl = "http://localhost:8001/api/attendees/";
        const fetchConfig = {
          method: "post",
          body: json,
          headers: {
            "Content-Type": "application/json",
          },
        };

        const newResponse = await fetch(attendeeUrl, fetchConfig);

        if (newResponse.ok) {
          formTag.reset()
          const success = document.getElementById("success-message");
          success.classList.remove("d-none");
          formTag.classList.add("d-none");
        }
      });
    } else {
      throw Error("Failure to se ");
    }
  } catch (error) {
    console.log("Error: ", error);
  }
});
