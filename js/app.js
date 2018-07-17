/*
 * Create a list that holds all of your cards,
 * 判断两张卡片相等的功能找不到方法，未能实现功能
 */
var symbols = ['bicycle', 'bicycle', 'leaf', 'leaf', 'cube', 'cube', 'anchor', 'anchor', 'paper-plane-o', 'paper-plane-o', 'bolt', 'bolt', 'bomb', 'bomb', 'diamond', 'diamond'];
var tt;
/*
 * Display the cards on the page在页面上显示卡片
 *   - shuffle the list of cards using the provided "shuffle" method below使用下面提供的shuffle方法洗牌
 *   - loop through each card and create its HTML循环遍历每张卡并创建其HTML
 *   - add each card's HTML to the page将每张卡的HTML添加到页面
 */
function displayCards() {
    var cards = shuffle(symbols);
    var deckClass = document.getElementById("deckclass");
    for (let i = 0; i < cards.length; i++) {
        deckClass.insertAdjacentHTML("afterbegin", '<li class="card" ><i class="fa fa-' + cards[i] + '"></i></li>');
    }
    ;
    addCardClick();
}
// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}

/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */
//添加卡片监听器，打开卡片，并判断是否相等（此功能未能实现）
function addCardClick() {
    var cardClass = document.getElementsByClassName("card");
    //var deck = document.getElementsByClassName("deck");
    var cardList = document.getElementsByTagName("i");
    var moves = 0;
    var opened = [];
    var match = 0;
    //计算步数，并把打开的卡片放进opened
    for (let i = 0; i < cardClass.length; i++) {
        cardClass[i].addEventListener("click", function () {
            moves++;
            this.className = "card open show";
            document.getElementById("setmoves").innerHTML = parseInt(moves);
            var opClass = document.getElementsByClassName("open");
            var firselems = opClass.firstElementChild;
            opened = Array.prototype.slice.call(opClass);//把打开的卡片放进临时数组

            if (opened.length > 1) { // 判断打开超过两张卡片
                if (opened[0].innerHTML === opened[1].innerHTML) { // 如果前后打开的两张卡片一样，则match
                    opened[0].className = "card match";
                    opened[1].className = "card match";
                    match++;
                    cardmatch(match);//判断通关游戏
                    opened = []; // 清空临时数组
                    starRatings(moves, match);
                } else {
                    setTimeout(function () {
                        opened[0].className = "card";
                        opened[1].className = "card";//隐藏不匹配的卡片
                    }, 400)
                }
            }
        });
    }
    gameTimes(match);//计时
}
//判断完成游戏，结束并弹出得分重启游戏
function cardmatch(index) {
    var mat = index;
    if (mat === 8) {
        var steps = document.getElementById("setmoves").textContent;
        var sec = document.getElementById("calculateTime").textContent;
        var stars = 3 - document.body.getElementsByClassName("fa-star-o").length;
        alert("恭喜你通关游戏！ \n 成绩是：" + steps + "步，" + sec + "秒，" + stars + "星!");
        document.getElementById("deckclass").innerHTML = "";
        document.getElementById("setmoves").innerHTML = "0";
        document.getElementById("calculateTime").innerHTML = "0";
        //showConfirm();
        displayCards();
    }
}
//重启游戏
function showConfirm() {
    document.getElementById('restartid').addEventListener('click', function show_confirm() {
        var r = confirm("请确认重启游戏！");
        if (r == true) {
            document.getElementById("deckclass").innerHTML = "";
            document.getElementById("setmoves").innerHTML = "0";
            document.getElementById("calculateTime").innerHTML = "0";
            var starIds = document.getElementById("starlist");
            for (let i = 0; i < 3; i++) {
                starIds.children[i].firstElementChild.className = "fa fa-star";
            }
            displayCards();
            alert("重启游戏完成！");
        }
        else {
            alert("取消重启！");
        }
    });
}
//计算星星等级
function starRatings(move, matc) {
    var steps = move;
    var rats = matc;
    var starId = document.getElementById("starlist");
    if (steps > 16 && matc < 8) {
        starId.children[0].firstChild.classList.toggle("fa-star-o");
    }
    else if (steps > 30 && matc < 8) {
        starId.children[1].firstChild.classList.toggle("fa-star-o");
    } else {
        starId.children[2].firstChild.classList.toggle("fa-star-o");
    }
}

//计算游戏时间根据网上案例来改写，参考资源网址：w3c
function gameTimes(t) {
    if (tt) {
        stop()
    }
    var c = 0;
    var stp = t;
    var calTimes = document.getElementById('calculateTime');
    //计时器

    function star() {
        tt = setInterval(function () {
            c += 1;
            calTimes.innerHTML = c;
        }, 1000)
    }

    function stop() {
        window.clearInterval(tt);
    }

    if (stp < 8) {
        star();
    }
    else {
        stop();
    }
    return c;
}

displayCards();
showConfirm();
//noinspection JSAnnotator