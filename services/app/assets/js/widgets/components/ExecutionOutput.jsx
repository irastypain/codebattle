import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

class ExecutionOutput extends PureComponent {
  renderStatusBadge = (status) => {
    const stautsColors = {
      error: 'danger',
      failure: 'warning',
      ok: 'success',
      nothing: 'info',
    };

    return <span className={`badge badge-${stautsColors[status]}`}>{status}</span>;
  };

  renderTestResults = (resultObj) => {
    switch (resultObj.status) {
      case '':
        return 'Run your code!';
      case 'error':
        return `You have some syntax errors: ${resultObj.result}`;
      case 'failure':
        if (Array.isArray(resultObj.result)) {
          return `Test falls with arguments (${resultObj.result.map(JSON.stringify).join(', ')})`;
        }
        return `Test falls with arguments (${JSON.stringify(resultObj.result)})`;
      case 'ok':
        return 'Yay! All tests are passed!!111';
      default:
        return 'Oops';
    }
  };

  parseOutput = (result) => {
    try {
      return JSON.parse(result || '{"result": "nothing", "status": "nothing"}');
    } catch (e) {
      return { result: 'something went wrong!', status: 'error' };
    }
  };

  render() {
    const { output: { output, result } = {} } = this.props;
    const resultObj = this.parseOutput(result);

    return (
      <div className="card-body border-top">
        <div className="d-flex justify-content-between">
          <h6 className="card-title">Output</h6>
          <div className="card-subtitle mb-2 text-muted">
            Check status:
            {' '}
            {this.renderStatusBadge(resultObj.status)}
          </div>
        </div>
        <p className="card-text mb-0">
          <code>{this.renderTestResults(resultObj)}</code>
        </p>
        <pre className="card-text d-none d-md-block mt-3">{output}</pre>
      </div>
    );
  }
}

export default ExecutionOutput;
