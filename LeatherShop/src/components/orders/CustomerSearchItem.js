import React from "react";

export default function CustomerSearchItem(props) {

  const { name, phoneNumber, score } = props.item;
  return (
    <li className="list-group-item checkbox">
      <div className="row">
        <div className="col-md-3 offset-md-1">
          <p>{name}</p>
        </div>
        <div className="col-md-3">
          <p>{phoneNumber}</p>
        </div>
        <div className="col-md-2">
          <p>{score > 10 ? (score-10 ) : 0} %</p>
        </div>
        <div> 
          <button
            className="btn btn-warning margin btn-control"
            type="button"
          >
            <i className="fa fa-arrow-right" />
          </button>
        </div>
        &nbsp;
      </div>
    </li>
  );
}
