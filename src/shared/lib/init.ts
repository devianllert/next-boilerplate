import { createEvent } from 'effector';
import { NextPageContext } from 'next';

export const appStarted = createEvent<NextPageContext>();

appStarted.watch(() => console.log('APP STARTED'));
