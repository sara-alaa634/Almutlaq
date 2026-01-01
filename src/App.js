import AppRoutes from "./Routes/appRoutes";
import { PermissionsProvider } from "./Context/PermissionsContext";
import { UserProvider } from "./Context/userContext";

function App() {
  return (
    <PermissionsProvider>
      <UserProvider>
        <div className="App">
          <AppRoutes />
        </div>
      </UserProvider>
    </PermissionsProvider>
  );
}

export default App;
