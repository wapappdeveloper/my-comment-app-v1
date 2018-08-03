import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styles: []
})
export class ChatComponent implements OnInit {
  /**
   * access child elements
   */
  @ViewChild('commentMessage') commentMessage:ElementRef;
  @ViewChild('nameOfCommenter') nameOfCommenter:ElementRef;
  @ViewChild('allChatContainer') allChatContainer:ElementRef;


  chatArray:any = [];
  sampleChatArray:any = [
    { name:"person-1",message:"Hi!... This is Person-1",time:"" },
    { name:"person-2",message:"Hi!... This is Person-2",time:"" },
    { name:"person-3",message:"Hi!... This is Person-3",time:"" },
    { name:"person-4",message:"Hi!... This is Person-4",time:"" },
    { name:"person-5",message:"Hi!... This is Person-5",time:"" }
  ];

  chatOpen:boolean = false;
  chatClose:boolean = false;
  /*setChatWindowPosition:string = 'absolute';
  closeButtonText:string = "close chat";
  chatWindowHeight:number = 600;*/
  setChatWindowPosition:string = 'relative';
  closeButtonText:string = "open chat";
  chatWindowHeight:number = 0;

  tempCommentObj:any = null;
  commentInEditMode:boolean = false;
  commentInReplyMode:boolean = false;

  messageTitle:string = 'enter message';

  constructor() { }

  ngOnInit() {
    //this.chatArray = this.sampleChatArray;
  }

  chatOpenClose(){
    if(this.closeButtonText === 'open chat'){
      this.setChatWindowPosition = 'absolute';
      this.closeButtonText = 'close chat';
      this.chatWindowHeight = 600;
    }else{
      this.setChatWindowPosition = 'relative';
      this.closeButtonText = 'open chat';
      this.chatWindowHeight = 0;
    }
  }

  publishComment(comment?:any){
    console.log("comment published");
    var commenterName:string    = this.nameOfCommenter.nativeElement.value;
    var commenterMessage:string = this.commentMessage.nativeElement.value;
    var commentedTime:string = this.getTime();
    console.log(commentedTime);
    if(commenterName.trim()==="" || commenterMessage.trim()===""){
      alert("some fields still empty");
      return;
    }
    
    if(this.tempCommentObj && this.commentInEditMode){
      this.tempCommentObj.name = commenterName;
      this.tempCommentObj.message = commenterMessage;
      this.tempCommentObj.time = commentedTime;
      this.commentInEditMode = false;
    }else if(this.tempCommentObj && this.commentInReplyMode){
      let tempCommentObj:any = {
        name:commenterName,
        message:commenterMessage,
        time:commentedTime
      }
      if(this.tempCommentObj && this.tempCommentObj.reply && this.tempCommentObj.reply.length>0){
        this.tempCommentObj.reply.push(tempCommentObj);
      }else{
        this.tempCommentObj.reply = [];
        this.tempCommentObj.reply.push(tempCommentObj);
      }
      this.commentInReplyMode = false;
    }else{
      let tempCommentObj:any = {
        name:commenterName,
        message:commenterMessage,
        time:commentedTime
      }
      this.chatArray.push(tempCommentObj);
      setTimeout(() => {
        this.allChatContainer.nativeElement.scrollTop = this.allChatContainer.nativeElement.scrollHeight;
      }, 10);
    }
    this.messageTitle = 'enter message';
    
    this.nameOfCommenter.nativeElement.value = "";
    this.commentMessage.nativeElement.value = "";
  }

  removeComment(comment:any){
    if(this.chatArray.indexOf(comment)!==-1){
      this.chatArray.splice(this.chatArray.indexOf(comment),1);
    }else{
      console.error('please check the array');
    }
  }

  replyToComment(comment:any){
    console.log(comment);
    this.commentInReplyMode = true;
    this.messageTitle = 'enter message to replay';
    this.tempCommentObj = comment;
  }

  editComment(comment:any){
    console.log(comment);
    this.commentInEditMode = true;
    this.nameOfCommenter.nativeElement.value = comment.name;
    this.commentMessage.nativeElement.value = comment.message;
    this.tempCommentObj = comment;
    //this.publishComment(comment);
  }

  

  getTime():string{
    function checkTime(i) {
      return (i < 10) ? "0" + i : i;
    }
    var today = new Date(),
            h = checkTime(today.getHours()),
            m = checkTime(today.getMinutes()),
            s = checkTime(today.getSeconds());
    var time = h + ":" + m + ":" + s;
    return time;
  }
}
