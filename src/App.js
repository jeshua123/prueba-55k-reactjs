import { useEffect, useState, useRef, useMemo } from 'react';
import './App.css';

function App() {

  const [users, setUsers] = useState([]);
  const [showRowColors, setshowRowColors] = useState(false);
  const [showSortUsers, setShowSortUsers] = useState(false);
  const [filterCountry, setFilterCountry] = useState(null);
  const ref = useRef([])
  useEffect(() => {
    fetch('https://randomuser.me/api/?results=100')
      .then(res => res.json())
      .then(res => {
        setUsers(res.results)
        ref.current = res.results

      })
  }, [])

  const activateRowcolors = () => { setshowRowColors(!showRowColors) }

  const sortingUsers = () => { setShowSortUsers(!showSortUsers) }

  const filteredUsers = useMemo(() => {
    return filterCountry ? users.filter(user => user.location.country.toLowerCase().includes(filterCountry.toLowerCase())
    ) : users
  }, [users, filterCountry])

  const sortedUsers = useMemo(() => {
    return showSortUsers ?
      filteredUsers.toSorted((a, b) => { return a.location.country.localeCompare(b.location.country) })
      : filteredUsers
  }, [filteredUsers, showSortUsers])


  const sortButtonInfoDisplay = showSortUsers ? "no ordenar por pais" : "ordenar por pais"

  const handleDeleted = (email) => { setUsers(users.filter((users) => users.email !== email)) }

  const setStated = () => {
    setUsers(ref.current)
  }

  return (
    <>
      <div className="App">
        <header className="App-header">
          <h1>Prueba tecnica</h1>
          <nav>
            <button onClick={activateRowcolors} >Colorear Files</button>
            <button onClick={sortingUsers}>{sortButtonInfoDisplay}</button>
            <button onClick={setStated}>resetear estado</button>
            <input type="text" name="" id="" placeholder='filtrar por pais ' onChange={(e) => {
              setFilterCountry(e.target.value)
            }
            } />
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

            {sortedUsers.map((user, index) => {

              const rowColor = showRowColors ? index % 2 === 0 ? "bgc-1" : "bgc-2" : null

              return (
                <tr className={rowColor} key={index}>
                  <td><img src={user.picture.thumbnail} alt="" /> </td>
                  <td>{user.name.first}</td>
                  <td>{user.name.last}</td>
                  <td>{user.location.country}</td>
                  <td onClick={() => { handleDeleted(user.email) }}>Borrar</td>

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
