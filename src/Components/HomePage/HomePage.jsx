import React from "react";

export default function HomePage({history}) {
  return (
    <div>
      <div className="ui inverted vertical masthead center aligned segment">
        <div className="ui text container">
          <h1 className="ui inverted stackable header">
            <img
              className="ui image massive"
              src="/assets/logo.png"
              alt="logo"
            />
            <div className="content">Bandwagon</div>
          </h1>
          <h2>Create Music. Make Friends.</h2>
          <div onClick={()=> history.push('/bands')} className="ui huge white inverted button">
            Start Jamming
            <i className="right arrow icon" />
          </div>
        </div>
      </div>
    </div>
  );
}
