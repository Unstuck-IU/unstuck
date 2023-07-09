// import React, { useEffect, useState, Link } from "react";
// import { SuperheroDetail } from "./SuperheroDetail";

// export function SuperheroList() {
//     const [superheroList, setSuperheroList] = useState([]);

//     useEffect(() => {
//         const getSuperheroes = async () => {
//             const response = await fetch("/api/superhero");
//             const superheroData = await response.json();
//             setSuperheroList(superheroData);
//         };
//         getSuperheroes();
//     }, []);
//     return (
//         <section>
//             <ul>
//                 {superheroList.map((superhero) => {
//                     return (
//                         <li>
//                             <Link to={`/detail/${superhero._id}`}>{superhero.name}</Link>
//                         </li>
//                     );
//                 })}
//             </ul>
//         </section>
//     );
// }
