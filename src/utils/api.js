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
  return `${REACT_APP_GREEN_API_BASE_URL}/waInstance`;
}

export async function authorize(id, token) {
  const url = `${REACT_APP_GREEN_API_BASE_URL}/waInstance${id}/getSettings/${token}`;
  const method = 'GET';
  return apiRequest(url, method);
}

// Получение  данных о пользователе
export async function getUserInfo(user) {
  const id = localStorage.getItem('IdInstance');
  const token = localStorage.getItem('ApiTokenInstance');
  const url = `${getBaseUrl()}${id}/getContactInfo/${token}`;
  const method = 'POST';
  const body = {
    chatId: user,
  };
  return apiRequest(url, method, body);
}

// Получение  данных о контактах
export async function getAllUsers() {
  const id = localStorage.getItem('IdInstance');
  const token = localStorage.getItem('ApiTokenInstance');
  const url = `${getBaseUrl()}${id}/getContacts/${token}`;
  const method = 'GET';
  return apiRequest(url, method);
}

// Получение последних сообщений авторизованного пользователя
export async function getChatHistory(roomUser) {
  const id = localStorage.getItem('IdInstance');
  const token = localStorage.getItem('ApiTokenInstance');
  const url = `${getBaseUrl()}${id}/getChatHistory/${token}`;
  const method = 'POST';
  const body = {
    chatId: roomUser,
    count: 10,
  };
  return apiRequest(url, method, body);
}

// Отправка сообщения контакту
export async function sendNewMessage(chat_id, message) {
  const id = localStorage.getItem('IdInstance');
  const token = localStorage.getItem('ApiTokenInstance');
  const url = `${getBaseUrl()}${id}/sendMessage/${token}`;
  const method = 'POST';
  const body = {
    chatId: chat_id,
    message,
  };
  return apiRequest(url, method, body);
}
