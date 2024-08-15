"use strict";
import throttle from 'lodash.throttle';

let emailInput = document.querySelector(`input[name=email]`);
let messageInput = document.querySelector(`textarea[name=message]`);
const button = document.querySelector(`button[type=submit]`);
const STORAGE_KEY = 'feedback-form-state';
const form = document.querySelector(".feedback-form");

const createText = (email, message) => ({
    email,
    message,
  });
  

function save(key, value) {
    try {
      const data = JSON.stringify(value);
      localStorage.setItem(key, data);
    } catch (error) {}
  }
  
  function load(key) {
    try {
      const data = localStorage.getItem(key);
      return data === null ? undefined : JSON.parse(data);
    } catch (error) {
      console.error(error);
    }
  }


  emailInput.addEventListener("input", updateValue);
  messageInput.addEventListener("input", updateValue);
  
  function updateValue(e) {
  if (e.target === emailInput ) {
  email = e.currentTarget.value
  }  else  {
  message = e.currentTarget.value;}

  addTaskToLocalStorage(emailInput.value, messageInput.value);
}

function addTaskToLocalStorage(emailInput, messageInput) {
  const currentState = load(STORAGE_KEY);
  const newTask = createText(emailInput, messageInput);
  if (currentState === undefined) {
    save(STORAGE_KEY, [newTask]);
  } else {
    currentState.push(newTask);
    save(STORAGE_KEY, currentState);
  }
}

window.addEventListener('DOMContentLoaded', fillTaskList);

function fillTaskList() {
  const currentState = load(STORAGE_KEY);
  if (currentState !== undefined) {
    currentState.forEach(task => {
        const lastEl = currentState.slice(-1)[0]
        emailInput.value = lastEl.email;
        messageInput.value = lastEl.message;
    });
  }
}

form.addEventListener("submit", (event) => {
    event.preventDefault();
  
    if (emailInput.value === "" || messageInput.value === "") {
      alert("Trebuie sa introduci valori in ambele campuri!");
    } else {
      alert("Formularul a fost trimis!");
      console.log(emailInput.value, messageInput.value);
      emailInput.value = "";
      messageInput.value = "";
      localStorage.removeItem("feedback-form-state");

    }
    const throttledFetchData = _.throttle(addTaskToLocalStorage, 5000);
    form.addEventListener("input", throttledFetchData);
  });

const throttledOnKeyDown = _.throttle(addTaskToLocalStorage, 50000);