const CreateTodoForm = () => {
  return (
    <form onSubmit={(event) => this.handleSubmit(event)}>
      <div className="form-group">
        <label for="login">name</label>
        <input
          type="text"
          className="form-control"
          name="name"
          //   value={this.state.name}
          //   onChange={(event) => this.handleChange(event)}
        />
      </div>
      <div className="form-group">
        <label for="author">author</label>
        <input
          type="number"
          className="form-control"
          name="author"
          //   value={this.state.author}
          //   onChange={(event) => this.handleChange(event)}
        />
      </div>
      <input type="submit" className="btn btn-primary" value="Save" />
    </form>
  );
};

export default CreateTodoForm;
