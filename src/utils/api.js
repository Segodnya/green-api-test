import { REACT_APP_GREEN_API_BASE_URL } from './constants';

async function apiRequest(url, method, body) {
  const request = {
    method,
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  };
  if (body) {
    request.body = JSON.stringify(body);
  }
  const response = await fetch(url, request);
  // Статус 201 - Created
  if (response.ok) {
    return response.json();
  }
  throw new Error(`API error: ${response.status}`);
}

function getBaseUrl() {
  const idInstance = localStorage.getItem('IdInstance');
  const apiTokenInstance = localStorage.getItem('ApiTokenInstance');
  return `${REACT_APP_GREEN_API_BASE_URL}/waInstance${idInstance}/${apiTokenInstance}`;
}

export async function authorize() {
  const url = `${getBaseUrl()}/getSettings`;
  const method = 'GET';
  return apiRequest(url, method);
}

// Получение  данных о пользователе
export async function getUserInfo(user) {
  const url = `${getBaseUrl()}/getContactInfo`;
  const method = 'POST';
  const body = {
    chatId: user,
  };
  return apiRequest(url, method, body);
}

// Получение  данных о контактах
export async function getAllUsers() {
  const url = `${getBaseUrl()}/getContacts`;
  const method = 'GET';
  return apiRequest(url, method);
}

// Получение последних сообщений диалога
export async function getChatHistory(roomUser) {
  const url = `${getBaseUrl()}/getChatHistory`;
  const method = 'POST';
  const body = {
    chatId: roomUser,
    count: 10,
  };
  return apiRequest(url, method, body);
}

// Отправка сообщения контакту
export async function sendNewMessage(chat_id, message) {
  const url = `${getBaseUrl()}/sendMessage`;
  const method = 'POST';
  const body = {
    chatId: chat_id,
    message,
  };
  return apiRequest(url, method, body);
}
