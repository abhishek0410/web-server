console.log("Client side java script is loaded ");

const weathreForm = document.querySelector("form");
const search = document.querySelector("input");

weathreForm.addEventListener("submit", e => {
  e.preventDefault();

  const location = search.value;

  fetch("http://localhost:8000/weather?address=" + location).then(response => {
    response.json().then(data => {
      if (data.error) {
        console.log(data.error);
      } else {
        console.log(data.location);
        console.log(data.forecast);
      }
    });
  });
});
