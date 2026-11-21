# Nazif Puzzle Galaxy

A portrait-first 3D maze adventure for mobile browsers, built with Three.js.

## Play

Open the GitHub Pages site: https://inkbymuntaha-alt.github.io/nazeef-puzzle-galaxy-Public/

## Game

- 8 themed worlds and 200 levels.
- Version 7.0: redesigned multi-part Galaxy Guardian with animated horns, glowing eyes and a rotating energy aura.
- Collect three crystals, find the golden key, rescue your space buddy and reach the portal.
- Level 25 in each world includes a Galaxy Guardian.
- Moving alien patrols, energy traps, jetpack jumps, suit colours and level celebrations.
- Touch joystick and jump controls below the game; keyboard arrows or WASD on desktop. Space or W jumps.
- Progress is saved locally in the browser when storage is available.

## Development

- `npm test` checks the embedded game module syntax and required page elements.
- `npm run build` prepares the static web assets in `www/` for Capacitor.
- The Android workflow is separate. Browser gameplay is the first release target; no APK is required to test the game.

## Notes

Three.js is loaded from jsDelivr, and speech uses the voices available in the player's browser or device. Voice quality and availability depend on that device.
