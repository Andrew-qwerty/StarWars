window.onload = function () {
    var myUL = document.getElementById("myUL");
    let selectedLI = myUL.querySelector('.selected');
    myUL.addEventListener('click', madeInfo = function(event) {
    event.preventDefault();     
    let targ = event.target.closest('li'); 
    if (!targ) return; // (2)
    if (!myUL.contains(targ)) return; 
    select(targ)
    $('.container').addClass('modal-open');
    var url = targ.firstElementChild.href;
    fetch(url)
        .then((response) => {
        return response.json();
        })
            .then((thisPerson) => {
                console.log(thisPerson);
                document.querySelector('.header').innerHTML = thisPerson.name;
                document.querySelector('#birth_year').innerHTML = thisPerson.birth_year;
                document.querySelector('#gender').innerHTML = thisPerson.gender;
                getFilms(thisPerson.films)
                getPlanet(thisPerson.homeworld);
                getCpecies(thisPerson.species);
                })
    })
    function select(targ) {
        if (selectedLI) { 
            selectedLI.classList.remove('selected');
        }
        selectedLI = targ;
        selectedLI.classList.add('selected'); 
    }          
    function getPlanet(url)  {
        let planet = fetch(url)
            .then((response) => {
                return response.json();
            })
                .then((data) => {
                document.querySelector('#homeworld').innerHTML = data.name;
                return data.name;
            })
        return planet;
    }
    function getCpecies(array) {
            var cparray = [];
            if (array.length > 0) {
            for (let i = 0; i < array.length; i++) {
                fetch(array[i])
                .then((response) => {
                        return response.json();
                })
                    .then((data) => {
                        cparray[i] = data.name;
                        document.querySelector('#species').innerHTML=data.name;
                })
                .catch((data) => {cparray[0] = 'n/a';
                document.querySelector('#species').innerHTML='n/a';})
            }} else {
                document.querySelector('#species').innerHTML='n/a';
            }
            return cparray;    
        }
        function getFilms(array) {
            document.querySelector('#films').innerHTML='';
            var filmsArray = [];
            for (let i = 0; i < array.length; i++) {
                fetch(array[i])
                    .then((response) => {
                        return response.json();
                    })
                        .then((data) => {
                            filmsArray[i] = data.title;
                            document.querySelector('#films').insertAdjacentHTML('beforeend', 
                            `<li>${data.title}</li>`
                            );
                        })
            }
            return filmsArray;    
        }

        var currentPage=1;
        function drowpage(page) {
            if (isNaN(page)){
                return false;
            } else {
            myUL.innerHTML = '';
            var requrl = 'http://swapi.dev/api/people/?page='+ page;
            fetch(requrl)
                .then((response) => {
                    return response.json();
                })
                    .then((data) => {
                        var persons = data.results;
                        for (var i = 0; i < persons.length; i++) {
                            var newItem = document.createElement("li");
                            document.getElementById("myUL").insertAdjacentHTML('beforeend', 
                                `<li><a href="${persons[i].url}">${persons[i].name}</a></li>`
                            );
                            
                        }
                        
                    })
            currentPage = page;
            for (var i = 1; i < btnlist.children.length; i++) {
                if (btnlist.children[i].className=="selectedPage") {
                        btnlist.children[i].classList.remove('selectedPage');
                } 
                if (btnlist.children[i].innerHTML==currentPage) {
                        btnlist.children[i].classList.add('selectedPage'); 
                }
            }
            };
        }
          
        $('.js-click-modal').click(function(){
            $('.container').addClass('modal-open');
        });

        $('.js-close-modal').click(function(){
            $('.container').removeClass('modal-open');
        }); 

        var btnlist = document.getElementById("btnlist");
        
        btnlist.addEventListener('click', madepage = function(event){
            let targ = event.target.closest('li');
            if (!targ) return;
            if (!btnlist.contains(targ)) return; 
                drowpage(targ.innerHTML);
        }) 
        document.getElementById("next").addEventListener('click', function(){
            var nexpPage;
            if (currentPage==9) {
                nexpPage = 1;
            } else {
                nexpPage = Number(currentPage)+1;
            }
            drowpage(nexpPage);
        }) 
        document.getElementById("previous").addEventListener('click', function(){
            var previousPage;
            if (currentPage==1) {
                previousPage = 9;
            } else {
                previousPage = Number(currentPage)-1;
            }
            drowpage(previousPage);
        }) 
    drowpage(1);
 } 