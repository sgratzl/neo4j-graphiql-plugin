import * as React from 'react';


interface ISchemaProps {

}

interface ISchemaState {

}

export default class Schema extends React.Component<ISchemaProps, ISchemaState> {
  render() {
    return <div>
      <div className="history-title-bar">
        <div className="history-title"></div>
        <div className="doc-explorer-rhs">
          {this.props.children}
        </div>
      </div>
      <textarea className="history-contents">
        Test
      </textarea>
    </div>;
  }
}
