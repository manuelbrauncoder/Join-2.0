import { animate, style, transition, trigger } from '@angular/animations';


const timing = '225ms ease-in';

const horizontalHidden = { transform: 'translateX(120%)' };
const horizontalVisible = { transform: 'translateX(0)' };

const slideInHorizontalCenterHidden = { transform: 'translate(120%, -50%)' };
const slideInHorizontalCenterVisible = { transform: 'translate(-50%, -50%)' };

const verticalHidden = { transform: 'translate(-50%, 1000px)'};
const verticalVisible = { transform: 'translate(-50%, -50%)'};

const popupHidden = { opacity: '0'};
const popupVisible = { opacity: '1'};

export const fadeIn = trigger('fadeIn', [
    transition(':enter', [style(popupHidden), animate(timing, style(popupVisible))]),
    transition(':leave', [style(popupVisible), animate(timing, style(popupHidden))]),
  ]);

/**
 * slide in and out from right to center
 */
export const slideInHorizontal = trigger('slideInHorizontal', [
    transition(':enter', [style(horizontalHidden), animate(timing, style(horizontalVisible))]),
    transition(':leave', [style(horizontalVisible), animate(timing, style(horizontalHidden))]),
])

/**
 * slide in and out from bottom center to center
 */
export const slideInHorizontalCenter = trigger('slideInHorizontalCenter', [
    transition(':enter', [style(slideInHorizontalCenterHidden), animate(timing, style(slideInHorizontalCenterVisible))]),
    transition(':leave', [style(slideInHorizontalCenterVisible), animate(timing, style(slideInHorizontalCenterHidden))]),
])

export const slideInVertical = trigger('slideInVertical', [
    transition(':enter', [style(verticalHidden), animate(timing, style(verticalVisible))]),
    transition(':leave', [style(verticalVisible), animate(timing, style(verticalHidden))]),
])



