import {
  animate,
  group,
  query,
  style,
  transition,
  trigger,
} from "@angular/animations";

export const fadeInAnimation = trigger("fadeIn", [
  transition("* <=> *", [
    style({ opacity: 1 }),
    query(":enter, :leave", [style({ opacity: 1 })], { optional: true }),
    query(":enter", [style({ opacity: 0 })], { optional: true }),
    group([
      query(":enter", [animate("125ms ease-in", style({ opacity: 1 }))], {
        optional: true,
      }),
      query(":leave", [animate("125ms ease-in", style({ opacity: 0 }))], {
        optional: true,
      }),
    ]),
  ]),
]);
