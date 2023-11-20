import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { Gif } from '../../interfaces/gifs.interface';

@Component({
  selector: 'gifs-card',
  templateUrl: './gifs-card.component.html',
  styleUrls: ['./gifs-card.component.css']
})
export class GifsCardComponent implements OnInit{

  @Input()
  public gif! : Gif;

  ngOnInit(): void {
    if(!this.gif){
      throw new Error('Propiedad gif requerida')
    }
  }
}
