document.getElementById("profile-photos").onclick = (e) =>
{
    if(document.getElementById('chaos').classList[1]==('fila-fotos')){
    document.getElementById('chaos').classList.remove('fila-fotos')
    document.getElementById('botones-perfil').innerHTML += `<a class="nav-link btn" id="planet-button" href="/auth/myPlanet"> Planet</a>`
    document.getElementById('botones-perfil').innerHTML += `<a class="nav-link btn" id="planet-button" href="/auth/myFriends"> Friends</a>`
    document.getElementById('botones-perfil').innerHTML += `<a class="nav-link btn" id="planet-button" href="/auth/myPlans"> Plans</a>`
    document.getElementById('botones-perfil').innerHTML += `<a class="nav-link btn" id="planet-button" href="/auth/new-post"> New Post</a>`
    }
    else{
    document.getElementById('chaos').classList.add('fila-fotos')
    }
}

