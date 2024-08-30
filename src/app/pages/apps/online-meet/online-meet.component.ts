import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';

declare var JitsiMeetExternalAPI: any;

@Component({
  selector: 'app-online-meet',
  templateUrl: './online-meet.component.html',
  styleUrls: ['./online-meet.component.scss']
})
export class OnlineMeetComponent {

  @ViewChild('jitsiContainer') jitsiContainer!: ElementRef;

  domain: string = 'meet.jit.si';
  options: any;
  api: any;

  constructor() {}

  ngAfterViewInit(): void {
    this.options = {
      roomName: 'YourRoomName',
      width: '100%',
      height: 500,
      parentNode: this.jitsiContainer.nativeElement,
      configOverwrite: { },
      interfaceConfigOverwrite: { }
    };

    this.api = new JitsiMeetExternalAPI(this.domain, this.options);

    // You can also listen for events from Jitsi
    this.api.addEventListener('videoConferenceJoined', (event: any) => {
      console.log('Local User Joined:', event);
    });

    this.api.addEventListener('participantJoined', (event: any) => {
      console.log('Participant Joined:', event);
    });
  }

}
