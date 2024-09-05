import SearchBar from '../../../components/SearchBar';
import UserList from '../components/UserList';
import BarChartComponent from '../../../components/BarChartComponent';
import Loader from '../../../components/Loader';
import { useSearch } from '../../../context/SearchContext';
import { User } from '../../../types/User';

const Home: React.FC = () => {
  const { users, isLoading, isError, handleSearch } = useSearch();

  return (
    <div className="page-container">
      <h1>Buscar Usuarios de GitHub</h1>
      <SearchBar onSearch={handleSearch} />
      {isLoading ? (
        <Loader />
      ) : isError ? (
        <p>Error al obtener los usuarios</p>
      ) : users.length > 0 ? (
        <>
          <UserList users={users} />
          <BarChartComponent<User>
            data={users}
            xKey="login"
            yKey="followers"
            xLabel="Usuarios"
            yLabel="Seguidores"
          />
        </>
      ) : (
        <p>Realiza una búsqueda para ver los resultados.</p>
      )}
    </div>
  );
};

export default Home;
