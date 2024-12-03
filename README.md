# Confetti Animation Library 🎉

A lightweight and customizable library to create confetti animations using JavaScript. You can use it to add a fun and engaging confetti effect to any element on your webpage.

---

## Features
- Easy to integrate.
- Customizable properties such as confetti size, velocity, and spin.
- Supports multiple confetti images.
- Works with any CSS selector (`body`, `#id`, `.class`).

---

## Installation

 Add the script file to your project:
```javascript
   import { createConfettiInstance } from './index';
```

## Usage

### Step 1: Create an Instance
Use the `createConfettiInstance` function to initialize the confetti animation.

```javascript
 const confetti = createConfettiInstance({
   selector: 'body', // CSS selector for the parent element
   position: { x: window.innerWidth / 2, y: window.innerHeight / 2 }, // Confetti origin
   images: ['confetti1.png', 'confetti2.png', 'confetti3.png'], // Array of image URLs
   });
```
### Step 2: Trigger the Confetti
Call the generate() method to start the animation.

```javascript
  confetti.generate().then(() => {
  console.log('Confetti animation completed!');
});
```

## Configuration Properties

| Property          | Type        | Description                                                                                  | Default                      |
|--------------------|-------------|----------------------------------------------------------------------------------------------|------------------------------|
| `selector`         | `string`    | CSS selector for the element where the confetti will be appended (e.g., `body`, `.class`, `#id`). | **Required**                |
| `position`         | `object`    | Origin point for confetti, with `x` and `y` coordinates as numbers.                          | **Required**                |
| `images`           | `string[]`  | Array of URLs pointing to confetti images.                                                   | **Required**                |
| `sizes`            | `number[]`  | Array of possible sizes for confetti particles (in pixels).                                  | `[10, 15, 20, 25, 30, 35]`  |
| `limit`            | `number`    | Maximum number of confetti particles to generate at a time.                                  | `50`                        |
| `yVelocityMax`     | `number`    | Maximum vertical velocity for confetti particles.                                            | `40`                        |
| `xVelocityMax`     | `number`    | Maximum horizontal velocity for confetti particles.                                          | `15`                        |
| `spinVelocityMax`  | `number`    | Maximum rotational velocity (spin speed) for confetti particles.                             | `35`                        |

