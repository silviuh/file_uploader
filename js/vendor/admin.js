function forMore(){
  let more = document.getElementById("more-lang");
  let forMore = document.getElementById("for-more");
  if(more.style.display === "block"){
    more.style.display = "none";
    forMore.innerHTML = "Click for less";
  }else{
    more.style.display = "block";
    forMore.innerHTML = "Click for more";
  }
}
