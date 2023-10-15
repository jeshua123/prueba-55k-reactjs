import { useEffect, useState } from 'react';
import './App.css';

function App() {

  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetch('https://randomuser.me/api/?results=100')
      .then(res => res.json())
      .then(res => {

        setUsers(res.results)

      })



  }, [])

  console.log(users.gender)
  return (

    <>
      <div className="App">
        <header className="App-header">
          <h1>Prueba tecnica</h1>
          <nav>
            <button >Colorear Files</button>
            <button>ordenar por pais</button>
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

            {users.map((user, index) => {

              console.log(user.picture.thumbnail)

              return (
                <tr key={index}>
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
