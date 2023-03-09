<script setup lang="ts">
import { onMounted, reactive, ref, watchEffect } from 'vue'
import { ethers } from 'ethers'
import * as HelloWorldABI from '../contract/HelloWorld.json'

const { ethereum } = window
const contractAddress = '0xF112ba99A3586Ac4b5dA4148c0a03ADD2C6BFA0a'

const setAddress = reactive({
  address: ''
})
const setTexts = reactive({
  setText: '',
  setName: ''
})

const getTexts = reactive({
  getText: '',
  getName: ''
})

const networName = reactive({
  network: ''
})

let connected = ref(false)
onMounted(() => {
  if (!ethereum) {
    connected.value = false
    alert('Make sure you have MetaMask Connected!')
    return
  }
  watchEffect(() => {
    getCurrentText()
    getCurrentName()
  })
})

//connect your Metamask wallet on connect button click
const connectWallet = async () => {
  try {
    // Check if MetaMask is installed
    if (!ethereum) {
      alert('Make sure you have MetaMask Connected!')
      return
    }

    // Get user Metamask Ethereum wallet address
    const accounts = await ethereum.request({
      method: 'eth_requestAccounts'
    })
    setAddress.address = accounts[0]
    const provider = new ethers.providers.Web3Provider(ethereum)
    const network = await provider.getNetwork()
    networName.network = network.name

    console.log(accounts[0])
    connected.value = true
  } catch (error) {
    console.log(error)
  }
}
const getCurrentText = async () => {
  try {
    // Check if User already connected a wallet
    if (ethereum) {
      const provider = new ethers.providers.Web3Provider(ethereum)
      const signer = provider.getSigner()

      // Create a contract object
      const contractInstance = new ethers.Contract(contractAddress, HelloWorldABI.abi, signer)

      let text = await contractInstance.getText()
      getTexts.getText = text
    }
  } catch (error) {
    console.log(error)
  }
}
const getCurrentName = async () => {
  try {
    // Check if User already connected a wallet
    if (ethereum) {
      const provider = new ethers.providers.Web3Provider(ethereum)
      const signer = provider.getSigner()
      // Create a contract object
      const contractInstance = new ethers.Contract(contractAddress, HelloWorldABI.abi, signer)
      let text = await contractInstance.getName()
      getTexts.getName = text
    }
  } catch (error) {
    console.log(error)
  }
}
const setText = async () => {
  try {
    // Check if User already connected a wallet
    if (ethereum) {
      const provider = new ethers.providers.Web3Provider(ethereum)
      const signer = provider.getSigner()

      // Create a contract object
      const contractInstance = new ethers.Contract(contractAddress, HelloWorldABI.abi, signer)

      const setText = await contractInstance.setText(setTexts.setText)
      // Wait for the transaction to be mined
      await setText.wait()
      watchEffect(() => {
        getCurrentText()
        getCurrentName()
      })
      // Display a success message to the user
      alert('Txn successful!')
    }
  } catch (error) {
    console.log(error)
  }
}

const setName = async () => {
  try {
    // Check if User already connected a wallet
    if (ethereum) {
      const provider = new ethers.providers.Web3Provider(ethereum)
      const signer = provider.getSigner()

      // Create a contract object
      const contractInstance = new ethers.Contract(contractAddress, HelloWorldABI.abi, signer)

      const setName = await contractInstance.setName(setTexts.setName)
      // Wait for the transaction to be mined
      await setName.wait()
      // Display a success message to the user
      alert('Txn successful!')
      watchEffect(() => {
        getCurrentText()
        getCurrentName()
      })
    }
  } catch (error) {
    console.log(error)
  }
}
</script>

<template>
  <main>
    <div class="text-center">
      <img class="text-center img-thumbnail" src="../assets/celo.png" alt="" />
    </div>
    <div class="text-success textcenter">
      NetWork: <strong>{{ networName.network }}</strong>
    </div>
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark mt-5 pt-1 mb-1">
      <div class="container-fluid">
        <a class="navbar-brand" href="#"></a>
        <button
          class="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarSupportedContent">
          <ul class="navbar-nav me-auto mb-2 mb-lg-0">
            <li class="nav-item">
              <a class="nav-link active" aria-current="page" href="#">Home</a>
            </li>
          </ul>

          <button v-if="!connected" @click="connectWallet" class="btn btn-outline-success">
            Connect Wallet
          </button>
          <button v-else class="btn btn-success">{{ setAddress.address }}</button>
        </div>
      </div>
    </nav>
  </main>

  <div class="py-5">
    <div class="card">
      <label class="card-body" for="">BLOCKCHAIN-DATA: </label>
      <p class="card-body">
        Current Text: <strong> {{ getTexts.getText }}</strong>
      </p>
      <p class="card-body">
        Current Name: <strong> {{ getTexts.getName }}</strong>
      </p>
    </div>

    <div class="py-5 global-container">
      <div class="card login-form">
        <div class="card-body">
          <h3 class="card-title text-center">Contract Interaction</h3>
          <div class="card-text">
            <form>
              <div class="form-group">
                <label for="exampleInputEmail1">Set Text</label>
                <input
                  v-model="setTexts.setText"
                  type="text"
                  class="form-control form-control-sm"
                />
                <button @click.prevent="setText" class="btn btn-dark py-1 mt-2">Call</button>
              </div>
              <div class="form-group">
                <label for="exampleInputEmail1">Set Name</label>
                <input
                  v-model="setTexts.setName"
                  type="text"
                  class="form-control form-control-sm"
                />
                <button @click.prevent="setName" class="btn btn-dark py-1 mt-2">Call</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<style>
.global-container {
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #141313;
}

.form {
  padding-top: 10px;
  font-size: 14px;
  margin-top: 30px;
}

.card-title {
  font-weight: 300;
}

.login-form {
  width: 330px;
  margin: 20px;
}

.sign-up {
  text-align: center;
  padding: 20px 0 0;
}

.alert {
  margin-bottom: -30px;
  font-size: 13px;
  margin-top: 20px;
}
</style>
