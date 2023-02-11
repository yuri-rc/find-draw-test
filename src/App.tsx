/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-alert */
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
// @ts-ignore
import Parse from "parse/dist/parse";
import { useEffect } from "react";
import { storage } from "./firebaseconfig";

const { REACT_APP_PARSE_APPLICATION_ID, REACT_APP_PARSE_JAVASCRIPT_KEY } =
  process.env;

const PARSE_APPLICATION_ID = REACT_APP_PARSE_APPLICATION_ID;
const PARSE_HOST_URL = "https://parseapi.back4app.com/";
const PARSE_JAVASCRIPT_KEY = REACT_APP_PARSE_JAVASCRIPT_KEY;
Parse.initialize(PARSE_APPLICATION_ID, PARSE_JAVASCRIPT_KEY);
Parse.serverURL = PARSE_HOST_URL;

// const listRef = ref(storage, "files");

const upload = (file: any) => {
  const taskRef = ref(storage, `files/${file.name}`);
  const upTask = uploadBytesResumable(taskRef, file);
  upTask.on(
    "state_changed",
    (snapshot) => {
      const progress = Math.round(
        (snapshot.bytesTransferred / snapshot.totalBytes) * 100
      );
      console.log(progress);
    },
    (error) => {
      alert(error);
    },
    () => {
      getDownloadURL(upTask.snapshot.ref).then((downloadURL) => {
        console.log(downloadURL);
      });
    }
  );
  console.log(upTask);
};

const submit = (e: any) => {
  e.preventDefault();
  const file = e.target[0].files[0];
  upload(file);
};

// listAll(listRef)
//   .then((res) => {
//     res.prefixes.forEach((folderRef) => {
//       console.log(folderRef);
//     });
//     res.items.forEach((itemRef) => {
//       console.log(itemRef);
//     });
//   })
//   .catch((error) => {
//     console.log(error);
//   });

const fetchData = async () => {
  const requestOptions = {
    method: "POST",
    headers: {
      "Access-Control-Allow-Origin": "*",
      "content-type": "aplication/json",
    },
    body: JSON.stringify({
      key: "HWQODNTK7CVXQ9I7MLNK5K96S61STKV6STLFBBYLAZ39S8AKST9Z1IXA2RG77OQ06HC2KGSWLQUYTKQLZASV2SGVK2MI0OMGGFBDP3HEK3YU2OV11829H6VQJZLL5ED2",
      number: "5512996215829",
      template: "<#> Seu código de verificação é: {999-999}",
      expire: 300,
    }),
  };
  await fetch("https://api.smstoken.com.br/token/v1/verify", requestOptions);
};

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
    } catch (error: unknown) {
      // @ts-ignore
      alert(`Error! ${error.message}`);
      return false;
    }
  };

  return (
    <div className="App">
      <h1>Homolog test</h1>
      <button onClick={fetchData} type="button">
        FetcjData
      </button>
      <form onSubmit={submit}>
        <input type="file" accept="image/*" />
        <button type="submit">Upload</button>
      </form>
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
      <img
        src="https://firebasestorage.googleapis.com/v0/b/to-do-17007.appspot.com/o/files%2FWhatsApp%20Image%202023-01-31%20at%204.19.21%20PM.jpeg?alt=media&token=8f095011-1e18-40b7-bde4-95fce1a2eb34"
        alt="my"
      />
    </div>
  );
}

export default App;
