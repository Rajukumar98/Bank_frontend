
import './App.css';
import AllCustomer from './components/AllCustomer';
import NavBar from './NavBar';
import { useEffect, useState } from 'react';
import axios from "axios"
import Customer from "./components/Customer"
import Home from "./components/Home"
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import { createBrowserHistory } from 'history'
import Footer from './components/Footer';

function App() {
  const [Data, setBankData] = useState([]);
  const [currentAccount, setAccount] = useState({});
  const history = createBrowserHistory();
  useEffect(() => {
    console.log("In useEffect")
    fetchData()
  }, [])
  useEffect(()=>{
    if(!currentAccount){
      console.log("Account Changed")
      changeAccount(currentAccount.accountNo)
    }
  },[Data])
  const fetchData = () => {
    axios.get('http://localhost:5000/').then((res) => {
      console.log(res.data,"Data Fetched");
      setBankData(res.data)
    })
  }
  const changeAccount = (accountNo) => {
    let currData = Data.find((data) => {
      return data.accountNo === accountNo
    })
    setAccount(currData);
    console.log(currentAccount)
    // history.push("/customer");
  }

  const transfer = (fromAccount, toAccount, Amount) => {
    const postD = {
      fromAccount: fromAccount,
      toAccount: toAccount,
      Amount: Amount
    }
    postDatas(postD)
  }
  const postDatas = (postData) => {
    axios.post('http://localhost:5000/', postData)
      .then((res) => {
        // console.log(res)
        if (res.status === 200) {
          fetchData()
        }
      }).catch((err) => {
        console.log(err)
      });
  }

  return (
    <Router history={history}>
      <div className="App">
        <NavBar />
      </div>
      <Switch>
        <Route exact path="/">
          <Home AllData={Data} transfer={transfer} />
        </Route>
        <Route exact path="/customer">
          <Customer account={currentAccount} AllData={Data} transfer={transfer} />
        </Route>
        <Route exact path="/customers">
          <AllCustomer BankData={Data} changeAccount={changeAccount} />
        </Route>
      </Switch>
      <Footer />
    </Router>
  );
}

export default App;
