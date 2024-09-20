import { Fragment } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "../pages/home";
import Login from "../pages/login";
import Cadastro from "../pages/cadastro";
import SalesTable from "../pages/vendedor-table";
import GerentePage from "../pages/gerente-page";
import useAuth from "../hooks/useAuth";
import GerentePedidos from "../pages/gerente-pedidos";
import ListagemGerente from "../pages/listagem-gerente";

const Private = ({ Item, allowedRoles }) => {
  const { signed, user } = useAuth();
  console.log("Signed:", signed, "User Role:", user?.role); // Debug para verificação

  if (!signed) {
    return <Login />;
  }

  if (allowedRoles && !allowedRoles.includes(user?.role)) {
    return <Login />;
  }

  return <Item />;
};

const RoutesApp = () => {
  return (
    <BrowserRouter>
      <Fragment>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/home" element={<Private Item={Home} allowedRoles={['vendedor']} />} />
          <Route path="/cadastro" element={<Cadastro />} />
          <Route path="/vendas" element={<Private Item={SalesTable} allowedRoles={['vendedor']} />} />
          <Route path="/gerente-page" element={<Private Item={GerentePage} allowedRoles={['gerente']} />} />
          <Route path="/gerente-pedidos" element={<Private Item={GerentePedidos} allowedRoles={['gerente']} />} /> {/* Nova rota */}
          <Route path="/listagem-gerente" element={<Private Item={ListagemGerente} allowedRoles={['gerente']} />} /> {/* Nova rota */}
          <Route path="*" element={<Login />} />
        </Routes>
      </Fragment>
    </BrowserRouter>
  );
};

export default RoutesApp;
