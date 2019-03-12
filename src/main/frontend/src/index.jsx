import 'file-loader?name=./index.html!./index.html';
import './index.css';
import React from 'react';
import {render} from 'react-dom';
import GraphiQL from 'graphiql';


// Parse the search string to get url parameters.
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
// When the query and variables string is edited, update the URL bar so
// that it can be easily shared
function onEditQuery(newQuery) {
  parameters.query = newQuery;
  updateURL();
}

function onEditVariables(newVariables) {
  parameters.variables = newVariables;
  updateURL();
}

function onEditOperationName(newOperationName) {
  parameters.operationName = newOperationName;
  updateURL();
}

function updateURL() {
  const newSearch = '?' + Object.keys(parameters).filter((key) => Boolean(parameters[key])).map((key) => {
    return encodeURIComponent(key) + '=' + encodeURIComponent(parameters[key]);
  }).join('&');
  history.replaceState(null, null, newSearch);
}

// Defines a GraphQL fetcher using the fetch API. You're not required to
// use fetch, and could instead implement graphQLFetcher however you like,
// as long as it returns a Promise or Observable.
function graphQLFetcher(graphQLParams) {
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

// Render <GraphiQL /> into the body.
// See the README in the top level of this module to learn more about
// how you can customize GraphiQL by providing different values or
// additional child elements.
render(
  <GraphiQL fetcher={graphQLFetcher}
    query={parameters.query}
    variables={parameters.variables}
    operationName={parameters.operationName}
    onEditQuery={onEditQuery}
    onEditVariables={onEditVariables}
    onEditOperationName={onEditOperationName}
  />,
  document.getElementById('graphiql')
);
