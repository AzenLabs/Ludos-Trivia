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

// nextjs functions
// export function ClassScoreboard(scoreboard, values){
//   // get list of 8 studs to show in scoreboard max
//   let myStanding = scoreboard.indexOf(user.username)
//   let scoreboardSub;  // only include 10 studs in scoreboard
//   if(myStanding < 10){
//     scoreboardSub = scoreboard.slice(0, 10)
//   }else if(myStanding > (scoreboard.length - 10)){
//     scoreboardSub = scoreboard.slice(scoreboard.length - 10, scoreboard.length + 1)
//   }else{
//     scoreboardSub = scoreboard.slice(myStanding - 4, myStanding + 6)
//   }

//   return (
//     <Center h="90vh">
//       <Stack gap={5}>
//         <Heading alignSelf={"center"} >{user.class} Class Scoreboard</Heading>
//         <Table colorScheme='teal' w="60vw" my="auto" border={"2px solid lightgrey"}>
//           <Thead>
//             <Tr>
//               <Th>Standing</Th>
//               <Th>Student</Th>
//               <Th>Emeralds</Th>
//             </Tr>
//           </Thead>
//           <Tbody>
//             {
//               scoreboardSub && scoreboardSub.map((stud) => (
//                 <Tr backgroundColor={(stud == user.username)?"lightblue": ""}>
//                   <Th>{scoreboard.indexOf(stud) + 1}</Th>
//                   <Th>{stud}</Th>
//                   <Th>{values[stud]}</Th>
//                 </Tr>
//               ))
//             }
//           </Tbody>
//           <TableCaption>
//             <Text fontWeight={"bold"} fontSize={"2vw"}>You are in #{myStanding + 1} place!</Text>
//           </TableCaption>
//         </Table>
//       </Stack>
      
//     </Center>
    
//   )
// }