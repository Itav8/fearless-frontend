window.addEventListener("DOMContentLoaded", async () => {
  const selectTag = document.getElementById("conference");

  try {
    const url = "http://localhost:8000/api/conferences/";
    const response = await fetch(url);

    if (response.ok) {
      const data = await response.json();

      for (let conference of data.conferences) {
        const option = document.createElement("option");
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
    } else {
      throw Error("Failure to se ");
    }
  } catch (error) {
    console.log("Error: ", error);
  }
});
