/* eslint-disable */
import { useEffect, useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import { Main, MyPage, SalePage, Test } from './pages/_index'
import { ethers } from 'ethers'

function App() {

  const [account, setAccount] = useState("");

  const getAccount = async() => {
    try {
      if(window.ethereum) {
        const accounts = await window.ethereum.request({
          method: "eth_requestAccounts"
        })
        setAccount(accounts[0]);
      } else {
        alert("install metamask")
      }
    } catch(error) {
      console.log(error)
    }
  }

  useEffect( () => {
    getAccount()
    //connetContract()
  },[])

  return (
    <div className="App">
      <Routes>
        <Route path='/' element={<Main account={account}/>}/>
        <Route path='/mypage' element={<MyPage account={account}/>}/>
        <Route path='/sale' element={<SalePage account={account}/>}/>
        <Route path='/test' element={<Test account={account}/>}/>
      </Routes>
    </div>
  );
}

export default App;
