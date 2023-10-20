import { MainApplication } from './scripts/system/App.ts';
import { gsap } from 'gsap';
import { PixiPlugin } from 'gsap/PixiPlugin';
import * as PIXI from 'pixi.js';

gsap.registerPlugin(PixiPlugin);
PixiPlugin.registerPIXI(PIXI);

export const App = new MainApplication();

void App.run();
