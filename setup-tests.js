// optional: configure or set up a testing framework before each test
// if you delete this file, remove `setupFilesAfterEnv` from `jest.config.js`

// used for __tests__/testing-library.js
// learn more: https://github.com/testing-library/jest-dom
import "@testing-library/jest-dom/extend-expect"

// if (!SVGElement.prototype.getTotalLength) {
//   SVGElement.prototype.getTotalLength = () => 1
// }

window.SVGElement.prototype.getTotalLength = () => jest.fn()
