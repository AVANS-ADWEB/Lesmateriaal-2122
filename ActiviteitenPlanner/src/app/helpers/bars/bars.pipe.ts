import { PipeTransform, Pipe, ChangeDetectionStrategy } from "@angular/core";
import { Bar } from "./bars.component";

@Pipe({
    name: 'bars',
    pure: true, //Dit kan nog slimmer!
})
export class BarsPipe implements PipeTransform{
  transform(list: any){
      return list.map((e: any) => new Bar(e.name, e.players.length));
  }
}
