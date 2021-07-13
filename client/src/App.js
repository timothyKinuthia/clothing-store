import { useEffect } from "react";
import { Route, Switch } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import Login from './screens/auth/Login';
import Signup from './screens/auth/Signup';
import Home from './screens/home/Home';
import Header from './components/header/Header';
import Alert from './components/alert/Alert';
import { genAccessToken } from "./store/actions/authActions";
import AdminRoutes from "./AdminRoutes";
import CategoryCreate from "./screens/admin/CategoryCreate";
import SubCategoryCreate from "./screens/admin/SubCategoryCreate";
import SubSubCategoryCreate from "./screens/admin/SubSubCategoryCreate";
import ProductCreate from "./screens/admin/ProductCreate"

function App() {

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(genAccessToken());
  }, [dispatch]);

  return (
    <div className="w-full h-full text-black box-border overflow-hidden">
      <Header/>
      <Alert />
      <Switch>
        <Route exact path='/' component={Home} />
        <Route exact path='/signup' component={Signup} />
        <Route exact path='/login' component={Login} />
        <AdminRoutes exact path='/sub-category/create' component={SubCategoryCreate} />
        <AdminRoutes exact path='/sub-category/sub-category/create' component={SubSubCategoryCreate} />
        <AdminRoutes exact path='/category/create' component={CategoryCreate} />
        <AdminRoutes exact path='/product/create' component={ProductCreate} />
      </Switch>
    </div>
  );
}

export default App;
