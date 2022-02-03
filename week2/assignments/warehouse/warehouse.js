const parts = [
    { partNbr: 'R5AQDVU', partDescr: 'Halbendozer', aisle: 'B3', qty: 14 },
    { partNbr: 'LJBKC0M', partDescr: 'Knudleknorp', aisle: 'H1', qty: 12 },
    { partNbr: 'HUS51DE', partDescr: 'Knudlescheiffer', aisle: 'H1', qty: 12 },
    { partNbr: 'M0XORFH', partDescr: 'Borgom Oil', aisle: 'B2', qty: 3 },
    { partNbr: '35X7AP8', partDescr: 'Glundelscharf', aisle: 'C3', qty: 1 },
    { partNbr: 'C1AYCAI', partDescr: 'Tschoffle', aisle: 'A4', qty: 5 },
    { partNbr: 'E9IEYLS', partDescr: 'Karmandloch', aisle: 'C2', qty: 2 },
    { partNbr: 'IW2I0TG', partDescr: 'Shreckendwammer', aisle: 'J4', qty: 2 },
    { partNbr: '95OJTV6', partDescr: 'Dimpenaus', aisle: 'B1', qty: 16 },
    { partNbr: 'LYII1MJ', partDescr: 'Lumpenknorp', aisle: 'H1', qty: 12 },
    { partNbr: 'VQIL7AO', partDescr: 'Lumpenschieffer', aisle: 'H1', qty: 12 },
    { partNbr: 'XF0MPS9', partDescr: 'Ratklampen', aisle: 'N2', qty: 7 },
    { partNbr: 'AFU9OUG', partDescr: 'Dulpo Fittings', aisle: 'J2', qty: 4 },
    { partNbr: 'E7XWGGO', partDescr: 'Flugtrimsammler', aisle: 'B3', qty: 3 },
    { partNbr: '981FNC9', partDescr: 'Grosstramle', aisle: 'A1', qty: 1 },
    { partNbr: 'AGSXYVZ', partDescr: 'Skirpenflatch', aisle: 'B2', qty: 2 },
    { partNbr: 'V0SK0UX', partDescr: 'Lumpenmagler', aisle: 'H1', qty: 12 },
    { partNbr: 'CTL40Z1', partDescr: 'Lumpenflempest', aisle: 'H1', qty: 24 },
    { partNbr: 'POO9ZPM', partDescr: 'Eumonklippen', aisle: 'D2', qty: 7 },
    { partNbr: 'WEYPU3Z', partDescr: 'Mumpenflipper', aisle: 'E3', qty: 1 }

]

// list of each part number and qty for check-off in the "detailsList" element
let partList = document.querySelector("#detailsList");
parts.forEach(function(element, index) {
    let needPart = document.createElement("div");
    let newPart = document.createElement("input");
    newPart.setAttribute("type", "checkbox");
    let partLabel = document.createElement("label");
    partLabel.textContent = `${parts[index].qty} (${parts[index].partNbr}) - ${parts[index].partDescr}`;
    partList.appendChild(needPart);
    needPart.appendChild(newPart);
    needPart.appendChild(partLabel);
});


// if parts requiring special handling exist (in aisle B3), list of items needing 
// special packaging in the "specialPackaging" element, else remove element
let specialPackaging = document.querySelector("#specialPackaging");
let specialHandling = parts.filter(function(element, index) {
    return parts[index].aisle === "B3";
});

if (specialHandling.length !== 0) {
    specialHandling.forEach(function(element, index) {
        let revisedHandling = document.createElement("p");
        revisedHandling.textContent = `Item: ${specialHandling[index].partNbr} / Qty: ${specialHandling[index].qty}`;
        specialPackaging.appendChild(revisedHandling);
        specialPackaging.style.height = "max-content";

    })
} else {
    specialPackaging.remove();
}

// if hazardous parts exist (in aisle J4), let employee know in the "hazardousMaterials"
// element and remind them to get gloves, else remove element
let hazardousParts = document.querySelector("#hazardousMaterials");
let hazardous = parts.some(function(element, index) {
    return parts[index].aisle === "J4";
})

if (hazardous !== true) {
    hazardousParts.remove();
} else {
    let hazardNote = document.createElement("p");
    hazardNote.textContent = "Please ensure you are wearing your gloves!";
    hazardousParts.appendChild(hazardNote);
    hazardousParts.style.height = "max-content";
}

// if all items in the order are small parts (aisle H1), then let employee know that they should take 
// a basket and go dirctly to aisle H1
let smallParts = document.querySelector("#smallItemsOnly");
let smallItems = parts.every(function(element, index) {
    return parts[index].aisle === "H1";
})
if (smallItems !== true) {
    smallParts.remove();
} else {
    let smallPartsInfo = document.createElement("p");
    smallPartsInfo.textContent = "You should take a basket and go directly to asile H1";
    smallParts.appendChild(smallPartsInfo);
}

// if there are large items (anthing in aisles S, T, or U), then let the employee know in the "forkiftNeeded"
// element that they will need to reserve a forklift, else remove the element


let forkLiftNeeded = document.querySelector("#forkLiftNeeded");
let largeParts = parts.find(function(element, index) {
    return parts[index].aisle === "S" || parts[index].aisle === "T" || parts[index].aisle === "U";
})
if (largeParts === undefined) {
    forkLiftNeeded.remove();
} else {
    let forkInfo = document.createElement("p");
    forkInfo.textContent = "You are required to reserve a forklift for large items!";
    largeParts.appendChild(forkInfo);
}
// sum up the total number of parts and append that number to the text already in "totalItems" element 
let total = parts.reduce((total, part) => total + part.qty, 0);
document.querySelector('#totalItems').textContent += ': ' + total;