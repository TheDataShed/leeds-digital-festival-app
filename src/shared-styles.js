import { css } from 'lit-element/lit-element';

/* shared styles for all views */
export const sharedStyles = css`
      html,
      :host>* {
        --pink-color: #E200B2;
        --blue-color: #0511f5;
        --light-black-color: #3E3E3A;
        --black-color: #1D1D1B;
        --light-grey-color: #F5F5F5;
        --grey-color: #EAEAEA;
        --dark-grey-color: #E2E2E2;
        --white-color: #FFFFFF;
        --error-color: red;
      }

      a {
        text-decoration: none;
        color: var(--black-color);
      }

      /**
      * Add the correct display in IE 10-.
      */

      [hidden] {
        display: none;
      }`;
