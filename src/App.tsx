/* eslint-disable no-alert */
// @ts-ignore
import Parse from "parse/dist/parse";
import { useEffect } from "react";

const { REACT_APP_PARSE_APPLICATION_ID, REACT_APP_PARSE_JAVASCRIPT_KEY } =
  process.env;

console.log(REACT_APP_PARSE_APPLICATION_ID, REACT_APP_PARSE_JAVASCRIPT_KEY);

const PARSE_APPLICATION_ID = REACT_APP_PARSE_APPLICATION_ID;
const PARSE_HOST_URL = "https://parseapi.back4app.com/";
const PARSE_JAVASCRIPT_KEY = REACT_APP_PARSE_JAVASCRIPT_KEY;
Parse.initialize(PARSE_APPLICATION_ID, PARSE_JAVASCRIPT_KEY);
Parse.serverURL = PARSE_HOST_URL;

function App() {
  useEffect(() => {
    (async () => {
      const parseQuery = new Parse.Query("SoccerPLayer");
      const user = await Parse.User.current();
      console.log(user);
      parseQuery.contains("emailContact", "x");
      const queryResults = await parseQuery.find();

      // eslint-disable-next-line no-restricted-syntax
      for (const result of queryResults) {
        console.log(result);
      }
    })();
  }, []);

  const create = async () => {
    const user = new Parse.User();
    user.set("username", "yuri3@email");
    user.set("email", "yuri3@email");
    user.set("password", "123123");
    user.set("name", "Yuri");
    user.set("city", "Teste");
    try {
      const result = await user.save();
      console.log(result.attributes);
      alert(`New object created with objectId: ${result.id}`);
    } catch (error) {
      // @ts-ignore
      alert(`Failed to create new object: ${error.message}`);
    }
  };
  const login = async () => {
    try {
      await Parse.User.logIn("yuri@email", "123123");
      const user = await Parse.User.current();
      console.log(user);
    } catch (error) {
      // @ts-ignore
      alert(`Failed to create new object: ${error.message}`);
    }
  };

  const logout = async () => {
    try {
      await Parse.User.logOut();
      const user = await Parse.User.current();
      return console.log(user);
    } catch (error: any) {
      alert(`Error! ${error.message}`);
      return false;
    }
  };

  return (
    <div className="App">
      <button type="button" onClick={create}>
        Click
      </button>
      <button type="button" onClick={login}>
        Login
      </button>
      <button type="button" onClick={logout}>
        Logout
      </button>
      <p>My app</p>
    </div>
  );
}

export default App;
