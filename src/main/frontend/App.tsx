/// <reference path="../../../declarations.d.ts"/>
import React from 'react';
import {bind} from 'decko';
import GraphiQL from 'graphiql';
import Schema from './Schema';

interface IAppProps {

}

interface IAppState {
  variables?: string;
  query?: string;
  operationName?: string;
  schema: boolean;
}

export default class App extends React.Component<IAppProps, IAppState> {
  private g: any;

  constructor(props: IAppProps, context: any) {
    super(props, context);

    const search = window.location.search;
    const parameters: IAppState = {
      schema: false
    };
    search.substr(1).split('&').forEach(function (entry) {
      const eq = entry.indexOf('=');
      if (eq >= 0) {
        const key = decodeURIComponent(entry.slice(0, eq)) as keyof IAppState;
        (parameters as any)[key] = decodeURIComponent(entry.slice(eq + 1));
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

  @bind
  private onEditQuery(newQuery: string) {
    this.setState({query: newQuery}, this.updateURL);
  }

  @bind
  private onEditVariables(newVariables: string) {
    this.setState({variables: newVariables}, this.updateURL);
  }

  @bind
  private onEditOperationName(newOperationName: string) {
    this.setState({operationName: newOperationName}, this.updateURL);
  }

  @bind
  private handlePrettifyQuery() {
    return this.g.handlePrettifyQuery();
  }

  @bind
  private handleMergeQuery() {
    return this.g.handleMergeQuery();
  }

  @bind
  private handleToggleHistory() {
    return this.g.handleToggleHistory();
  }

  @bind
  private handleShowSchema() {
    this.setState({schema: !this.state.schema});
  }

  @bind
  private updateURL() {
    const parameters: any = this.state;
    const newSearch = '?' + Object.keys(parameters).filter((key) => Boolean(parameters[key])).map((key) => {
      return `${encodeURIComponent(key)}=${encodeURIComponent(parameters[key])}`;
    }).join('&');
    history.replaceState(null, 'GraphiQL', newSearch);
  }

  // Defines a GraphQL fetcher using the fetch API. You're not required to
  // use fetch, and could instead implement graphQLFetcher however you like,
  // as long as it returns a Promise or Observable.
  @bind
  private graphQLFetcher(graphQLParams: any) {
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

  @bind
  private fetchSchema() {
    return fetch('/graphql/idl', {
      method: 'get',
      credentials: 'include',
    }).then((response) => response.text());
  }

  @bind
  private postSchema(schema: string) {
    return fetch('/graphql/idl', {
      method: 'post',
      body: schema,
      credentials: 'include',
    }).then((response) => response.text());
  }

  render() {
    const parameters = this.state;

    const toolbar = <GraphiQL.Toolbar>
      <GraphiQL.Button
        onClick={this.handlePrettifyQuery}
        title="Prettify Query (Shift-Ctrl-P)"
        label="Prettify"
      />
      <GraphiQL.Button
        onClick={this.handleMergeQuery}
        title="Merge Query (Shift-Ctrl-M)"
        label="Merge"
      />
      <GraphiQL.Button
        onClick={this.handleToggleHistory}
        title="Show History"
        label="History"
      />
      <GraphiQL.Button
        onClick={this.handleShowSchema}
        label="Schema"
        title="Shema"
      />
    </GraphiQL.Toolbar>;

    if (this.state.schema) {
      return <Schema goBack={this.handleShowSchema} fetchSchema={this.fetchSchema} postSchema={this.postSchema} />;
    }

    return <GraphiQL ref={(ref: any) => this.g = ref} fetcher={this.graphQLFetcher}
      query={parameters.query}
      variables={parameters.variables}
      operationName={parameters.operationName}
      onEditQuery={this.onEditQuery}
      onEditVariables={this.onEditVariables}
      onEditOperationName={this.onEditOperationName}
    >
      {toolbar}
    </GraphiQL>;
    }
  }
