window.addEventListener('DOMContentLoaded', async () => {
  const url = 'http://localhost:8000/api/conferences/';
  // add error code to handle future errors
  try {
    // fetch function returns a Promise
    const response = await fetch(url);

    if (!response.ok) {
      console.log('Something is not okay')
    } else {
      // want the value the Promise will turn into after await
      const data = await response.json();

      const conference = data.conferences[0];
      // selects a tag that matches what's being passed in querySelector
      const nameTag = document.querySelector('.card-title');
      nameTag.innerHTML = conference.name;

      const detailUrl = `http://localhost:8000${conference.href}`;
      const detailResponse = await fetch(detailUrl);

      if (detailResponse.ok) {
        const details = await detailResponse.json();
        // get the description out of the data
        const description = details.conference.description;
        const descriptionTag = document.querySelector('.card-text');
        descriptionTag.innerHTML = description
      }

    }
  } catch (e) {
    console.error('There is a problem:', error)
  }
});
