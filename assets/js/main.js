var game = {
    stats: {
        correct: 0,
        incorrect: 0,
        numquestions: 0,
    },
    questions: [
        {
        question: "How many NBA Championships have the Boston Celtics wons?",
        c_answer: 17,
        answers: [16,18,20,17],
        explanation: "The Boston Celtics are an American professional basketball team based in Boston, Massachusetts.  The Celtics are the all time leaders in NBA Championships with 17 Championships which accounts for 23.9 percent of all NBA championships since the league's founding.",
        img: "./assets/images/8687celtics.jpg"
        },
        {
        question: "What player scored the most points in one game?",
        c_answer: "Wilt Chamberlain",
        answers: ["Wilt Chamberlain", "Michael Jordan", "Lebron James", "Erving \"Magic\" Johnson"],
        explanation: "Wilt Chamberlain set the single-game scoring record in the National Basketball Association (NBA) by scoring 100 points for the Philadelphia Warriors in a 169–147 win over the New York Knicks on March 2, 1962, at Hershey Sports Arena in Hershey, Pennsylvania. It is widely considered one of the greatest records in basketball.",
        img:"./assets/images/Wilt_Chamberlain_100-point.jpg"
        },
        {
        question: "What is Kareem Abdul-Jabbar's birth name?",
        c_answer: "Lew Alcindor",
        answers: ["Lew Alcindor", "Travis Wright", "Shaquille O'Neill", "Kareem Abdul-Jabbar is his birth name"],
        explanation: "Kareem Abdul-Jabbar, born Ferdinand Lewis Alcindor Jr, is an American retired professional basketball player who played 20 seasons in the National Basketball Association (NBA) for the Milwaukee Bucks and the Los Angeles Lakers. During his career as a center, Abdul-Jabbar was a record six-time NBA Most Valuable Player (MVP), a record 19-time NBA All-Star, a 15-time All-NBA selection, and an 11-time NBA All-Defensive Team member.",
        img: "./assets/images/Kareem-Abdul-Jabbar_Lipofsky.jpg"
        },
        {
        question: "Who has the most career points in the playoffs?",
        c_answer: "Michael Jordan",
        answers: ["Michael Jordan", "Larry Bird", "Wilt Chamberlain", "Kareem Abdul-Jabbar"],
        explanation: "Michael Jeffrey Jordan, also known by his initials, MJ, is an American former professional basketball player. He played 15 seasons in the National Basketball Association for the Chicago Bulls and Washington Wizards.  Widely considered the greatest basketball player of all time, Jordan won 6 Championships with the Chicago Bulls.  He is well known by his brand Air Jordan.",
        img: "./assets/images/jordan.jpg"
        },
        {
        question: "What team has the best record in one season?",
        c_answer: "2015-2016 Golden State Warriors",
        answers: ["2015-2016 Golden State Warriors", "1995-96 Chicago Bulls", "1986-87 Los Angeles Lakers", "1985-86 Boston Celtics"],
        explanation: "The 2015–16 Golden State Warriors season was the 70th season of the franchise in the National Basketball Association (NBA), and its 54th in the San Francisco Bay Area. The Warriors entered the season as the defending NBA champions and they set the best ever regular-season record of 73–9, breaking the 1995–96 Chicago Bulls record of 72–10.",
        img: "./assets/images/warriers.jpg"
        },        
    ],
    questionsClone:[],
    $template:                 
    "<div class='col-lg-6 answer hvr-back-pulse' onclick='game.answeredquestion()'><p class='answer'></p></div><",
    start: function() {
        game.setquestion();
        game.progress(10, 10, $('#timer'));
        $("#title").hide();
        $('#game').show();
        this.stats.numquestions = this.questions.length + 1;
    },
    progress: function(timeleft, timetotal, $element) {
        var progressBarWidth = timeleft * $element.width() / timetotal;
        $element.find("div").animate({ width: progressBarWidth }, timeleft == timetotal ? 0 : 1000, "linear").html(timeleft + " seconds to go");
        if(timeleft >= 0) {
            loop = setTimeout(function() {
                game.progress(timeleft - 1, timetotal, $element);
            }, 1000);
        } else {
            $('#game').hide();
            $('#answercard').show();
            this.answeredquestion("w");
        }
    },
    nextquestion: function() {
        $('#game').show();
        $('#answercard').hide();
        $('.col-lg-12.answer').html('');
        game.setquestion();
        game.progress(10, 10, $('#timer'));
    },
    answeredquestion: function(type) {
        clearTimeout(loop);
        $('#game').hide()
        $('#answercard').show();
        this.stats.numquestions--;
        if(type === 'c'){
            this.stats.correct++
            $('#outcome').html('Correct!')
        } else {
            this.stats.incorrect++
            $('#outcome').html('Wrong!')
        }
        $('#explanation').html()
        if(this.stats.numquestions === 0) {
            $('#next').attr('onclick','game.reset()').html("Play Again!");
            $('#endgame').html("<p>Game Over.</p><p>Correct: " + this.stats.correct+"</p><p>Incorrect: " + this.stats.incorrect);
        }
    },
    reset: function() {
        $("#title").show();
        $("#game").hide()
        $("#answercard").hide();
        this.questions = this.questionsClone;
        this.questionsClone = [];
        $("#question").empty();
        $(".col-lg-12.answer").empty();
        $("#endgame").empty();
        this.stats.numquestions = 0;
        $('#next').attr('onclick','game.nextquestion()').html("Next Question");
    },
    setquestion: function() {
        var currentq = this.questions[Math.floor(Math.random()*this.questions.length)];
        var index = this.questions.indexOf(currentq);
        this.questionsClone.push(currentq);
        this.questions.splice(index, 1);
        $('#question').html(currentq.question);
        $('#explanation').html(currentq.explanation);
        var newImage = $('<img>');
        newImage.attr('src',currentq.img);
        $('#picture').html(newImage);
        var allanswers = currentq.answers;
        var answer = currentq.c_answer;
        allanswers = allanswers.sort(()=>Math.random()-0.5);
        allanswers.forEach(function(element){
            if(element === answer) {
                $('.col-lg-12.answer').append("<div class='col-md-6 answer hvr-back-pulse' onclick='game.answeredquestion(\"c\")'><p class='answer'>"+element+"</p></div>");
            } else {
                $('.col-lg-12.answer').append("<div class='col-md-6 answer hvr-back-pulse' onclick='game.answeredquestion(\"i\")'><p class='answer'>"+element+"</p></div>");
            }   
        })
    }
}
    