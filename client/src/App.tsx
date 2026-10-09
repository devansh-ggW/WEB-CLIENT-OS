import { Route, Switch } from "wouter";
import { SiteChrome } from "./components/SiteChrome";
import Home from "./pages/Home";
import Policy from "./pages/Policy";
import Support from "./pages/Support";

function NotFound() {
  return (
    <SiteChrome>
      <div className="page-grid legal-page">
        <div className="legal-intro">
          <p className="eyebrow">404 / Not found</p>
          <h1>That page isn’t in the guide.</h1>
          <a className="back-link" href="/">← Back to the field guide</a>
        </div>
      </div>
    </SiteChrome>
  );
}

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/privacy"><Policy kind="privacy" /></Route>
      <Route path="/terms"><Policy kind="terms" /></Route>
      <Route path="/support" component={Support} />
      <Route component={NotFound} />
    </Switch>
  );
}

export default function App() {
  return <Router />;
}
