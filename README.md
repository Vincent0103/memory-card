# Memory Chainsaw

## Description

This project is part of the TOP curriculum, a project made to enhance my knowledge of useEffect React Hooks.

It showcases a typical memory card game where the user is confronted with a bunch of rounds where in each round he has to choose a character he hasn't clicked before. If he clicked the same character he clicked before, he loses else he wins. The game is composed of 22 rounds where the difficulty gradually increases.

It's Chainsaw Man themed game with beautiful visuals playing on the background or on the interactive cards. It is also fairly hard to win so if you hope onto playing this game, i wish you luck.

I also went to deepen my knowledge with other built-in React hooks like useRef or useCallback, played around with community made packages (react-parallax-tint). I heavily used tailwindcss for better responsiveness and for better looking styling.

## Features

- Highly responsive website (works for mobiles, tablets and desktop type screens).
- Difficulty system that gradually increases, all cards are shuffled for each round with 2 unclicked cards appearing for each round, 1 card for hard difficulty.
- Sound design, implementation of themed music where the tempo gets faster as the user is continuing the game.
- Sound effects for clickable elements (btns and cards).
- Main menu with interactable and dynamic setting buttons.
- Beautifully transitioned elements giving that "windows" effect.
- Heavy animations on cards with react-parallax-tint, shuffle animation and specific custom card styling.
- lose/win screen when conditions are met.
- lose screen styled in a dark souls / GTA V type.

## Technologies Used

- **Programming Language**: Javascript
- **Programming Framework**: React
- **Testing Framework**: Vitest
- **CSS Framework**: TailwindCSS
- **Additional Technologies**: Check the devDependencies in [packages.json](./package.json)

## Getting Started

- Clone the repository: git clone https://github.com/your-username/memory-card.git
- Navigate to the project directory: cd memory-card
- Install dependencies: npm install or yarn install
- Run the tests: npm test or yarn test

## Testing

all the tests are located in [tests](./src/components/tests/).

## License

This project is licensed under the MIT License.

## Acknowledgements

- [Kensuke Ushio](https://en.wikipedia.org/wiki/Kensuke_Ushio) for providing the free to use Chainsaw Man music (Chainsaw Man OST - Buddy and Chainsaw Man OST - Dream... Come True?).
- [Amazing Shots](https://www.youtube.com/@AmazingShots) for providing wonderful Chainsaw Man Anime visuals.
- [Soundsnap](https://www.soundsnap.com/) for providing free to use sound effects. (button clicks, card shuffles...)
- [Tatsuki Fujimoto](https://fr.wikipedia.org/wiki/Chainsaw_Man) for making one of the best anime of the decade and made me inspired so much to make this look of the website !
- [The Odin Project](https://www.theodinproject.com/) for providing valuable resources and guidance aiming towards becoming a full-stack developer !
