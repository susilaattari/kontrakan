import useOwnerStore from "../store";

export function getAllOwners() {
  fetch('https://api.jsonbin.io/v3/b/63a8472901a72b59f238ef90', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'X-Master-Key': '$2b$10$vWIkDxaKY.PAOwcpb/jFH.pyoWktZhboUgiSrlhXoQiylw33vX2MS'
    }
  })
    .then(response => response.json())
    .then((data) => {
      useOwnerStore.setState({ users: data.record.users });
      console.log(useOwnerStore.getState().users);
    })
    .catch((error) => {
      console.error('Error:', error);
    });
}

export function getOwner(username = '') {
  fetch('https://api.jsonbin.io/v3/b/63a8472901a72b59f238ef90', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'X-Master-Key': '$2b$10$vWIkDxaKY.PAOwcpb/jFH.pyoWktZhboUgiSrlhXoQiylw33vX2MS'
    },
  })
    .then(response => response.json())
    .then((data) => {
      useOwnerStore.setState({ user: data.record.users.find((owner) => owner.username === username) });
    })
    .catch((error) => {
      console.error('Error:', error);
    });
}

export function addUpdateOwner(owner) {
  fetch('https://api.jsonbin.io/v3/b/63a8472901a72b59f238ef90', {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'X-Master-Key': '$2b$10$vWIkDxaKY.PAOwcpb/jFH.pyoWktZhboUgiSrlhXoQiylw33vX2MS'
    },
    body: JSON.stringify(owner)
  })
    .then(response => response.json())
    .then((data) => {
      useOwnerStore.setState({ users: data.record.users });
      console.log(useOwnerStore.getState().users);
    })
    .catch((error) => {
      console.error('Error:', error);
    });
}

export function addOwner(owner) {
  fetch('https://api.jsonbin.io/v3/b/63a8472901a72b59f238ef90', {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'X-Master-Key': '$2b$10$vWIkDxaKY.PAOwcpb/jFH.pyoWktZhboUgiSrlhXoQiylw33vX2MS'
    },
    body: JSON.stringify({ users: owner })
  })
    .then(response => response.json())
    .then((data) => {
      useOwnerStore.setState({ users: data.record.users });
      console.log(useOwnerStore.getState().users);
    })
    .catch((error) => {
      console.error('Error:', error);
    });
}
