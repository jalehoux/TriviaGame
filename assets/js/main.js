var game = {
    stats: {
        correct: 0,
        incorrect: 0,
        numquestions: 0,
    },
    questions: [
        {
        question: "How many NBA Championships have the Boston Celtics wons?",
        c_answer: 19,
        answers: [16,18,20,19]
        },
        {
        question: "What player scored the most points in one game?",
        c_answer: "Wilt Chamberlain",
        answers: ["Wilt Chamberlain", "Michael Jordan", "Lebron James", "Erving \"Magic\" Johnson"]
        },
        {
        question: "What is Kareem Abdul-Jabbar's birth name?",
        c_answer: "Lew Alcindor",
        answers: ["Lew Alcindor", "Travis Wright", "Shaquille O'Neill", "Kareem Abdul-Jabbar is his birth name"]
        },
        {
        question: "Who has the most career points in the playoffs?",
        c_answer: "Michael Jordan",
        answers: ["Michael Jordan", "Larry Bird", "Wilt Chamberlain", "Kareem Abdul-Jabbar"]
        },
        {
        question: "What team has the best record in one season?",
        c_answer: "2015-2016 Golden State Warriors",
        answers: ["2015-2016 Golden State Warriors", "1995-96 Chicago Bulls", "1986-87 Los Angeles Lakers", "1985-86 Boston Celtics"]
        },        
    ],
    $template:                 
    "<div class='row'><div class='col-lg-6 answer hvr-back-pulse' onclick='game.answeredquestion()'><p class='answer'></p></div></div>",
    start: function() {
        game.setquestion();
        game.progress(5, 5, $('#timer'));
        $("#title").hide();
        $('#game').show();
        numquestions = this.questions.length;
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
        }
    },
    nextquestion: function() {
        $('#game').show();
        $('#answercard').hide();
        $('.col-lg-12.answer').html('');
        game.setquestion();
        game.progress(5, 5, $('#timer'));
    },
    answeredquestion: function(type) {
        clearTimeout(loop);
        $('#game').hide()
        $('#answercard').show();
        this.stats.numquestions--;
        if(type === 'c'){
            console.log("correct");
            this.correct++
        } else {
            console.log("incorrect");
            this.incorrect++
        }
    },
    reset: function() {
        console.log("reset");
    },
    setquestion: function() {
        let currentq = this.questions[Math.floor(Math.random()*this.questions.length)];
        var index = this.questions.indexOf(currentq);
        this.questions.splice(index, 1);
        $('#question').html(currentq.question);
        let allanswers = currentq.answers;
        let answer = currentq.c_answer;
        allanswers.forEach(function(element){
            if(element === answer) {
                $('.col-lg-12.answer').append("<div class='row'><div class='col-lg-6 answer hvr-back-pulse' onclick='game.answeredquestion(\"c\")'><p class='answer'>"+element+"</p></div></div>");
            } else {
                $('.col-lg-12.answer').append("<div class='row'><div class='col-lg-6 answer hvr-back-pulse' onclick='game.answeredquestion(\"i\")'><p class='answer'>"+element+"</p></div></div>");
            }   
        })
    }
}
    