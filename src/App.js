import { useEffect, useState } from 'react';
import './App.css';

function App() {

  const [users, setUsers] = useState([]);
  const [showRowColors, setshowRowColors] = useState(false);
  const [showSortUsers, setShowSortUsers] = useState(false);
  useEffect(() => {
    fetch('https://randomuser.me/api/?results=100')
      .then(res => res.json())
      .then(res => {
        setUsers(res.results)

      })
  }, [])

  const activateRowcolors = () => {
    setshowRowColors(!showRowColors)
    console.log("sirve")

  }

  const sortingUsers = () => {
    setShowSortUsers(!showSortUsers)

  }

  const usersArray = showSortUsers ? users.toSorted((a, b) => { return a.location.country.localeCompare(b.location.country) }) : users
  const sortButtonInfoDisplay = showSortUsers ? "ordenar por pais" : "No ordenar por pais"

  return (

    <>
      <div className="App">
        <header className="App-header">
          <h1>Prueba tecnica</h1>
          <nav>
            <button onClick={activateRowcolors} >Colorear Files</button>
            <button onClick={sortingUsers}>{sortButtonInfoDisplay}</button>
            <button>resetear estado</button>
            <input type="text" name="" id="" placeholder='filtrar por pais ' />
          </nav>
        </header>
        <table>

          <tbody>
            <tr >
              <th>Foto</th>
              <th>Nombre</th>
              <th>Apellido</th>
              <th>Pais</th>
              <th>Accion</th>
            </tr>

            {usersArray.map((user, index) => {

              const rowColor = showRowColors ? index % 2 === 0 ? "bgc-1" : "bgc-2" : null

              return (
                <tr className={rowColor} key={index}>
                  <td><img src={user.picture.thumbnail} alt="" /> </td>
                  <td>{user.name.first}</td>
                  <td>{user.name.last}</td>
                  <td>{user.location.country}</td>
                  <td>Borrar</td>

                </tr>)
            }
            )}


          </tbody>

        </table>
      </div >
    </>
  );
}

export default App;
