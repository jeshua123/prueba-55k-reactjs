import { useEffect, useState } from 'react';
import './App.css';



function App() {
  const [users, setUsers] = useState([]);

  useEffect(() => {

    fetch("https://randomuser.me/api/?results=100")
      .then(response => response.json())
      .then(data => {

        setUsers(data.results)

      })
  }, []);
  return (
    <>

      <header>
        <h1>Prueba tecnica</h1>
      </header>
      <nav>

        <button>Colorear Files</button>
        <button>Ordenar por pais</button>
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

            {users.map((user) => {
              return (
                <>
                  <tr>
                    <td><img src={user.picture.thumbnail} alt="" /></td>
                    <td>{user.name.first}</td>
                    <td>{user.name.last}</td>
                    <td>{user.location.country}</td>
                    <td>Borrar</td>
                  </tr>
                </>
              )
            })}


          </tbody>
        </table>

      </section>
    </>
  )
}

export default App;
