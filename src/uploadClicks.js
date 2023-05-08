export default function uploadClicks(clicks, user) {

    const serverAddress = "https://limited-choice-default-rtdb.europe-west1.firebasedatabase.app/";

    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify(clicks);

    var requestOptions = {
        method: 'PUT',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
    };

    return fetch(serverAddress + "videos/" + user + ".json", requestOptions)
    .then(response => response.json())
    .catch(error => console.log('error', error));
}