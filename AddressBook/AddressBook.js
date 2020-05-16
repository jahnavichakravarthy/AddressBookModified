
window.addEventListener('beforeunload', function (e) {
	window.localStorage.unloadTime = JSON.stringify(new Date());
});

window.addEventListener('load', function () {

	let loadTime = new Date();
	let unloadTime = new Date(JSON.parse(window.localStorage.unloadTime));
	let refreshTime = loadTime.getTime() - unloadTime.getTime();

	if (refreshTime > 10000) {
		window.localStorage.removeItem("Contacts");
	}

});
$(document).ready(function () {
	onStart();
	$("#add").click(function () {
		$("#home-page").hide();
		$("#form-display").show();
		$("#update-form").hide();
		$("#back").show();
		$("#submit").show();
		$(".contact-details").hide();
		// validateForm();

	});
	$("#submit").click(function () {
		mainPage();
	});
	$("#update-form").click(function () {
		mainPage();
	});

});


function onStart() {
	//is required for intialaztion
	$(".contact-details").hide();
	$("#home-page").show();
	$("#form-display").hide();
	var contacts = JSON.parse(localStorage.getItem('Contacts'));
	if (contacts == undefined) {
		var listOfContacts = [];
		localStorage.setItem('Contacts', JSON.stringify(listOfContacts));
	} else {
		displayContacts();
	}


}

class Contact {
	constructor(name, id, address, phoneNumber) {
		this.Name = name;
		this.Id = id;
		this.Address = address;
		this.PhoneNumber = phoneNumber;
	}
}

function mainPage() {
	$("#home-page").show();
	$("#form-display").hide();
	displayContacts();
}

var selectedContactId;

function addContact() {
	listOfContacts = getContacts();
	var contactName = document.getElementById('txt-name');
	var id = "contact" + (listOfContacts.length + 1);
	var address = document.getElementById('txt-address');
	var phoneNumber = document.getElementById('txt-phonenumber');
	//var validity=validateForm(contactName);   
	var createdContact = new Contact(contactName.value, id, address.value, phoneNumber.value);
	console.log(createdContact);
	listOfContacts.push(createdContact);
	localStorage.setItem('Contacts', JSON.stringify(listOfContacts));
	reset();
	alert("Contact added successfully");

}

function setUpadteFormValues(selectedContactId) {
	selectedContact = getContact(selectedContactId);
	getElement("txt-name", selectedContact.Name);
	getElement("txt-address", selectedContact.Address);
	getElement("txt-phonenumber", selectedContact.PhoneNumber);


}

function getElement(idSelector, value) {
	document.getElementById(idSelector).value = value;

}

function reset() {
	getElement("txt-name", "");
	getElement("txt-address", "");
	getElement("txt-phonenumber", "");
}

function displayContacts() {
	var contacts = getContacts();
	if (contacts.length != 0) {
		$(".show-contacts").show();
		$(".show-contacts").empty();
		$("#no-contacts").hide();
		for (var i = 0; i < contacts.length; i++) {
			var display = "<div id=\"" + contacts[i].Id + "\"";
			display += "onclick=\"displayData(id);\"";
			display += "class=\"contact-list\">";
			display += "<h2>" + contacts[i].Name + "</h2></div>";
			$(".show-contacts").append(display);
		}
	} else {
		$("#no-contacts").show();
		$(".show-contacts").hide();
		$(".contact-details").hide();
	}
}


function getContacts() {
	listOfContacts = JSON.parse(localStorage.getItem('Contacts'));
	return listOfContacts;
}

function getContact(id) {
	contacts = getContacts();
	for (var i = 0; i < contacts.length; i++) {
		if (contacts[i].Id == id) {
			return contacts[i];
		}
	}
}

function update() {
	var selectedContact = getContact(selectedContactId);

	selectedContact.Name = $("#txt-name").val();
	selectedContact.Address = $("#txt-address").val();
	selectedContact.PhoneNumber = $("#txt-phonenumber").val();
	localStorage.setItem('Contacts', JSON.stringify(listOfContacts));
	alert("Contact UPDATED successfully!!!!!!!");
	mainPage();
	$(".contact-details").hide();


}

function remove() {
	selectedContact = getContact(selectedContactId);
	listOfContacts = getContacts();
	listOfContacts.pop(selectedContact)
	localStorage.setItem('Contacts', JSON.stringify(listOfContacts));
	alert("Contact Deleted successfully!!!!!!!");
	displayContacts();

}

function displayData(id) {
	selectedContactId = id;
	$(".contact-details").show();
	//Contact=new Contact();
	selectedContact = getContact(id);
	$("#contact-name").text(selectedContact.Name);
	$("#contact-address").text(selectedContact.Address);
	$("#contact-phonenumber").text(selectedContact.PhoneNumber);
}

function updateFormDisplay() {
	$("#home-page").hide();
	$("#form-display").show();
	$("#back").show();
	$("#submit").hide();
	$("#update-form").show();
	setUpadteFormValues(selectedContactId);

}

function confirmRemove() {
	if (confirm("Are you sure you want to delete????")) {
		remove();

	} else {
		alert("******No changes made*****");

	}

}