// // copying the card HTML from the index.html file and putting it into a backtick string
function createCard(name, description, pictureUrl, startDate, endDate, locationName) {
  return `
  <div class="col">
      <div class="card shadow mb-5 bg-body rounded">
        <img src="${pictureUrl}" class="card-img-top">
        <div class="card-body">
          <h5 class="card-title">${name}</h5>
          <h6 class="card-subtitle mb-2 text-muted">${locationName}</h6>
          <p class="card-text">${description}</p>
        </div>
        <div class="card-footer">${startDate}-${endDate}</div>
      </div>
  </div>
  `;
}

// window.addEventListener('DOMContentLoaded', async () => {
//   const url = 'http://localhost:8000/api/conferences/';
//   // add error code to handle future errors
//   try {
//     // fetch function returns a Promise
//     const response = await fetch(url);

//     if (!response.ok) {
//       console.log('Something is not okay');
//     } else {
//       // want the value the Promise will turn into after await
//       const data = await response.json();

//       const conference = data.conferences[0];
//       // selects a tag that matches what's being passed in querySelector
//       const nameTag = document.querySelector('.card-title');
//       nameTag.innerHTML = conference.name;

//       const detailUrl = `http://localhost:8000${conference.href}`;
//       const detailResponse = await fetch(detailUrl);

//       if (detailResponse.ok) {
//         const details = await detailResponse.json();
//         // get the picture_url out of the data after being added to class
//         const pictureUrl = details.conference.location.picture_url;
//         const imageTag = document.querySelector('.card-img-top');
//         imageTag.src = pictureUrl;
//         // get the description out of the data
//         const description = details.conference.description;
//         const descriptionTag = document.querySelector('.card-text');
//         descriptionTag.innerHTML = description;
//       }

//     }
//   } catch (e) {
//     console.error('There is a problem:', error);
//   }
// });

window.addEventListener('DOMContentLoaded', async () => {

  const url = 'http://localhost:8000/api/conferences/';

  try {
    const response = await fetch(url);

    if (!response.ok) {
      console.log('Something is not okay');
    } else {
      const data = await response.json();

      for (let conference of data.conferences) {
        const detailUrl = `http://localhost:8000${conference.href}`;
        const detailResponse = await fetch(detailUrl);

        if (detailResponse.ok) {
          const details = await detailResponse.json();
          const title = details.conference.name;
          const description = details.conference.description;
          const pictureUrl = details.conference.location.picture_url;
          const locationName = details.conference.location.name

          const starts = new Date(details.conference.starts);
          const ends = new Date (details.conference.ends);
          const startDate = starts.toLocaleDateString('en-US');
          const endDate = ends.toLocaleDateString('en-US');

          const html = createCard(title, description, pictureUrl, startDate, endDate, locationName);

          const col = document.querySelector('.cards');
          col.innerHTML += html;
        }
      }

    }
  } catch (e) {
    console.error('There is a problem:', error);
  }

});
