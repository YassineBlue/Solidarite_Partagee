// declaring the benevols 
let benevoles = [];

// setting an index to check in case of edit
let editIndex = null;

let myform = document.getElementById("myform");
//on submit
myform.addEventListener("submit", function (event) {
  
  event.preventDefault();
  soumettre();
  
});

// render func

function display() {
  document.getElementById("selectAll").checked = false;
  
  let candidates = document.getElementById("table_content");
  
  candidates.innerHTML = "";
  
  if (benevoles.length == 0) {
    
    candidates.innerHTML = `<tr>
              <td colspan="7" class="text-muted">Aucune candidature pour le moment</td>
              </tr>`;
    return;
    
  }
  
  let html = "";
  
  benevoles.forEach((bene, index) => {
    html += `
                <tr>
                    <td><input type="checkbox" name="select" id="select" data-index="${index}"  class="form-check-input"></td>
                    <td>${bene.nom}</td>
                    <td>${bene.ville}</td>
                    <td>${bene.competence}</td>
                    <td>${bene.disponibilite}</td>
                    <td>${bene.mission}</td>
                    <td>
                        <button type="button" onclick="modify(${index})" class="btn btn-sm btn-warning">Modifier</button>
                        <button type="button" onclick="del(${index})" class="btn btn-sm btn-danger">Supprimer</button>
                    </td>
                </tr> `;
  });
  
  candidates.innerHTML = html;
}
// displaying candidates
display();
function soumettre() {
  let nom = document.getElementById("nom").value.trim();
  let ville = document.getElementById("ville").value;
  let competence = document.getElementById("competence").value;
  let disponibilite = document.getElementById("disponibilite").value;
  let mission = document.getElementById("mission").value;
  let email = document.getElementById("email").value;
  let password = document.getElementById("password").value;
  if (
    !nom ||
    !ville ||
    !competence ||
    !disponibilite ||
    !mission ||
    !email ||
    !password
  ) {
    alert("Veuillez remplir tous les champs");
    return;
  }
  if (password.length <= 6) {
    alert("Le mot de passe doit contenir plus de 6 caractères");
    return;
  }
  let regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
  if (!regex.test(email)) {
    alert("Veuillez saisir un email correct");
    return;
  }
  if (editIndex == null) {
    let candidature = {
      nom: nom[0].toUpperCase() + nom.slice(1), //capital first letter
      ville,
      competence,
      disponibilite,
      mission,
      email,
      password,
    };
    benevoles.push(candidature);
    display();
    alert(`La candidature de ${nom} a été enregistrée avec succès`);
    myform.reset();
  } 
  else {
    if (confirm("Vous voulez vraiment modifier cette candidature ?")) {
      benevoles[editIndex].nom = nom[0].toUpperCase() + nom.slice(1);
      benevoles[editIndex].ville = ville;
      benevoles[editIndex].competence = competence;
      benevoles[editIndex].disponibilite = disponibilite;
      benevoles[editIndex].mission = mission;
      benevoles[editIndex].email = email;
      
      benevoles[editIndex].password = password;
      display();
      alert(`La candidature de '${nom}' a été bien modifiée`);
    }

    
    editIndex = null;
    myform.reset();
    document.getElementById("soumettre").textContent = "Soumettre";
  }
}


function modify(index) {
  editIndex = index;
  document.getElementById("soumettre").textContent = "Mettre à jour";
  document.getElementById("nom").value = benevoles[index].nom;
  document.getElementById("ville").value = benevoles[index].ville;
  document.getElementById("competence").value = benevoles[index].competence;
  document.getElementById("disponibilite").value =
    benevoles[index].disponibilite;
  document.getElementById("mission").value = benevoles[index].mission;
  document.getElementById("email").value = benevoles[index].email;
  document.getElementById("password").value = benevoles[index].password;
}


function del(index) {
  
  if (confirm("Voulez-vous vraiment supprimer cette candidature ?")) {
    benevoles.splice(index, 1);
    
    display();
  }
}
function delChecked() {
  let checkedCandidates = document.querySelectorAll(
    'input[name="select"]:checked',
  );
  
  let checkedIndexes = [];
  
  checkedCandidates.forEach((candidate) => {
    checkedIndexes.push(Number(candidate.dataset.index));
  });
  if (checkedCandidates.length == 0) {
    alert("Aucun candidat sélectionné");
    return;
  }
  if (
    confirm(`Confirmer la suppression de ${checkedIndexes.length} candidat(s)`)
  ) {
    checkedIndexes.sort((a, b) => b - a);
    checkedIndexes.forEach((i) => {
      
      benevoles.splice(i, 1);
    });
    display();
  }
}

function selectAll() {
  let isChecked = document.getElementById("selectAll").checked;
  let checkboxes = document.querySelectorAll('input[name="select"]');
  checkboxes.forEach((box) => {
    box.checked = isChecked;
  });
}
