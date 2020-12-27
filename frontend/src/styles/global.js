import { createGlobalStyle } from 'styled-components';

export default createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    outline: none;
  }

  body {
    background: var(--secondary);
    color: var(--text);
    -webkit-font-smoothing: antialiased;
  }

  body, button, input {
    font-family: 'Roboto Slab', serif;
    font-size: 16px; 
  }

  h1, h2, h3, h4, strong {
    font-weight: 500;
  }

  button {
    cursor: pointer;
  }

  a {
    text-decoration: none;
  }

  :root {
    --primary: #FF9000;
    --secondary: #312E38;
    --grey: #232129;
    --text: #f4ede8;
    --textGrey: #999591;
    --placeholder: #666360;
    --error: #c53030;
    --darkGrey: #26282d;
    --shape: #3E3B47;
  }
`;
