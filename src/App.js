import { useEffect, useState, useRef } from 'react';
import './App.css';

function App() {

  const [users, setUsers] = useState([]);

  const [sortedUsers, setSortedUsers] = useState([]);

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

  const sortingUsersByCountry = () => {

    setSortedUsers(users.toSorted((a, b) => { return a.location.country.toLowerCase().localeCompare(b.location.country.toLowerCase()) }))
    setActivatedSorting(!activatedSorting)

  }

  const deleteRow = (params) => {

  }


  const UsersDisplayedArray = activatedSorting ? sortedUsers : users

  const sortingButtonText = activatedSorting ? "Ordenar por Pais" : "No Ordenar por Pais"
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
        <button>Resetar Estado</button>
        <input type="text" name="" id="" />
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

            {UsersDisplayedArray.map((user, index) => {

              const displayBackGroundColor = changeColorShow ? index % 2 > 0 ? "bgc-1" : "bgc-2" : null

              return (
                <>
                  <tr className={displayBackGroundColor}>
                    <td><img src={user.picture.thumbnail} alt="" /></td>
                    <td>{user.name.first}</td>
                    <td>{user.name.last}</td>
                    <td>{user.location.country}</td>
                    <td onClick={() => {
                      deleteRow()
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
