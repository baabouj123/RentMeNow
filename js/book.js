import vehicles from "./api.js";
console.log(vehicles);

window.addEventListener("DOMContentLoaded", () => {
  const vehicleSelector = document.getElementById("vehicle");
  const fuel = document.getElementById("fuel");
  const pickUpDate = document.getElementById("pick-up-date");
  const returnDate = document.getElementById("return-date");
  vehicles.forEach((vehicle) => {
    let option = document.createElement("option");
    option.value = vehicle.id;
    option.textContent = vehicle.name;
    vehicleSelector.appendChild(option);
  });
  let vehicleImage = document.querySelector("#vehicle-img");
  let vehiclePrice = document.querySelector("#vehicle-price");
  let vehicle = vehicles.find((vehicle) => vehicle.id == vehicleSelector.value);
  vehicleImage.src = vehicle.image;
  vehicleImage.alt = vehicle.name;
  vehiclePrice.textContent = `$${vehicle.price} / 24h`;
  vehicle.fuel.forEach((type) => {
    let option = document.createElement("option");
    option.value = type.value;
    option.textContent = type.name;
    fuel.appendChild(option);
  });
  vehicleSelector.addEventListener("change", (event) => {
    vehicle = vehicles.find((vehicle) => vehicle.id == event.target.value);
    vehicleImage.src = vehicle.image;
    vehicleImage.alt = vehicle.name;
    vehiclePrice.textContent = `$${vehicle.price} / 24h`;
    fuel.innerHTML = "";
    vehicle.fuel.forEach((type) => {
      let option = document.createElement("option");
      option.value = type.value;
      option.textContent = type.name;
      fuel.appendChild(option);
    });
  });
  document.getElementById("form").addEventListener("submit", (event) => {
    event.preventDefault();
    const days = daysDiff(pickUpDate.value, returnDate.value);
    if (days <= 0) {
      alert(
        "Oops! Please make sure that the pick up date should be before the return date"
      );
    } else {
      const totalPrice = (
        days *
        vehicle.price *
        (Number(fuel.value) + (vehicle.isAuto ? 0.19 : 0) + 1)
      ).toFixed(2);
      alert(`Total Price : $${totalPrice}`);
    }
  });
  const daysDiff = (startDate, endDate) => {
    const start = new Date(startDate);
    const end = new Date(endDate);

    const diff = end.getTime() - start.getTime();

    return diff / (1000 * 60 * 60 * 24);
  };
});
