export class Document {
  public id: number;
  public name: string;
  public descript: string;
  public url: string; 
  public children: string[];
  
  constructor(id:number, name:string, descript:string, url:string, children: string[]){
    this.id = id;
    this.name = name;
    this.descript = descript;
    this.url = url;
    this.children = children;
 } 
}