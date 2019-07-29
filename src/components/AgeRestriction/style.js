import { css } from 'react-emotion'

export const modalWrapper = css`
  font-size: 15px;

  .buttonsWrapper {
    display: inline;
    text-align: center;
    line-height: 20px;
  }

  .btn {
    border: none;
    color: white;
    padding: 14px 28px;
    font-size: 16px;
    cursor: pointer;
    margin: 5px;
  }

  .success {
    background-color: #4caf50;
  } /* Green */
  .success:hover {
    background-color: #46a049;
  }

  .info {
    background-color: #2196f3;
  } /* Blue */
  .info:hover {
    background: #0b7dda;
  }

  .warning {
    background-color: #ff9800;
  } /* Orange */
  .warning:hover {
    background: #e68a00;
  }

  .danger {
    background-color: #f44336;
  } /* Red */
  .danger:hover {
    background: #da190b;
  }

  .default {
    background-color: #e7e7e7;
    color: black;
  } /* Gray */
  .default:hover {
    background: #ddd;
  }
`
