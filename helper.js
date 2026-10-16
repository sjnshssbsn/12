document.addEventListener("scroll", (event) =>
{
    var positionY = window.scrollY;
    console.log(positionY);
});

document.addEventListener("keypress" , (event)=>
{if ((event.key == "ArrowLeft") || (event.key == "ArrowUP"))}