import { classScoreboard } from "../data/data";


export function calculateClassScoreboard(classname){
  let dict = classScoreboard[classname].students

  // sort the dictionary by value
  var items = Object.keys(dict).map((key) => { return [key, dict[key]] });

  items.sort(
    (first, second) => { return first[1] - second[1] }
  );

  var keys = items.map(
    (e) => { return e[0] });
  return keys.reverse()
}

export function calculateAllScoreboard(){
  let final = {}
  for (const [key, value] of Object.entries(classScoreboard)){
    let s = calculateClassScoreboard(key)
    final[key] = {
      "scoreboard": s,
      "values": value['students']
    }
  }
  return final
}