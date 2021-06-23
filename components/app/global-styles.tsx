import {Global, css} from "@emotion/react"

export const GlobalStyles = () => (
  <Global
    styles={css`
      @font-face {
        font-family: "HCo Operator Mono";
        src: url("/fonts/operator/OperatorMono-BookItalic_Web.woff2") format("woff2");
        font-weight: 400;
        font-style: normal;
      }

      @font-face {
        font-family: "HCo Operator Mono";
        src: url("/fonts/operator/OperatorMono-Book_Web.woff2") format("woff2");
        font-weight: 400;
        font-style: italic;
      }

      @font-face {
        font-family: "HCo Operator Mono";
        src: url("/fonts/operator/OperatorMono-BoldItalic_Web.woff2") format("woff2");
        font-weight: 700;
        font-style: normal;
      }

      @font-face {
        font-family: "HCo Operator Mono";
        src: url("/fonts/operator/OperatorMono-Bold_Web.woff2") format("woff2");
        font-weight: 700;
        font-style: italic;
      }

      @font-face {
        font-family: "radnika";
        src: url("/fonts/RadnikaNext/RadnikaNext-Black.woff2") format("woff2");
      }
      @font-face {
        font-family: "radnika";
        src: url("/fonts/RadnikaNext/RadnikaNext-Medium.woff2") format("woff2");
      }

      :root {
        /* fonts */
        --radnika: "radnika", sans-serif;
        --mono: "Operator Mono", "Inconsolata", Consolas, Monaco, "Andale Mono", "Ubuntu Mono",
          monospace;

        /* Colors */
        --color-text-primary: #225feb;
        --color-text-text: #212732;
        --color-text-white: #fff;
        --color-bg-background: #fff;
        --color-bg-navigation: hsla(0, 0%, 100%, 0.9);
        --color-bg-black: #0e182a;
        --color-gray-100: #f0f2f7;
        --color-gray-200: #e2e7ed;
        --color-gray-300: #d8dee6;
        --color-gray-400: #c3ced8;
        --color-gray-500: #a0aec0;
        --color-gray-600: #718096;
        --color-gray-700: #4a5568;
        --color-gray-800: #293448;
        --color-gray-900: #1a202c;
        --color-react: #1e75d9;

        /* sizes */
        --h1: 3.052rem;
        --h2: 2.441rem;
        --h3: 1.953rem;
        --h4: 1.563rem;
        --h5: 1.25rem;
        --maxWidth: 1200px;
        --header-height: 10rem;
        --footer-height: 10rem;

        /* Elevations */
        --shadow-s: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
        --shadow-default: 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06);
        --shadow-md: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
        --shadow-lg: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
        --shadow-xl: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
        --shadow-2xl: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
        --shadow-3xl: 0 35px 60px -15px rgba(0, 0, 0, 0.3);
        --shadow-inner: inset 0 2px 4px 0 rgba(0, 0, 0, 0.06);
      }

      *::before,
      *::after,
      * {
        margin: 0;
        padding: 0;
        box-sizing: inherit;
      }
      html {
        font-size: 100%;
        font-family: var(--radnika);
      }
      body {
        height: 100%;
        box-sizing: border-box;
        font-weight: normal;
        line-height: 1.75;
        color: var(--color-text-text);
        background-color: var(--color-bg-background);
      }

      body[data-theme="light"] {
        --color-text-primary: #225feb;
        --color-text-text: #212732;
        --color-text-white: #fff;
        --color-bg-background: #fff;
        --color-bg-navigation: hsla(0, 0%, 100%, 0.9);
        --color-bg-black: #0e182a;
        --color-gray-100: #f0f2f7;
        --color-gray-200: #e2e7ed;
        --color-gray-300: #d8dee6;
        --color-gray-400: #c3ced8;
        --color-gray-500: #a0aec0;
        --color-gray-600: #718096;
        --color-gray-700: #4a5568;
        --color-gray-800: #293448;
        --color-gray-900: #1a202c;
        --color-react: #1e75d9;
      }
      body[data-theme="dark"] {
        --color-text-primary: #81a7ff;
        --color-text-text: #fff;
        --color-text-white: #fff;
        --color-bg-background: #0e182a;
        --color-bg-navigation: rgba(14, 24, 42, 0.9);
        --color-bg-black: #0e182a;
        --color-gray-100: #132035;
        --color-gray-200: #222f44;
        --color-gray-300: #384357;
        --color-gray-400: #718096;
        --color-gray-500: #a0aec0;
        --color-gray-600: #cbd5e0;
        --color-gray-700: #e2e8f0;
        --color-gray-800: #edf2f7;
        --color-gray-900: #f7fafc;
        --color-react: #9eddf8;
      }

      h1,
      h2,
      h3,
      h4,
      h5,
      h6 {
        margin-bottom: 0.5rem;
        font-family: var(--mono);
        font-weight: normal;
        line-height: 1.5;
      }

      p,
      ul,
      ol {
        line-height: 1.7;
        font-weight: 400;
        list-style: none;
        font-family: var(--radnika);
      }
      a {
        text-decoration: none;
      }
    `}
  />
)
