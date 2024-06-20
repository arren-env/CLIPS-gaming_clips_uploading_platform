import { DatePipe } from '@angular/common';
import {
  Component,
  OnInit,
  ViewChild,
  ElementRef,
  ViewEncapsulation,
} from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import IClip from 'src/app/models/clip.model';
import { ClipService } from 'src/app/services/clip.service';
import videojs from 'video.js';

@Component({
  selector: 'app-clip',
  templateUrl: './clip.component.html',
  styleUrls: ['./clip.component.css'],
  providers: [DatePipe],
  encapsulation: ViewEncapsulation.None,
})
export class ClipComponent implements OnInit {
  id = '';
  @ViewChild('videoPlayer', { static: true }) target?: ElementRef;
  player?: videojs.Player;
  clip?:IClip

  constructor(public route: ActivatedRoute, public clipService: ClipService) {
    clipService.getClips();
  }

  ngOnInit(): void {
    this.player = videojs(this.target?.nativeElement);
    this.route.params.subscribe((params: Params) => {
      this.id = params['id'];
    });
  }
}
