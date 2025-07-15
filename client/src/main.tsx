import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';

const client = new ApolloClient({
  uri: "https://book-list-5h8x.onrender.com/graphql",
  cache: new InMemoryCache(),
});

createRoot(document.getElementById("root")!).render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>
);
