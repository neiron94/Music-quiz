# Music Quiz

## Project Overview

**Music Quiz** is a fully client-side web application that lets users test their musical knowledge through an interactive quiz. It is built using pure JavaScript, HTML, and CSS—without any external libraries or frameworks.

## Features

- Interactive quiz with customizable settings
- Multiple quiz modes: guess songs or musicians
- Smart dynamic form with validation and logic
- Responsive design using Flexbox and Grid
- Service worker support for offline usage
- Proper browser history navigation using History API
- Visual enhancements with transitions and SVG animations
- Data persistence via Local Storage

---

## Sections

The website consists of four main sections:

- **Home**
- **Play (Quiz)**
- **Genres**
- **Musicians**

Only one section is visible at a time.

### Home

The Home section provides a general introduction and overview of the website.

### Play (Quiz)

This is the core section, containing the actual quiz. It includes three sequential parts:

#### 1. Set Up Form

The setup form lets users configure the quiz:

- **Game Mode**: Guess songs or musicians.
- **Mode Settings**:
    - For *song* mode: guess by genre, musician, or all.
    - For *musician* mode: guess by genre or all.
- **General Settings**:
    - Listen duration (short / normal / long)
    - Question replay limit
    - Number of questions

Form inputs are shown or hidden dynamically using a **Finite Deterministic Automaton (FDA)**. The maximum value for the question count is also dynamically adjusted.

The form state can be pre-configured via URL GET parameters (see **Genres** and **Musicians** sections).

After submission, the quiz is generated and the next part is displayed.

#### 2. Quiz

The quiz consists of a series of questions. Each question includes:

- An audio clip (with limited replays)
- Four answer options (one correct)
- Visual and audio feedback after answering:
    - The answer image flips using 3D transformation
    - A longer version of the song plays
    - A "Next" button appears

All quiz progress is saved to **Local Storage** to ensure data persistence.

#### 3. Results

At the end of the quiz, the results screen shows:

- Number of correct answers
- A "New Quiz" button to restart from the setup form

### Genres

This section is generated dynamically from a configuration file and includes:

- Information about available music genres
- Preconfigured quiz launch buttons for each genre (using URL parameters)

### Musicians

Similar to the Genres section, but focused on musicians. Clicking a musician’s button pre-fills the quiz form accordingly.

---

## Technical Implementation

### Responsive Design

- Layout built using **Flexbox** and **CSS Grid**
- Responsive behavior controlled with **media queries**

### History Navigation

- The app uses the **History API** for proper back/forward navigation
- URL reflects the current app state

### Offline Support

- A **Service Worker** is implemented to allow offline access

### SVG and Media Control

- The replay button is an **SVG element** controlled via JavaScript
- Audio playback is fully handled in JavaScript

### Transitions and Animations

- **CSS transitions** and **3D transforms** enhance the UX:
    - Flipping answer images
    - Animating replay button
    - Changing button backgrounds
- **Vendor prefixes** ensure cross-browser compatibility

### JavaScript OOP

- The app utilizes standard **JavaScript classes**
- Prototype inheritance is used to extend the `Array` class in `utils.js`

### Advanced JavaScript APIs

- **Local Storage** is used to store the current quiz state
- **History API** and **Location API** ensure proper navigation and deep-linking support
