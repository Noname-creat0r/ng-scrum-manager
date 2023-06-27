import {
    trigger,
    transition,
    style,
    query,
    group,
    animateChild,
    animate,
    keyframes,
  } from '@angular/animations';

export const slider =
  trigger('routeAnimations', [
    transition('* => isLeft', slideTo('left') ),
    transition('* => isRight', slideTo('right') ),
    transition('isRight => *', slideTo('left') ),
    transition('isLeft => *', slideTo('right') )
  ]);

function slideTo(direction: string) {
  return [
    query(':enter, :leave', [
        style({
          position: 'absolute',
          width: '100%',
          opacity: 0,
        }),
      ]),
      // Animate the new page in
      query(':enter', [
        animate('1s ease', style({ opacity: 1 })),
      ]),
     
    ]
  
}


