import { Component } from 'react';

export class SearchBar extends Component {
  state = { input: '' };

  handleChange = e => {
    this.setState({ input: e.target.value });
  };

  onSubmit = e => {
    e.preventDefault();
    this.props.onSubmit(this.state.input);
  };
  render() {
    return (
      <header className="Searchbar">
        <form onSubmit={this.onSubmit} className="SearchForm">
          <button type="submit" className="SearchForm-button">
            <span className="button-label"></span>
          </button>

          <input
            onChange={this.handleChange}
            className="SearchForm-input"
            type="text"
            autoFocus
            placeholder="Search images and photos"
          />
        </form>
      </header>
    );
  }
}
export default SearchBar;
