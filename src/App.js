import { useEffect, useState, useRef } from 'react';
import './App.css';

function App() {

   const [users, setUsers] = useState([]);
   const [changeColorShow, setChangeColorShow] = useState();
   const [activatedSorting, setActivatedSorting] = useState(false);
   const usersRef = useRef([])
   useEffect(() => {

      fetch("https://randomuser.me/api/?results=100")
         .then(response => response.json())
         .then(data => {
            setUsers(data.results)
            usersRef.current = data.results
         })
   }, []);

   function changeColorsOnClick() {
      setChangeColorShow(!changeColorShow)
   }
   const sortedUsers = users.toSorted((a, b) => { return a.location.country.toLowerCase().localeCompare(b.location.country.toLowerCase()) })
   const sortingUsersByCountry = () => {

      setActivatedSorting(!activatedSorting)
   }

   const setBackToOriginalState = () => {
      setUsers(usersRef.current)

   }

   const displayedArray = activatedSorting ? users : sortedUsers
   const sortingButtonText = activatedSorting ? "No Ordenar por Pais" : "Ordenar por Pais"

   const deleteRow = (uuid) => {
      setUsers(users.filter(user => user.login.uuid !== uuid))

   }
   const filterByCountry = (e) => {


      setUsers(users.filter(user => user.location.country === e.target.value))
   }

   return (
      <>
         <header>
            <h1>Prueba tecnica</h1>
         </header>
         <nav>
            <button onClick={() => {
               changeColorsOnClick()
            }
            }>Colorear Files</button>
            <button onClick={() => {
               sortingUsersByCountry()
            }
            } >{sortingButtonText}</button>
            <button onClick={() => {
               setBackToOriginalState()
            }
            }>Resetar Estado</button>
            <input onChange={(e) => {
               filterByCountry(e)
            }
            } type="text" name="" id="" />
         </nav>
         <section>

            <table>
               <thead>
                  <tr>
                     <th>
                        Foto
                     </th>
                     <th>
                        Nombre
                     </th>
                     <th>
                        Apellido
                     </th>
                     <th>
                        Pais
                     </th>
                     <th>
                        Acciones
                     </th>
                  </tr>
               </thead>
               <tbody>

                  {displayedArray.map((user, index) => {

                     const displayBackGroundColor = changeColorShow ? index % 2 > 0 ? "bgc-1" : "bgc-2" : null

                     return (
                        <>
                           <tr key={index} className={displayBackGroundColor}>
                              <td><img src={user.picture.thumbnail} alt="" /></td>
                              <td>{user.name.first}</td>
                              <td>{user.name.last}</td>
                              <td>{user.location.country}</td>
                              <td onClick={() => {
                                 deleteRow(user.login.uuid)
                              }
                              } >Borrar</td>
                           </tr >
                        </>
                     )
                  })}


               </tbody>
            </table>

         </section >
      </>
   )
}

export default App;
