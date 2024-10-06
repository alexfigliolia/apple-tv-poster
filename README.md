# Apple TV Poster
An easy to use Apple TV-like parallax poster for the Web and React.

<video title="Demo" src="https://github.com/user-attachments/assets/29d1cae0-26e4-412d-ab08-47a8fac0e2ca" height="auto" width="auto"></video>

## Installation
```bash
npm i @figliolia/apple-tv-poster
# or
yarn add @figliolia/apple-tv-poster
```

## Basic Usage
To create a simple Poster, wrap your content in `Poster` tags and begin styling using the class names of your choosing or inline-styles
```tsx
import { Poster } from "@figliolia/apple-tv-poster";

export const MyPoster = () => {
  return (
    <Poster 
      className="my-poster"
      style={{ 
        width: 300,
        height: 500,
        backgroundSize: "cover",
        background: `url('./background.png') no repeat center`
      }}>
      <div>
        <h1>Great Movie</h1>
        <button>Watch Now</button>
      </div>
    </Poster>
  );
}
```
And that's it! Your poster will animate in 3D space during mouse/touch interactions!

## Advanced Usage - Parallax Poster Content
To create parallax effects inside your posters, the `Poster` component exposes an `onRotation` property. This property receives the x and y rotations as parameters and allows you to compute your own animations based on these values.

```tsx
import { Poster, useParallaxContent } from "@figliolia/apple-tv-poster";

export const MyParallaxPoster = () => {
  const [x, setX] = useState(0);
  const [y, setY] = useState(0);

  const onRotation = useCallback((x: number, y: number) => {
    setX(y / -2.5);
    setY(x / -2.5);
  }, []);

  return (
    <Poster 
      onRotation={onRotation}
      className="my-parallax-poster"
      style={{ 
        width: 300,
        height: 500,
        backgroundSize: "cover",
        background: `url('./background.png') no repeat center`
      }}>
      <div style={{
        transform: `translateY(${y}px) translateX(${x}px)`
      }}>
        <h1>Great Movie</h1>
        <button>Watch Now</button>
      </div>
    </Poster>
  );
}
```
Now your poster content will transition along with your poster's rotation - creating a cool parallax effect!


## Parallax Poster Content - `useParallaxContent()`
To simplify creating parallax poster content, this library exports a `useParallaxContent()` hook. The hook returns an `onRotation` function for your `Poster` and a `style` object to pass to your poster's children.
```tsx
import { Poster, useParallaxContent } from "@figliolia/apple-tv-poster";

export const MyParallaxPoster = () => {
  const [onRotation, parallaxStyles] = useParallaxContent();
  return (
    <Poster 
      onRotation={onRotation}
      className="my-parallax-poster"
      style={{ 
        width: 300,
        height: 500,
        backgroundSize: "cover",
        background: `url('./background.png') no repeat center`
      }}>
      <div style={parallaxStyles}>
        <h1>Great Movie</h1>
        <button>Watch Now</button>
      </div>
    </Poster>
  );
}
```
This hook handles the interpolation of rotation values for your content and smooths animations when mousing in and out of your posters

### Browser Support
This package relies on CSS variables in order to function. For more detailed information on specific browser version support, please reference the [Can I Use CSS Variables](https://caniuse.com/?search=CSS%20variables) support tables.
