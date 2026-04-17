let benevoles = [];
let myform = document.getElementById("myform");

myform.addEventListener("submit", function (event) {
  event.preventDefault();
  soumettre();
});

function display() {
  let condidates = document.getElementById("table_content");
  condidates.innerHTML = "";
  benevoles.forEach((bene, index) => {
    condidates.innerHTML += `
                <tr>
                    <td>${bene.nom}</td>
                    <td>${bene.ville}</td>
                    <td>${bene.competence}</td>
                    <td>${bene.disponibilité}</td>
                    <td>${bene.mission}</td>
                    <td><button type="button" onclick="del(${index})" class="btn btn-sm btn-danger">Supprimer</button></td>
                </tr>
        `;
  });
}

function soumettre() {
  let nom = document.getElementById("nom").value;
  let ville = document.getElementById("ville").value;
  let competence = document.getElementById("competence").value;
  let disponibilité = document.getElementById("disponibilité").value;
  let mission = document.getElementById("mission").value;
  let email = document.getElementById("email").value;
  let password = document.getElementById("password").value;
  if (
    !nom ||
    !ville ||
    !competence ||
    !disponibilité ||
    !mission ||
    !email ||
    !password
  ) {
    alert("Formulaire invalide, vous devez compléter tous les champs");
    return;
  }
  if (password.length <= 6) {
    alert("Le mot de passe doit contenir plus de 6 caractères");
    return;
  }
  let regex = /^[a-zA-Z0-9._%+-]+@(gmail|hotmail|yahoo)\.(com|fr)$/;
  if (!regex.test(email)) {
    alert("Veuillez saisir un email correct");
    return;
  }
  let candidature = {
    nom: nom[0].toUpperCase() + nom.slice(1), //capital first letter
    ville,
    competence,
    disponibilité,
    mission,
    email,
    password,
  };
  benevoles.push(candidature);
  display();
  alert(`La candidature de ${nom} a été enregistrée avec succès`);
  myform.reset();
}

function del(index) {
  if (confirm("Voulez-vous vraiment supprimer cette candidature ?"))
    benevoles.splice(index, 1);
  display();
}
