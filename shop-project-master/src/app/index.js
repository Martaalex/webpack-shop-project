import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { MoonLoader } from 'react-spinners';
import {
  BrowserRouter as Router,
  Route,
  NavLink,
  Redirect,
  Switch,
} from 'react-router-dom';
import { Shop, Favorites, Cart, PageNotFound, Login } from './pages';
import { PageLayout, PrivateRoute } from './components';
import auth from '../auth';
import shop from '../shop';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.NAV_LINKS = [
      { title: 'Logout', accessLevel: 'onlyLogged', onClick: props.logout },
      { title: 'Login', accessLevel: 'notLogged', to: '/login' },
      { title: 'Shop', to: '/shop' },
      { title: 'Cart', to: '/cart' },
      { title: 'Favorites', to: '/favorites', accessLevel: 'onlyLogged' },
    ];
  }

  componentDidMount() {
    const { getProducts } = this.props;

    getProducts();
  }

  renderNav = () => {
    const { isLogged } = this.props;

    return this.NAV_LINKS.map(
      ({ title, accessLevel = 'always', to = '#', ...props }, i) => {
        if (accessLevel === 'onlyLogged' && isLogged) {
          return (
            <NavLink key={i} to={to} {...props}>
              {title}
            </NavLink>
          );
        }

        if (accessLevel === 'notLogged' && !isLogged) {
          return (
            <NavLink key={i} to={to} {...props}>
              {title}
            </NavLink>
          );
        }

        if (accessLevel === 'always') {
          return (
            <NavLink key={i} to={to} {...props}>
              {title}
            </NavLink>
          );
        }

        return undefined;
      }
    ).filter(Boolean);
  };

  render() {
    const { loading, error } = this.props;

    return (
      <Router>
        <PageLayout navLinks={this.renderNav()}>
          {error && <span>{error}</span>}
          {loading && <MoonLoader />}
          <Switch>
            <Route exact path="/login" component={Login} />
            <Route exact path="/shop" component={Shop} />
            <PrivateRoute exact path="/favorites" component={Favorites} />
            <Route exact path="/cart" component={Cart} />
            <Route path="/404" component={PageNotFound} />
            <Redirect exact from="/" to="/shop" />
            <Redirect to="/404" />
          </Switch>
        </PageLayout>
      </Router>
    );
  }
}

const enhance = connect(
  state => ({
    error: shop.selectors.getError(state),
    loading: shop.selectors.isLoading(state),
    isLogged: auth.selectors.isLogged(state),
  }),
  dispatch => ({
    getProducts: bindActionCreators(shop.actions.getProducts, dispatch),
    logout: bindActionCreators(auth.actions.logout, dispatch),
  })
);

App.propTypes = {
  getProducts: PropTypes.func.isRequired,
  isLogged: PropTypes.bool.isRequired,
  loading: PropTypes.bool.isRequired,
  logout: PropTypes.func.isRequired,
};

export default enhance(App);
