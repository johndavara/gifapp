import { Injectable } from '@angular/core';
import { HttpClient, HttpParams} from '@angular/common/http';
import { Gif, SearchResponse } from '../interfaces/gifs.interface';

@Injectable({providedIn: 'root'})
export class GifsService {

  public gifList: Gif[] = [];

  private _tagsHistory: string[] = [];
  private apiKey:string = '2FjInduy1PFmW226aV4OYxfJaYSF9eAi';
  private serviceUrl:string = 'https://api.giphy.com/v1/gifs';
  constructor(private httpClient: HttpClient) {
    this.loadLocalStorage();
  }

  private organizeHistory(tag:string){
    tag = tag.toLocaleLowerCase();

    if(this._tagsHistory.includes(tag)){
      this._tagsHistory = this._tagsHistory.filter((oldTag) => oldTag !== tag);
    }
    this._tagsHistory.unshift(tag);
    this._tagsHistory = this._tagsHistory.splice(0,10);
    this.saveLocalStorage();
  }
  get tagsHistory(){
    return [...this._tagsHistory];
  }

  async searchTag(tag:string) : Promise<void>{
    if(tag.length === 0){
      return;
    }
    this.organizeHistory(tag);
    /*fetch('https://api.giphy.com/v1/gifs/search/?api_key=2FjInduy1PFmW226aV4OYxfJaYSF9eAi&q=valorant&limit=10')
    .then((res)=>{
      return res.json();
    })
    .then((data)=>{
      console.log(data);
    });*/

    const params = new HttpParams()
    .set('api_key', this.apiKey)
    .set('q',tag)
    .set('limit','10');

    this.httpClient.get<SearchResponse>(`${this.serviceUrl}/search`,{params})
    .subscribe( (resp: SearchResponse) =>{
      this.gifList = resp.data;
    });
  }

private saveLocalStorage() : void{
   localStorage.setItem('history',JSON.stringify(this._tagsHistory))
}

private loadLocalStorage() : void{
  if(localStorage.getItem('history')){
    this._tagsHistory = JSON.parse(localStorage.getItem('history')!);
  }
  if(this.tagsHistory.length > 0){
    this.searchTag(this.tagsHistory.at(0)?.toString()!);
  }
}

}
