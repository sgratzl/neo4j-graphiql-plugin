import React from 'react';
import GraphiQL from 'graphiql';


export default class App extends React.Component {

  constructor(props, context) {
    super(props, context);

    const search = window.location.search;
    const parameters = {};
    search.substr(1).split('&').forEach(function (entry) {
      const eq = entry.indexOf('=');
      if (eq >= 0) {
        parameters[decodeURIComponent(entry.slice(0, eq))] = decodeURIComponent(entry.slice(eq + 1));
      }
    });

    // if variables was provided, try to format it.
    if (parameters.variables) {
      try {
        parameters.variables = JSON.stringify(JSON.parse(parameters.variables), null, 2);
      } catch (e) {
        // Do nothing, we want to display the invalid JSON as a string, rather
        // than present an error.
      }
    }

    this.state = parameters;
  }

  onEditQuery = (newQuery) => {
    this.setState({query: newQuery}, this.updateURL);
  }

  onEditVariables = (newVariables) => {
    this.setState({variables: newVariables}, this.updateURL);
  }

  onEditOperationName = (newOperationName) => {
    this.setState({operationName: newOperationName}, this.updateURL);
  }

  updateURL = () => {
    const parameters = this.state;
    const newSearch = '?' + Object.keys(parameters).filter((key) => Boolean(parameters[key])).map((key) => {
      return `${encodeURIComponent(key)}=${encodeURIComponent(parameters[key])}`;
    }).join('&');
    history.replaceState(null, null, newSearch);
  }

  // Defines a GraphQL fetcher using the fetch API. You're not required to
  // use fetch, and could instead implement graphQLFetcher however you like,
  // as long as it returns a Promise or Observable.
  graphQLFetcher = (graphQLParams) => {
    return fetch('/graphql/', {
      method: 'post',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(graphQLParams),
      credentials: 'include',
    }).then((response) => response.text())
      .then((responseBody) => {
      try {
        return JSON.parse(responseBody);
      } catch (error) {
        return responseBody;
      }
    });
  }

  render() {
    const parameters = this.state;

    return <GraphiQL fetcher={this.graphQLFetcher}
      query={parameters.query}
      variables={parameters.variables}
      operationName={parameters.operationName}
      onEditQuery={this.onEditQuery}
      onEditVariables={this.onEditVariables}
      onEditOperationName={this.onEditOperationName}
    />;
  }
}
