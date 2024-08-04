# TypeShuffle

TypeShuffle is a JavaScript library for creating animated text effects by manipulating the characters of text elements. It leverages the Splitting.js library to split text into lines, words, and characters, and provides multiple animation effects to create visually appealing text transformations.

## Features

- **Text Splitting**: Utilizes Splitting.js to break text into lines, words, and characters.
- **Text Animation**: Provides several predefined text animation effects.
- **Customizable**: Allows customization of animation effects and text splitting options.

## Usage

### Installation

Include the necessary scripts in your HTML file:

```html
<script src="shuffle.js"></script>
```

### Basic Usage

1. Create a text element in your HTML:

```html
<div id="animated-text">Your text here</div>
```

2. Initialize TypeShuffle and trigger an animation effect:

```html
<script>
document.addEventListener('DOMContentLoaded', () => {
    const textElement = document.getElementById('animated-text');
    const typeShuffle = new TypeShuffle(textElement);
    typeShuffle.trigger('fx1'); // Trigger effect fx1
});
</script>
```

### Available Effects

TypeShuffle comes with several predefined animation effects that can be triggered using the `trigger` method. Here are the available effects:

- `fx1`: Clears cells and animates each line's cells with delays per line and per cell.
- `fx2`: Clears cells and animates with opacity transitions.
- `fx3`: Randomly animates cells with delays.
- `fx4`: Creates a sliding animation effect from left to right.
- `fx5`: Animates with color transitions and sliding effect.
- `fx6`: Animates with random color transitions and delays.

### Example

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>TypeShuffle Example</title>
    <style>
        #animated-text {
            font-size: 2em;
            line-height: 1.5;
        }
    </style>
</head>
<body>
    <div id="animated-text">Hello, TypeShuffle!</div>

    <script src="shuffle.js"></script>
    <script>
        document.addEventListener('DOMContentLoaded', () => {
            const textElement = document.getElementById('animated-text');
            const typeShuffle = new TypeShuffle(textElement);
            typeShuffle.trigger('fx1');
        });
    </script>
</body>
</html>
```

## API Reference

### TypeShuffle Class

#### Constructor

`new TypeShuffle(DOM_el)`

- `DOM_el`: The main text element to apply the animations.

#### Methods

- `trigger(effect)`: Triggers the specified animation effect.

  - `effect`: The name of the effect to trigger (e.g., 'fx1', 'fx2').

For more detailed information, please refer to the full documentation available on [codrops - TypeShuffleAnimation](https://github.com/codrops/TypeShuffleAnimation?tab=readme-ov-file).
