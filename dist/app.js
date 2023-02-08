let companyName = document.getElementById("company_name");
let surName = document.getElementById("surname");
let phone = document.getElementById("phone");
let email = document.getElementById("email");
let country = document.getElementById("country");
let postalCode = document.getElementById("postal_code");
let city = document.getElementById("city");
let address = document.getElementById("address");
let button = document.querySelector("button");
let userData = {
    companyName: "string",
    surName: "string",
    phone: "number",
    email: "string",
    country: "string",
    postalCode: "number",
    city: "string",
    address: "string",
};
button.addEventListener("click", async (e) => {
    e.preventDefault();
    userData = {
        companyName: companyName.value,
        surName: surName.value,
        phone: phone.value,
        email: email.value,
        country: country.value,
        postalCode: postalCode.value,
        city: city.value,
        address: address.value,
    };
    console.log(userData);
    const data = await fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=${userData.address.trim()}+${userData.city}+${userData.postalCode.trim()}&key=${process.env.GOOGLE_API`);
    if (!data.ok) {
        /* Handle */
    }
    // If you care about a response:
    if (data.body !== null) {
        // body is ReadableStream<Uint8Array>
        // parse as needed, e.g. reading directly, or
        // and further:
        // const finalData = await data.json().then((data) => console.log(data));
        const finalData = await data.json();
        if (finalData.status === "ZERO_RESULTS" ||
            finalData.results[0].geometry.location_type === "APPROXIMATE" ||
            finalData.results[0].address_components[0].types[0] !== "street_number") {
            alert("please enter a valid address");
            return;
        }
        // console.log(finalData);
        console.log(finalData);
    }
});
export {};
