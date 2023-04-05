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

const alertPlaceholder = document.getElementById('liveAlertPlaceholder')

function createAlert(message, type) {
  const wrapper = document.createElement('div')

  wrapper.innerHTML = `${message} ${type}`;
  alertPlaceholder.append(wrapper);
}


window.addEventListener('DOMContentLoaded', async () => {

  const url = 'http://localhost:8000/api/conferences/';

  try {
    const response = await fetch(url);

    if (!response.ok) {
      const alert = createAlert('Something is not okay');
      alertPlaceholder.append(alert);
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
    const error = createAlert('There is a problem:', e);
    alertPlaceholder.append(error);
  }

});
