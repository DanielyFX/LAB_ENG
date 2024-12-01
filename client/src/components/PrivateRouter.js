// client/src/components/PrivateRoute.jsx

import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import AuthContext from "../contexts/AuthContext";

/**
 * PrivateRoute Component
 * @param {Object} props
 * @param {React.ReactNode} props.children - Componentes filhos a serem renderizados
 * @param {Array<string>} [props.requiredPermissions] - Permissões necessárias para acessar a rota
 */
const PrivateRoute = ({ children, requiredPermissions }) => {
  const { authToken, user } = useContext(AuthContext);

  // Verifica se o usuário está autenticado
  if (!authToken || !user) {
    return <Navigate to="/" replace />;
  }

  // Se permissões são especificadas, verifica se o usuário tem pelo menos uma delas
  if (
    requiredPermissions &&
    !requiredPermissions.includes(user.permission)
  ) {
    return <Navigate to="/unauthorized" replace />;
  }

  // Se todas as verificações passam, renderiza os componentes filhos
  return children;
};

export default PrivateRoute;
