import React from "react"
import ReactDOM from "react-dom"
import "./index.css"
import App from "./App"
import * as serviceWorker from "./serviceWorker"
// redux
import { createStore, applyMiddleware, compose } from "redux"
import { Provider, useSelector } from "react-redux"
import rootReducer from "./store/reducers/rootReducer"
import thunk from "redux-thunk"
// redux-firestore, react-redux-firebase
import {
  reduxFirestore,
  createFirestoreInstance,
  getFirestore,
} from "redux-firestore"
import {
  ReactReduxFirebaseProvider,
  getFirebase,
  isLoaded,
} from "react-redux-firebase"
import firebase from "./config/firebase"

const store = createStore(
  rootReducer,
  compose(
    applyMiddleware(
      thunk.withExtraArgument({
        getFirebase,
        getFirestore,
      })
    ),
    reduxFirestore(firebase)
  )
)
const rrfConfig = {
  useFirestoreForProfile: true,
  userProfile: "users",
  attachAuthIsReady: true,
}

const rrfProps = {
  firebase, // <- returns firebase instance
  config: rrfConfig,
  dispatch: store.dispatch,
  createFirestoreInstance, // <- needed if using firestore
}

const AuthIsLoaded = ({ children }) => {
  const auth = useSelector((state) => state.firebase.auth)
  if (!isLoaded(auth))
    return (
      <div className="container">
        <div className="row center-align">
          <div className="col m1"></div>
          <div className="col s12 m10" style={{ margin: "0 auto" }}>
            <div className="section">
              <div
                className="progress #fdd835 yellow darken-2"
                style={{ marginTop: "10%" }}
              >
                <div className="indeterminate yellow lighten-1"></div>
              </div>
            </div>
          </div>
          <div className="col m1"></div>
        </div>
      </div>
    )
  return children
}

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <ReactReduxFirebaseProvider {...rrfProps}>
        <AuthIsLoaded>
          <App />
        </AuthIsLoaded>
      </ReactReduxFirebaseProvider>
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister()
