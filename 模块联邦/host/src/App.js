import React from "react";
const RemoteNewsList = React.lazy(() => import("remote/NewsList"));

function App(props) {
  return (
    <div>
      <h1>引用远程 NewsList</h1>
      <React.Suspense fallback="loading RemoteNewsList">
        <RemoteNewsList />
      </React.Suspense>
    </div>
  );
}

export default App;
