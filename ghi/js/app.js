window.addEventListener('DOMContentLoaded', async () => {
  const url = 'http://localhost:8000/api/conferences/';
  // add error code to handle future errors
  try {
    // fetch function returns a Promise
    const response = await fetch(url);

    if (!response.ok) {
      // what to do when the response is bad
      console.log('response is bad')
    } else {
      // want the value the Promise will turn into after await
      const data = await response.json();
      console.log(data)
    }
  } catch (e) {
    // what to do if an error is raised
    console.error('There is a problem:', error)
  }
});
