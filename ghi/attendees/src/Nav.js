function Nav() {
  return (
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
      <div class="container-fluid">
        <a class="navbar-brand" href="/">
          Conference GO!
        </a>
        <button
          class="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarSupportedContent">
          <ul class="navbar-nav me-auto mb-2 mb-lg-0">
            <li class="nav-item">
              <a class="nav-link" aria-current="page" href="/">
                Home
              </a>
            </li>
            <li class="nav-itemn">
              <a
                class="nav-link d-none"
                aria-current="page"
                href="new-location.html"
              >
                New location
              </a>
            </li>
            <li class="nav-item">
              <a
                class="nav-link active d-none"
                aria-current="page"
                href="new-conference.html"
              >
                New Conference
              </a>
            </li>
            <li class="nav-item">
              <a
                class="nav-link "
                aria-current="page"
                href="new-presentation.html"
              >
                New presentation
              </a>
            </li>
          </ul>
          <form class="d-flex">
            <input
              class="form-control me-2"
              type="search"
              placeholder="Search conferences"
              aria-label="Search"
            />
            <button class="btn btn-outline-success me-2" type="submit">
              Search
            </button>
            <a class="btn btn-primary" href="attend-conference.html">
              Attend!
            </a>
          </form>
        </div>
      </div>
    </nav>
  );
}

export default Nav;