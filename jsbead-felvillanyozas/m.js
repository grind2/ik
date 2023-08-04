let gridEl = document.getElementById('game1').children;
let gomb = document.getElementById('check');
let gomb2 = document.getElementById('reset');
let easy = document.getElementById('easy');
let medium = document.getElementById('medium');
let hard = document.getElementById('hard');

let lose = false;
let nemEg = 0;
let egySorban = 0;
let gameOver = false;


gomb2.addEventListener("click", function(){
    document.getElementById('menu').classList.remove('hide');
    document.getElementById('alsomenu').classList.add('hide');
    gameOver = false;
    lose = false;
    nemEg = 0;
    egySorban = 0;

    document.getElementById('game1').innerHTML = `
    <div class="item"></div>
          <div class="item"></div>
          <div class="item"></div>
          <div class="item feka">1</div>
          <div class="item"></div>
          <div class="item"></div>
          <div class="item"></div>
          <div class="item"></div>
          <div class="item feka">0</div>
          <div class="item"></div>
          <div class="item"></div>
          <div class="item"></div>
          <div class="item feka">2</div>
          <div class="item"></div>
          <div class="item"></div>
          <div class="item"></div>
          <div class="item"></div>
          <div class="item"></div>
          <div class="item"></div>
          <div class="item"></div>
          <div class="item"></div>
          <div class="item feka"></div>
          <div class="item"></div>
          <div class="item"></div>
          <div class="item feka"></div>
          <div class="item"></div>
          <div class="item"></div>
          <div class="item feka"></div>
          <div class="item"></div>
          <div class="item"></div>
          <div class="item"></div>
          <div class="item"></div>
          <div class="item"></div>
          <div class="item"></div>
          <div class="item"></div>
          <div class="item"></div>
          <div class="item feka"></div>
          <div class="item"></div>
          <div class="item"></div>
          <div class="item"></div>
          <div class="item feka">2</div>
          <div class="item"></div>
          <div class="item"></div>
          <div class="item"></div>
          <div class="item"></div>
          <div class="item feka">3</div>
          <div class="item"></div>
          <div class="item"></div>
    <div class="item"></div>
`;  
    document.getElementById('game2').innerHTML = `
    <div class="item"></div>
        <div class="item"></div>
        <div class="item feka">0</div>
        <div class="item"></div>
        <div class="item feka"></div>
        <div class="item"></div>
        <div class="item"></div>
        <div class="item"></div>
        <div class="item"></div>
        <div class="item"></div>
        <div class="item"></div>
        <div class="item"></div>
        <div class="item"></div>
        <div class="item"></div>
        <div class="item feka"></div>
        <div class="item"></div>
        <div class="item feka"></div>
        <div class="item"></div>
        <div class="item feka">3</div>
        <div class="item"></div>
        <div class="item feka"></div>
        <div class="item"></div>
        <div class="item"></div>
        <div class="item"></div>
        <div class="item feka">1</div>
        <div class="item"></div>
        <div class="item"></div>
        <div class="item"></div>
        <div class="item feka">2</div>
        <div class="item"></div>
        <div class="item feka"></div>
        <div class="item"></div>
        <div class="item feka"></div>
        <div class="item"></div>
        <div class="item feka"></div>
        <div class="item"></div>
        <div class="item"></div>
        <div class="item"></div>
        <div class="item"></div>
        <div class="item"></div>
        <div class="item"></div>
        <div class="item"></div>
        <div class="item"></div>
        <div class="item"></div>
        <div class="item feka"></div>
        <div class="item"></div>
        <div class="item feka">2</div>
        <div class="item"></div>
        <div class="item"></div>
`;

    document.getElementById('game3').innerHTML = `
    <div class="item"></div>
        <div class="item feka">2</div>
        <div class="item"></div>
        <div class="item"></div>
        <div class="item"></div>
        <div class="item feka">3</div>
        <div class="item"></div>
        <div class="item"></div>
        <div class="item"></div>
        <div class="item"></div>
        <div class="item feka"></div>
        <div class="item"></div>
        <div class="item"></div>
        <div class="item"></div>
        <div class="item"></div>
        <div class="item feka"></div>
        <div class="item"></div>
        <div class="item"></div>
        <div class="item"></div>
        <div class="item feka">2</div>
        <div class="item"></div>
        <div class="item"></div>
        <div class="item"></div>
        <div class="item feka">2</div>
        <div class="item"></div>
        <div class="item"></div>
        <div class="item"></div>
        <div class="item feka">0</div>
        <div class="item"></div>
        <div class="item"></div>
        <div class="item"></div>
        <div class="item feka">1</div>
        <div class="item feka"></div>
        <div class="item"></div>
        <div class="item"></div>
        <div class="item feka"></div>
        <div class="item"></div>
        <div class="item"></div>
        <div class="item"></div>
        <div class="item"></div>
        <div class="item feka">2</div>
        <div class="item"></div>
        <div class="item"></div>
        <div class="item"></div>
        <div class="item"></div>
        <div class="item feka"></div>
        <div class="item"></div>
        <div class="item"></div>
        <div class="item"></div>
    `;

    document.getElementById('game1').style.display = "none";
    document.getElementById('game2').style.display = "none";
    document.getElementById('game3').style.display = "none";


    activate();
})

let currentmap = 0

easy.addEventListener("click", function(){
    gameOver = false;
    currentmap = 0;

    gridEl = document.getElementById('game1').children;
    document.getElementById('game1').style.display = "flex";
    document.getElementById('game2').style.display = "none";
    document.getElementById('game3').style.display = "none";
    document.getElementById('menu').classList.add('hide');
    document.getElementById('alsomenu').classList.remove('hide');

    activate();
})

medium.addEventListener("click", function(){
    gameOver = false;
    currentmap = 1;

    gridEl = document.getElementById('game2').children;
    document.getElementById('game1').style.display = "none";
    document.getElementById('game2').style.display = "flex";
    document.getElementById('game3').style.display = "none";
    document.getElementById('menu').classList.add('hide');
    document.getElementById('alsomenu').classList.remove('hide');

    activate();
})

hard.addEventListener("click", function(){
    gameOver = false;
    currentmap = 2;

    gridEl = document.getElementById('game3').children;
    document.getElementById('game1').style.display = "none";
    document.getElementById('game2').style.display = "none";
    document.getElementById('game3').style.display = "flex";
    document.getElementById('menu').classList.add('hide');
    document.getElementById('alsomenu').classList.remove('hide');

    activate();
})

function countSzomszedos(array, i) {
    let count = 0

    if (i + 1 < 49 && !array[i+1].classList.contains("feka") && (i+1) % 7 > 0){
        if (array[i+1].innerHTML != '') {
            count++;
        }
        
    }

    if (0 < i && !array[i-1].classList.contains("feka") && (i+1) % 7 != 1){
        if (array[i-1].innerHTML != ''){
            count++;
        }
        
    }

    if ((i-7) >= 0 && !array[i-7].classList.contains("feka")){
        if (array[i-7].innerHTML != ''){
            count++;
        }
        
    }

    if ((i+7) < 49 && !array[i+7].classList.contains("feka")){
        if (array[i+7].innerHTML != '') {
            count++;
        }
    }

    return count;
}

gomb.addEventListener("click", function(){
    lose = false
    for (let i = 0; i < 49; i++) {
        if(countSzomszedos(gridEl, i) == gridEl[i].innerHTML){
            gridEl[i].style.color = 'green';
        }
        if (gridEl[i].innerHTML != '' && gridEl[i].innerHTML != '💡' && gridEl[i].innerHTML != countSzomszedos(gridEl, i)) {
            lose = true;
        }

        if (!gridEl[i].classList.contains('highlight') && !gridEl[i].classList.contains('feka')){
            nemEg++;
        }
    };

    if (lose || nemEg > 0 || egySorban > 0) {
        alert('Vesztettél!')
        if (currentmap == 0) {
            document.getElementById('easy').innerHTML = document.getElementById('easy').innerHTML + '❌';
        } 

        if (currentmap == 1) {
            document.getElementById('medium').innerHTML = document.getElementById('medium').innerHTML + '❌';
        } 

        if (currentmap == 2) {
            document.getElementById('hard').innerHTML = document.getElementById('hard').innerHTML + '❌';
        } 

        gameOver = true;

    } else {
        alert('Nyertél!')

        if (currentmap == 0) {
            document.getElementById('easy').innerHTML = 'Könnyű✔️';
        } 

        if (currentmap == 1) {
            document.getElementById('medium').innerHTML = 'Közepes✔️';
        } 

        if (currentmap == 2) {
            document.getElementById('hard').innerHTML = 'Nehéz✔️';
        } 
        

        gameOver = true;
    }
})



function activate() {

    for (let i = 0; i < 49; i++) {

        gridEl[i].addEventListener("click", function(){
            if (!gridEl[i].classList.contains("feka") && !gameOver) {
                if (gridEl[i].innerHTML == "💡"){
                    gridEl[i].innerHTML = "";
                    
    
                    jobb(gridEl, i, false)
                    balra(gridEl, i, false)
                    fel(gridEl, i, false)
                    le(gridEl, i, false)

                } else {
                    gridEl[i].innerHTML = "💡";
    
                    jobb(gridEl, i, true)
                    balra(gridEl, i, true)
                    fel(gridEl, i, true)
                    le(gridEl, i, true)
                } 
            }
        })
    };
    
    

    let overlap7 = new Array(49).fill(0);
    
    function jobb(array, i, t){
    
        setTimeout(() => {
            if(t){
                overlap7[i] += 1;
                array[i].classList.add('highlight')
            } else {
                overlap7[i] -= 1;
        
                if (overlap7[i]<=0)
                array[i].classList.remove('highlight')
            }
            
    
    
            if (i + 1 < 49 && !array[i+1].classList.contains("feka") && (i+1) % 7 > 0){
                if(array[i+1].innerHTML == '💡'){
                    if(t){
                        egySorban++;
                    } else {
                        egySorban--;
                    }
                }
                jobb(array, i+1, t)
            }
        }, 100);
    }
    
    function balra(array, i, t){
    
        setTimeout(() => {
            if(t){
                overlap7[i] += 1;
                array[i].classList.add('highlight')
            } else {
                overlap7[i] -= 1;
                
                if (overlap7[i]<=0)
                array[i].classList.remove('highlight')
            }
        
            if (0 < i && !array[i-1].classList.contains("feka") && (i+1) % 7 != 1){
                if(array[i-1].innerHTML == '💡'){
                    if(t){
                        egySorban++;
                    } else {
                        egySorban--;
                    }
                }
                balra(array, i-1, t)
            }
        }, 100);
        
    }
    
    function fel(array, i, t){
    
        setTimeout(() => {
            if(t){
                overlap7[i] += 1;
                array[i].classList.add('highlight')
            } else {
                overlap7[i] -= 1;
                
                if (overlap7[i]<=0)
                array[i].classList.remove('highlight')
            }
    
            if ((i-7) >= 0 && !array[i-7].classList.contains("feka")){
                if(array[i-7].innerHTML == '💡'){
                    if(t){
                        egySorban++;
                    } else {
                        egySorban--;
                    }
                }
                fel(array, i-7, t)
            }
        }, 100);
        
    
        
    
        
    }
    
    function le(array, i, t){
    
        setTimeout(() => {
            if(t){
                overlap7[i] += 1;
                array[i].classList.add('highlight')
            } else {
                overlap7[i] -= 1;
                
                if (overlap7[i]<=0)
                array[i].classList.remove('highlight')
            }
        
            
            if ((i+7) < 49 && !array[i+7].classList.contains("feka")){
                if(array[i+7].innerHTML == '💡'){
                    if(t){
                        egySorban++;
                    } else {
                        egySorban--;
                    }
                }
                le(array, i+7, t)
            }
        }, 100);
        
    }
    
    
}






