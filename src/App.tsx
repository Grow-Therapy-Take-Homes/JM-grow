import { PrimeReactProvider } from "primereact/api";
import { Layout } from "./components/layout";
import { ArticlesPage } from "./pages/articles-page";

import "./App.css";

function App() {
  return (
    <PrimeReactProvider>
      <Layout>
        <ArticlesPage />
      </Layout>
    </PrimeReactProvider>
  );
}

export default App;
