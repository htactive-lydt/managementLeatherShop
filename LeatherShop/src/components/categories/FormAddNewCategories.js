import React from "react";

class FormAddNewCategories extends React.Component {
  state = {
    isOpenForm: false,
    newCategory: {
      name: ""
    }
  };
  handleOpenForm = () => {
    this.setState(prevState => ({
      isOpenForm: !prevState.isOpenForm
    }));
  };

  addNewCategory = event => {
    event.preventDefault();
    const {name} = this.state.newCategory;
    //console.log(this.state.newCategory)
    this.props.addNew("categories", this.state.newCategory);
    this.setState({
      isOpenForm: false,
      newCategory: {
        name
      }
    });
  };

  handleChange = event => {
    const value = event.target.value;
    this.setState((prevState) => ({
      ...prevState,
      newCategory: {
        name:value
      }
    }));
  };

  render() {
    const { isOpenForm } = this.state;
    return (
      <div>
        <form>
          <div className="panel panel-default">
            <div className="panel-heading">
              <button
                type="button"
                className="btn"
                onClick={this.handleOpenForm}
              >
                {isOpenForm ? "CANCEL" : "ADD NEW"}
              </button>
            </div>
            {isOpenForm ? (
              <div className="panel-body row" id="form-add">
                <div className="form-group col-md-6">
                  <input
                    type="text"
                    placeholder="Enter category's name"
                    className="form-control"
                    onChange={this.handleChange}
                    required
                  />
                </div>
                <div className="form-group col-md-1">
                  <button
                    type="button"
                    className="btn"
                    onClick={this.addNewCategory}
                  >
                    ADD
                  </button>
                </div>
              </div>
            ) : (
              ""
            )}
          </div>
        </form>
      </div>
    );
  }
}

export default FormAddNewCategories;
