import { Fragment } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import Cadastro from "../pages/cadastro";
import GerentePedidos from "../pages/gerente-pedidos";
import Home from "../pages/home";
import ListagemGerente from "../pages/listagem-gerente";
import Login from "../pages/login";
import SalesTable from "../pages/vendedor-table";

const Private = ({ Item, allowedRoles }) => {
  const { signed, user } = useAuth();
  console.log("Signed:", signed, "User Role:", user?.role);
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
          <Route path="/gerente-pedidos" element={<Private Item={GerentePedidos} allowedRoles={['gerente']} />} /> {/* Nova rota */}
          <Route path="/listagem-gerente" element={<Private Item={ListagemGerente} allowedRoles={['gerente']} />} /> {/* Nova rota */}
          <Route path="*" element={<Login />} />
        </Routes>
      </Fragment>
    </BrowserRouter>
  );
};

export default RoutesApp;
