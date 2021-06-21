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
        --light-blue: #9eddf8;
        --white: #fffffe;
        --grey: #718096;
        --grey-light: #cbd5e0;
        --dark-blue: #384357;
        --blue: #b8c1ec;
        --dark: #0e182a;
        --dark-secondary: #121629;
        --dark-third: #232946;
        --pink: #eebbc3;
        --pink-darker: #d4939d;

        /* sizes */
        --h1: 3.052rem;
        --h2: 2.441rem;
        --h3: 1.953rem;
        --h4: 1.563rem;
        --h5: 1.25rem;
        --maxWidth: 1200px;

        /* elements */
        --background: var(--dark);
        --headline: var(--white);
        --paragraph: var(--white);
        --paragraph2: var(--blue);
        --button: var(--pink);
        --buttonText: var(--dark);

        /* Illustration */
        --stroke: var(--dark-secondary);
        --main: var(--blue);
        --highlight: var(--pink);
        --highlight-2: var(--pink-darker);
        --secondary: var(--white);
        --tertiary: var(--pink);

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
        color: var(--paragraph);
        background-color: var(--background);
      }

      body[data-theme="light"] {
        /* elements */
        --background: var(--white);
        --headline: var(--dark-secondary);
        --paragraph: var(--dark-third);
        --paragraph2: var(--blue);
        --button: var(--dark-secondary);
        --buttonText: var(--pink);

        /* Illustration */
        --stroke: var(--dark-secondary);
        --main: var(--blue);
        --highlight: var(--pink);
        --highlight-2: var(--pink-darker);
        --secondary: var(--white);
        --tertiary: var(--pink);
      }
      body[data-theme="dark"] {
        /* elements */
        --background: var(--dark);
        --headline: var(--white);
        --paragraph: var(--white);
        --paragraph2: var(--blue);
        --button: var(--pink);
        --buttonText: var(--dark);

        /* Illustration */
        --stroke: var(--dark-secondary);
        --main: var(--blue);
        --highlight: var(--pink);
        --highlight-2: var(--pink-darker);
        --secondary: var(--white);
        --tertiary: var(--pink);
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
