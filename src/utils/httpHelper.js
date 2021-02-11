export function getUsers() {
  return new Promise((resolve, reject) => {
    fetch("https://602413d96bf3e6001766be2d.mockapi.io/users", {
      method: "GET",
    })
      .then((res) => res.json())
      .then((data) => resolve({ err: false, data }))
      .catch(() => reject({ err: true, data: [] }))
  })
}
export function getUserDetails(id) {
  return new Promise((resolve, reject) => {
    fetch(`https://602413d96bf3e6001766be2d.mockapi.io/users/${id}`, {
      method: "GET",
    })
      .then((res) => res.json())
      .then((data) => resolve({ err: false, data }))
      .catch(() => reject({ err: true }))
  })
}

export function createUser(user) {
  return new Promise((resolve, reject) => {
    fetch("https://602413d96bf3e6001766be2d.mockapi.io/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ...user,
        id: Math.floor(Math.random() * 10000),
        isActive: true,
        birthDate: Math.round((new Date(user.birthDate)).getTime() / 1000),
        hiredDate: Math.round((new Date()).getTime() / 1000),
      }),
    })
      .then(() => resolve({ err: false }))
      .catch(() => reject({ err: true }))
  })
}

export function updateUser(user) {
  return new Promise((resolve, reject) => {
    fetch(`https://602413d96bf3e6001766be2d.mockapi.io/users/${user.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ...user,
        birthDate: Math.round((new Date(user.birthDate)).getTime() / 1000),
      }),
    })
      .then(() => resolve({ err: false }))
      .catch(() => reject({ err: true }))
  })
}

export function deleteUser(id) {
  return new Promise((resolve, reject) => {
    fetch(`https://602413d96bf3e6001766be2d.mockapi.io/users/${id}`, {
      method: "DELETE",
    })
      .then(() => resolve({ err: false }))
      .catch(() => reject({ err: true }))
  })
}
