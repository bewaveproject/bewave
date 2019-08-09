document.getElementById("profile-photos").onclick = (e) =>
{
    document.getElementById('chaos').classList.remove('fila-fotos')
    document.getElementById('profile-photos').innerHTML += `<a class="nav-link btn btn-dark" id="planet-button" href="/auth/myPlanet"> Planet</a>`
}