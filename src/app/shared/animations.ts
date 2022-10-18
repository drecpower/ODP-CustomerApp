import { animate, query, state, style, transition, trigger } from "@angular/animations";


export const animRouteTransition=trigger(
    'routeAnimations', 
    [
      transition(
        'token <=> *, notimplemented <=> *, auth <=> *, nft <=> *', 
        [
          query(':self',[
            style({  "margin-left":"100%", opacity: 0 }),
            animate('0.2s ease-out', 
            style({  "margin-left":"0%",opacity: 1 }))
          ]),
          
        ]
      )
    ]
  );

export const animFadeInOutAnimation=trigger(
    'fadeInOutAnimation', 
    [
      transition(
        ':enter', 
        [
          style({  opacity: 0 }),
          animate('0.1s ease-out', 
                  style({  opacity: 1 }))
        ]
      ),
      transition(
        ':leave', 
        [
          style({ opacity: 1 }),
          animate('0.1s ease-in', 
                  style({  opacity: 0 }))
        ]
      )
    ]
  )

  export const longAnimFadeInOutAnimation=trigger(
    'longFadeInOutAnimation', 
    [
      transition(
        ':enter', 
        [
          style({  opacity: 0 }),
          animate('2s ease-out', 
                  style({  opacity: 1 }))
        ]
      ),
      transition(
        ':leave', 
        [
          style({ opacity: 1 }),
          animate('0.1s ease-in', 
                  style({  opacity: 0 }))
        ]
      )
    ]
  )

  export const AnimSlowFadeInOutAnimation=trigger(
    'slowFadeInOutAnimation', 
    [
      transition(
        ':enter', 
        [
          style({  opacity: 0 }),
          animate('1s ease-out', 
                  style({  opacity: 1 }))
        ]
      ),
      transition(
        ':leave', 
        [
          style({ opacity: 1 }),
          animate('0.5s ease-in', 
                  style({  opacity: 0 }))
        ]
      )
    ]
  )

  export const animFastFadeInOutAnimation=trigger(
    'fastFadeInOutAnimation', 
    [
      transition(
        ':enter', 
        [
          style({  opacity: 0 }),
          animate('1s ease-out', 
                  style({  opacity: 1 }))
        ]
      ),
      transition(
        ':leave', 
        [
          style({ opacity: 1 }),
          animate('1s ease-in', 
                  style({  opacity: 0 }))
        ]
      )
    ]
  )

export const animSlideInOutAnimation=trigger(
    'slideInOutAnimation', 
    [
      transition(
        ':enter', 
        [
          style({ "margin-left":"100%" , opacity: 0 }),
          animate('0.15s ease-out', 
                  style({ "margin-left":"0%"  ,opacity: 1 }))
        ]
      ),
      transition(
        ':leave', 
        [
          style({"margin-left":"0%", opacity: 1 }),
          animate('0.05s ease-in', 
                  style({ "margin-left":"100%", opacity: 0 }))
        ]
      )
    ]
  )

  export const animGrowAnimation=trigger(
    'growAnimation', 
    [
      transition(
        ':enter', 
        [
          style({ "max-width":"0%" , opacity: 0 }),
          animate('0.1s ease-out', 
                  style({ "max-width":"100%"  ,opacity: 1 }))
        ]
      ),
      transition(
        ':leave', 
        [
          style({"max-width":"100%", opacity: 1 }),
          animate('0.3s ease-in', 
                  style({ "max-width":"0%", opacity: 0 }))
        ]
      )
    ]
  )

  export const animGrowMenuAnimation=trigger('openCloseMenu', [
    // ...
    state('open', style({
    })),
    state('closed', style({
      'width': '40px',
    })),
    transition('open => closed', [
      animate('0.1s')
    ]),
    transition('closed => open', [
      animate('0.05s')
    ]),
  ])