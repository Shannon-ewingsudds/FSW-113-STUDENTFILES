// Create a variable of the right kind and in the right place such that each new bug that is added can increment that number
const reportedBy = document.querySelector("#reportedBy");
const selectItem = document.querySelector("#system");
const subItem = document.querySelector("#subSystem");
const bugDesc = document.querySelector("#bugDesc");
const listWrapper = document.querySelector("#listWrapper");

// This constructor should be set up to accept the four user-input values from index.html: 
// reportedBy, system, subSystem, and bugDesc
class Bug {

    constructor(reportedBy, system, subSystem, bugDesc) {
        this.reportedBy = reportedBy;
        this.system = system;
        this.subSystem = subSystem;
        this.bugDesc = bugDesc;
    }

    // Create a div element that displays the bug information input by the user within the "listWrapper" DOM element. 
    // It should also contain buttons whose onClick events will call the deleteBug() and resolveBug() methods (see below). 
    addBug() {

        let div = document.createElement('div');

        let report = document.createElement('p');
        report.textContent = 'Reported by: ' + this.reportedBy;

        let system = document.createElement('p');
        system.textContent = 'System: ' + this.system + ' / ' + this.subSystem;
        let desc = document.createElement('p');

        desc.textContent = this.bugDesc;
        div.setAttribute('class', 'divStyle');

        let flexContainer = document.createElement('div');
        let check = document.createElement('div');
        check.innerHTML += '&#10004;';
        check.setAttribute('class', 'checkbox');
        check.addEventListener('click', this.resolveBug);

        let deleteBtn = document.createElement('div');
        deleteBtn.innerHTML += '&#10006;';
        deleteBtn.setAttribute('class', 'deleteBtn');
        deleteBtn.addEventListener('click', this.deleteBug);

        flexContainer.append(check, deleteBtn);
        flexContainer.setAttribute('class', 'flexContainer');

        div.append(report, system, desc, flexContainer);
        listWrapper.appendChild(div);
    }

    // Create code that will remove the appropriate bug from the DOM. 
    // You may need to Google how to remove an element from the DOM.
    deleteBug() {
        listWrapper.removeChild(this.parentNode.parentNode);
    }

    // Create code that changes the appropriate bug report to a darker color
    resolveBug() {
        this.parentNode.parentNode.setAttribute('class', 'resolveBug');

    }
}

// Create code that instantiates the Bug class with the data input by the 
// user in the index.html form. Then call the method to add the new bug report.
function reportBug(e) {
    const select = selectItem.options[selectItem.selectedIndex].text;
    const sub = subItem.options[subItem.selectedIndex].text;
    const bug = new Bug(reportedBy.value, select, sub, bugDesc.value);
    bug.addBug();
}