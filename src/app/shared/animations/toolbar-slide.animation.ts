import { animation, style, animate, trigger, transition, state} from "@angular/animations";

export const slideYAnimation = trigger('isHidden', [
   transition('shown => hidden', [
      style({
         transform: 'translateY(-50%)',
         opacity: '0'
      }),
      animate(500)
   ]),
  transition('hidden => show', [
      style({
         transform: 'translateY(0)',
         opacity: '100'
      }),
      animate(300)
   ]), 
])