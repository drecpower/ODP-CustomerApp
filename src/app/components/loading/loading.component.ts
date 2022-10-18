import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { animFadeInOutAnimation, animFastFadeInOutAnimation, animRouteTransition, AnimSlowFadeInOutAnimation, longAnimFadeInOutAnimation } from 'src/app/shared/animations';

@Component({
  selector: 'app-loading',
  templateUrl: './loading.component.html',
  styleUrls: ['./loading.component.scss'],
  animations: [
    animFadeInOutAnimation,
    animRouteTransition,
    animFastFadeInOutAnimation,
    longAnimFadeInOutAnimation,
    AnimSlowFadeInOutAnimation
  ]
})
export class LoadingComponent implements OnInit {

  @Input() loading?: boolean = false;
  @Input() ready?: boolean = false;
  @Input() loadingText?: string = "loading ...";
  @Input() retryText?: string = "Can't load data try again?";
  @Output() retry = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
  }
  get(){
    if(this.retry)
    this.retry.emit();
  }
}
