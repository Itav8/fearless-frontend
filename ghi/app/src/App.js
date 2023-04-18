import Nav from "./Nav";
import { Fragment } from "react";
import AttendeesList from "./AttendeesList";
import LocationForm from "./LocationForm";

function App(props) {
  if (props.attendees === undefined) {
    return null;
  }
  return (
    <Fragment>
      <Nav />
      <div className="container">
        <LocationForm />
        {/* <AttendeesList attendees={props.attendees} /> */}
      </div>
    </Fragment>
  );
}

export default App;
