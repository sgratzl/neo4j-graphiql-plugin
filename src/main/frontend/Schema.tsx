import * as React from 'react';
import {bind} from 'decko';
import GraphiQL from 'graphiql';


interface ISchemaProps {
  goBack(): void;
  fetchSchema(): Promise<string>;
  postSchema(schema: string): Promise<string>;
}

interface ISchemaState {
  schema: string | null;
  isRunning: boolean
}

export default class Schema extends React.Component<ISchemaProps, ISchemaState> {
  constructor(props: ISchemaProps, context: any) {
    super(props, context);

    this.state = {
      schema: null,
      isRunning: false
    };

    props.fetchSchema().then((schema) => this.setState({schema}));
  }

  @bind
  private onChange(evt: React.ChangeEvent<HTMLTextAreaElement>) {
    const schema = (evt.currentTarget as HTMLTextAreaElement).value;
    this.setState({schema});
  }

  @bind
  private changeSchema() {
    this.setState({isRunning: true});
    this.props.postSchema(this.state.schema!).then(() => {
      this.setState({isRunning: false});
    }).catch(() => {
      this.setState({isRunning: false});
    });
  }

  render() {
    const text = this.state.schema || 'Loading...';
    const pathJSX = this.state.isRunning
    ? <path d="M 10 10 L 23 10 L 23 23 L 10 23 z" />
    : <path d="M 11 9 L 24 16 L 11 23 z" />;

    return <div className="graphiql-container">
      <div className="editorWrap">
        <div className="topBarWrap">
          <div className="topBar">
            <GraphiQL.Logo />
            <div className="execute-button-wrap">
              <button
                type="button"
                className="execute-button"
                onClick={this.changeSchema}
                title="Update Schema">
                <svg width="34" height="34">{pathJSX}</svg>
              </button>
            </div>
            <GraphiQL.Toolbar>
              <GraphiQL.Button
                onClick={this.props.goBack}
                title="Back to Editor"
                label="<< Back"
              />
            </GraphiQL.Toolbar>
          </div>
        </div>
        <div className="editorBar">
          {this.state.schema == null &&
            <div className="spinner-container">
              <div className="spinner" />
            </div>}
          <textarea className="schema-contents" value={text} onChange={this.onChange}>
            {text}
          </textarea>
        </div>
      </div>
    </div>;
  }
}
