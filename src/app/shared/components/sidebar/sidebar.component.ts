import { Component } from '@angular/core';
import { GifsService } from 'src/app/gifs/services/gifs.service';

@Component({
  selector: 'shared-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent {

  constructor(private gifsService: GifsService){ }

  public getTagsHistory(){
    return this.gifsService.tagsHistory;
  }

  public searchTag(tag:string){
    this.gifsService.searchTag(tag);
  }
}
