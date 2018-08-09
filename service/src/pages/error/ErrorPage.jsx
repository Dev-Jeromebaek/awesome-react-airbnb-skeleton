import React, { Component } from 'react';

class ErrorPage extends Component {
  render() {
    const { errorCode, errorText } = this.props;
    return (
      <div
        className="d-flex justify-content-center align-items-center"
        style={{ height: '100%', width: '100%' }}
      >
        <div role="main" style={{ margin: '0', padding: '0' }}>
          <div
            style={{
              width: '590px',
              margin: '0 auto',
              padding: '0',
              minHeight: '100%',
            }}
          >
            <div
              style={{
                padding: '140px 0 50px',
                background:
                  'url(//t1.daumcdn.net/tistory_admin/static/top/bg_error.gif) no-repeat 50% 50px',
                textAlign: 'center',
              }}
            >
              <h3
                style={{
                  fontSize: '18px',
                  lineHeight: '32px',
                  color: '#333',
                  letterSpacing: '-1px',
                }}
              >
                데이터를 불러올 수 없습니다.
              </h3>
              <div
                style={{
                  width: '550px',
                  padding: '15px 10px',
                  margin: '30px auto 0',
                  fontSize: '13px',
                  lineHeight: '24px',
                  color: '#919191',
                  // backgroundColor: '#fafafa',
                  letterSpacing: '-1px',
                }}
              >
                잠시 후 다시 시도해 주세요.<br />
                Error Code : {errorCode}
                <br />
                Error Message : {errorText}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default ErrorPage;
