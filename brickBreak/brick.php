<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Brick Breaker</title>
    <link rel="stylesheet" href="brick.css" />
</head>
<body>
    <h1>Welcome to Brick Breaker!</h1>
    <div class="my-box">
        <div>
            <p><u>Controls:<BR></u>
                UpArrow/W: Launch Ball/Select Option on Gameover screen<BR>
                Left Arrow/A: Move Left.<BR>
                Right Arrow/D: Move Right. <BR>
            </p>
        
        <!-- <H1>Brick Breaker</H1>
        <H5>Controls:</H5>
        <H5>UpArrow/W: Launch Ball/Select Option on Gameover screen</H5>
        <H5>Left Arrow/A: Move Left.</H5>
        <H5>Right Arrow/D: Move Right.</H5> -->
        <canvas height="400px",width="300px"></canvas>
        <script src="brick.js"></script>

        <form id= "sender" method = "post" action="brickScore.php">
            <label for="score">Once you finish, enter your score truthfully.</label>
            <input type="text" id="score" name="score" />
            <button onclick="scoreCheck(event);">Submit</button>
        </form>
        </div>
        <div>
            <table >
            <tr><th>Name</th><th>Score</th><th>Time</th></tr>
            
            <?php          
            if($_SERVER['HTTP_HOST']=="127.0.0.1"){
                $mysqli = new mysqli("127.0.0.1","root","","waterguys");
            }
            else{    
            $mysqli = new mysqli("195.35.59.14","u121755072_waterguys","?P6w@V5o6","u121755072_waterguysdb");
                        //make a SQL message
            }
            $sql = "select * FROM scores 
            JOIN users on (users.id=scores.userid) 
            where game='brickBreak' and score>0 order by score DESC;";

            //send SQL and get result
            $result = $mysqli -> query($sql);
            $rows = $result -> fetch_all(MYSQLI_ASSOC);

            //add loop
            foreach($rows as $row){
                print("<tr><td>{$row['username']}</td><td>{$row['score']}</td><td>{$row['time']}</td></tr>");            
            }



            ?>
        </div>
    </div>
    <form>
        <p id = "score"></p>
    </form>
</body>
</html>